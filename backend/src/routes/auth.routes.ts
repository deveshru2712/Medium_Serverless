import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { sign } from "hono/jwt";

import { SignInInput, SignUpInput } from "@deveshru2712/medium_common";

interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
}

const authRouter = new Hono<{ Bindings: Env }>();

authRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // parsing the body
  const body = await c.req.json();

  const { success, error } = SignUpInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.text(error.message);
  }

  try {
    const user = prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      c.status(409);
      return c.text("email is already associated with another account");
    }

    const newUser = prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    console.log("user created");

    const token = await sign({ id: (await newUser).id }, c.env.JWT_SECRET);

    return c.json({ key: token });
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

  const body = await c.req.json();

  const { success, error } = SignInInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.text(error.message);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email, password: body.password },
    });
    if (!user) {
      c.status(401);
      return c.text("Wrong credentials");
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ key: token });
  } catch (error) {
    c.status(500);
  }
});

export default authRouter;
