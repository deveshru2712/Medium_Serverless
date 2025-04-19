import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { CreateBlogType, UpdateBlogType } from "@deveshru2712/medium_common";
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
blogRoutes.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");

  // parsing the body
  const body: UpdateBlogType = await c.req.json();

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
blogRoutes.get("/my", async (c) => {
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

//fetching bulk blog

blogRoutes.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findMany({
      select: {
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

export default blogRoutes;
