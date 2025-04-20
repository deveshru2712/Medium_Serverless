import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { sign, verify } from "hono/jwt";
import { getCookie, setCookie } from "hono/cookie";

import {
  SignInInput,
  SignInType,
  SignUpInput,
  SignUpType,
  UpdateUser,
  UpdateUserType,
} from "@deveshru2712/medium_common";

interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
  Cloudinary_Cloud_Name: string;
}

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id?: string;
  url?: string;
  asset_id?: string;
}

const authRouter = new Hono<{ Bindings: Env }>();

authRouter.get("/me", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const token = getCookie(c, "key");

  if (!token) {
    c.status(401);
    return c.json({
      success: false,
      message: "Unauthorized: No authentication token provided",
    });
  }

  try {
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

    c.status(200);
    return c.json({
      success: true,
      user,
    });
  } catch (error) {
    c.status(401);
    console.log("unable to verify the user");
    c.json({
      success: false,
      message: "unable to verify the user ",
    });
  }
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
    return c.json({
      success: false,
      message: error.issues.map((issue) => ({ message: issue.message })),
    });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      c.status(409);
      return c.json({
        success: false,
        message: "email is already associated with another account",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    // creating a token
    const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);

    // setting them up as a cookie
    setCookie(c, "key", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 1 * 24 * 60 * 60,
      secure: true,
    });

    c.status(200);
    return c.json({
      success: true,
      user: newUser,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while creating an account.",
    });
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
    return c.json({
      success: false,
      message: error.message,
    });
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
      return c.json({
        success: false,
        message: "Wrong credentials",
      });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    setCookie(c, "key", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 1 * 24 * 60 * 60,
    });

    c.status(200);
    return c.json({
      success: true,
      user: user,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while login into the account.",
    });
  }
});

authRouter.put("/update", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Authenticate user
  const token = getCookie(c, "key");

  if (!token) {
    c.status(401);
    return c.json({
      success: false,
      message: "Unable to update the user profile: Authorization error",
    });
  }

  try {
    // Verify token
    const response = await verify(token, c.env.JWT_SECRET);
    const userId = String(response.id);

    // Parse and validate request body
    const body: UpdateUserType = await c.req.json();

    const { success, error } = UpdateUser.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({
        success: false,
        message: "Invalid request data",
        error: error.message,
      });
    }

    // Prepare update data
    const updateData: {
      name: string | undefined;
      email: string | undefined;
      password?: string | undefined;
      bio: string | undefined;
      profileImg?: string;
    } = {
      name: body.name,
      email: body.email,
      password: body.password,
      bio: body.bio,
    };

    if (body.profileImg && body.profileImg.startsWith("data:")) {
      try {
        const formData = new FormData();

        formData.append("file", body.profileImg);
        formData.append("upload_preset", "medium");

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${c.env.Cloudinary_Cloud_Name}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error(
            `Upload failed with status: ${uploadResponse.status}`
          );
        }

        const uploadResult: CloudinaryUploadResponse =
          await uploadResponse.json();

        updateData.profileImg = uploadResult.secure_url;
      } catch (imageError) {
        console.log("Image upload failed:", imageError);
        c.status(400);
        return c.json({
          success: false,
          message: "Failed to upload profile image",
          error:
            imageError instanceof Error ? imageError.message : "Unknown error",
        });
      }
    } else if (body.profileImg) {
      updateData.profileImg = body.profileImg;
    }

    if (body.password && body.password.trim().length > 6) {
      updateData.password = body.password;
    } else if (body.password) {
      c.status(400);
      return c.json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    c.status(200);
    return c.json({
      success: true,
      message: "User profile updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        profileImg: updatedUser.profileImg,
      },
    });
  } catch (error) {
    console.log("Update user error:", error);
    c.status(500);
    return c.json({
      success: false,
      message: "Failed to update user profile",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

authRouter.post("/logout", async (c) => {
  try {
    setCookie(c, "key", "", {
      maxAge: 0,
    });

    c.status(200);
    return c.json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    c.status(500);
    c.json({
      success: false,
      message: "Unable to logout ",
    });
  }
});

export default authRouter;
