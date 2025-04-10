import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { sign, verify } from "hono/jwt";

import {
  SignInInput,
  SignInType,
  SignUpInput,
  SignUpType,
} from "@deveshru2712/medium_common";

interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
}

const authRouter = new Hono<{ Bindings: Env }>();

authRouter.get("/me", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const header = c.req.header("Authorization") || "";

  const token = header.split(" ")[1];

  if (!token) {
    c.status(403);
    return c.json({ error: "No token provided" });
  }

  const response = await verify(token, c.env.JWT_SECRET);

  const userId = String(response.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      bio: true,
      profileImg: true,
    },
  });

  return c.json({
    user,
  });
});

authRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // parsing the body
  const body: SignUpType = await c.req.json();

  const { success, error } = SignUpInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.text(error.message);
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      c.status(409);
      return c.text("email is already associated with another account");
    }

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
        bio: body.bio,
        profileImg: body.profileImg,
      },
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        profileImg: true,
      },
    });

    const token = await sign({ id: (await newUser).id }, c.env.JWT_SECRET);

    return c.json({
      key: token,
      user: newUser,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.text("An error occurred while creating an account.");
  }
});

authRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // parsing the body

  const body: SignInType = await c.req.json();

  const { success, error } = SignInInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.text(error.message);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email, password: body.password },
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        profileImg: true,
      },
    });
    if (!user) {
      c.status(401);
      return c.text("Wrong credentials");
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      key: token,
      user: user,
      message: "Logged in successfully",
    });
  } catch (error) {
    c.status(500);
  }
});

export default authRouter;
