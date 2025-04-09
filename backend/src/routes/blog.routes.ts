import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { CreateBlogType, UpdateBlogType } from "@deveshru2712/medium_common";

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
  const header = c.req.header("Authorization") || "";

  const token = header.split(" ")[1];

  if (!token) {
    c.status(403);
    return c.json({ error: "No token provided" });
  }

  const response = await verify(token, c.env.JWT_SECRET);

  console.log(response);

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
      data: { title: body.title, content: body.content, authorId: userId },
    });

    c.status(201);
    return c.json({ id: blog.id });
  } catch (error) {
    c.status(500);
    console.log(error);
    return c.text("unable to create a blog");
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
      },
    });

    c.status(200);
    return c.json({ id: blog.id });
  } catch (error) {
    c.status(500);
    console.log(error);
    return c.text("unable to update the blog");
  }
});

// fetching the blog
blogRoutes.get("/", async (c) => {
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
        author: {
          select: {
            name: true,
            bio: true,
            profileImg: true,
          },
        },
      },
    });

    return c.json(blog);
  } catch (error) {
    c.status(500);
    console.log(error);
    return c.text("unable to fetch route");
  }
});

export default blogRoutes;
