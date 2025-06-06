import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  CreateBlogInput,
  CreateBlogType,
  UpdateBlogInput,
  UpdateBlogType,
} from "@deveshru2712/medium_common";
import { getCookie } from "hono/cookie";

interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
}

interface Variables {
  userId: string;
  id: string;
}

const blogRoutes = new Hono<{
  Bindings: Env;
  Variables: Variables;
}>();

// this is a middleware

blogRoutes.use("/*", async (c, next) => {
  const token = getCookie(c, "key");
  if (!token) {
    c.status(401);
    return c.json({ success: false, message: "Unauthorized" });
  }

  const response = await verify(token, c.env.JWT_SECRET);

  if (response.id) {
    c.set("userId", String(response.id));
    await next();
  } else {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
});

// creating the blog
blogRoutes.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");

  // parsing the body
  const body: CreateBlogType = await c.req.json();

  const { success, error } = CreateBlogInput.safeParse(body);

  if (!success) {
    c.status(400);
    const message = error.issues.map((issue) => ({
      message: issue.message,
    }))[0].message;
    return c.json({
      success: false,
      message: message,
    });
  }

  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
        titleImg: body.titleImg,
      },
      select: {
        author: true,
        content: true,
        createdAt: true,
        title: true,
        id: true,
      },
    });

    c.status(201);
    return c.json({
      success: true,
      id: blog.id,
      message: "Blog created successfully",
    });
  } catch (error) {
    c.status(500);
    console.log(error);
    return c.json({
      success: false,
      message: "unable to create a blog",
    });
  }
});

// updating the blog
blogRoutes.put("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.param("id");

  const userId = c.get("userId");

  // parsing the body

  if (!blogId && !userId) {
    c.status(409);
    return c.json({ success: false, message: "Unauthorized" });
  }

  const body: UpdateBlogType = await c.req.json();

  const { success, error } = UpdateBlogInput.safeParse(body);

  if (!success) {
    c.status(400);
    const message = error.issues.map((issue) => ({
      message: issue.message,
    }))[0].message;
    return c.json({
      success: false,
      message: message,
    });
  }

  try {
    const blog = await prisma.post.update({
      where: { id: body.id, authorId: userId },
      data: {
        title: body.title,
        content: body.content,
        titleImg: body.titleImg,
        published: body.published,
      },
    });

    if (!blog) {
      c.status(404);
      return c.json({
        success: false,
        message: "Blog not found",
      });
    }

    c.status(200);
    return c.json({
      success: true,
      id: blog.id,
      message: "Blog updated successfully",
    });
  } catch (error) {
    c.status(500);
    console.log(error);
    return c.json({
      success: false,
      message: "unable to update the blog",
    });
  }
});

// fetching my the blog
blogRoutes.get("/personal", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");

  try {
    const blog = await prisma.post.findMany({
      where: { authorId: userId },
      select: {
        title: true,
        content: true,
        id: true,
        published: true,
        titleImg: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            bio: true,
            profileImg: true,
          },
        },
      },
    });

    c.status(200);
    return c.json({ success: true, blog: blog });
  } catch (error) {
    c.status(500);
    console.log(error);
    return c.json({
      success: false,
      message: "unable to fetch route",
    });
  }
});

// deleting my blog

blogRoutes.delete("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.param("id");

  const userId = c.get("userId");

  if (!blogId && !userId) {
    c.status(409);
    return c.json({ success: false, message: "Unauthorized" });
  }
  try {
    const blog = await prisma.post.delete({
      where: { id: blogId, authorId: userId },
    });

    if (!blog) {
      c.status(400);
      return c.json({
        success: false,
        message: "Unable to delete the blog",
      });
    }

    c.status(200);
    return c.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    c.status(500);
    return c.json({ success: false, message: "Unable to delete the blog" });
  }
});

//fetching bulk blog

blogRoutes.get("/public", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        titleImg: true,
        author: { select: { name: true, profileImg: true, bio: true } },
      },
    });

    c.status(200);
    return c.json({
      success: true,
      blog: blog,
    });
  } catch (error) {
    c.status(500);
    console.log(error);
    return c.json({
      success: false,
      message: "Unable to fetch blogs",
    });
  }
});

// get single blog
blogRoutes.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.param("id");
  if (!blogId) {
    c.status(400);
    return c.json({
      success: false,
      message: "Invalid blog id",
    });
  }

  const blog = await prisma.post.findUnique({
    where: { id: blogId },
    select: {
      id: true,
      title: true,
      titleImg: true,
      createdAt: true,
      content: true,
      author: { select: { bio: true, name: true, profileImg: true } },
    },
  });
  if (!blog) {
    c.status(400);
    return c.json({
      success: false,
      message: "No blog found",
    });
  }

  c.status(200);
  return c.json({
    success: true,
    blog: blog,
  });
});

export default blogRoutes;
