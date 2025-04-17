import z from "zod";

export const SignUpInput = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email({ message: "please provide a valid email" }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, { message: "password should be of at least 6 character" }),
  name: z.string(),
});

export const SignInInput = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, { message: "password should be of at least 6 character" }),
});

export const UpdateUser = z
  .object({
    email: z
      .string()
      .email({ message: "please provide a valid email" })
      .optional(),
    password: z
      .string()
      .min(6, { message: "password should be of at least 6 character" })
      .optional(),
    name: z.string().optional(),
    bio: z.string().optional(),
    profileImg: z.string().optional(),
  })
  .refine(
    (data) => {
      return (
        data.email !== undefined ||
        data.password !== undefined ||
        data.name !== undefined ||
        data.bio !== undefined ||
        data.profileImg !== undefined
      );
    },
    {
      message: "At least one field must be provided for update",
      path: [],
    }
  );

export const CreateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  titleImg: z.string().optional(),
  published: z.boolean(),
});

export const UpdateBlogInput = z
  .object({
    id: z.string(),
    title: z.string().optional(),
    titleImg: z.string().optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
  })
  .refine((data) => data.title !== undefined || data.content !== undefined, {
    message: "At least one field (title or content) must be provided",
  });

export type SignUpType = z.infer<typeof SignUpInput>;
export type SignInType = z.infer<typeof SignInInput>;
export type UpdateUserType = z.infer<typeof UpdateUser>;

export type CreateBlogType = z.infer<typeof CreateBlogInput>;
export type UpdateBlogType = z.infer<typeof UpdateBlogInput>;
