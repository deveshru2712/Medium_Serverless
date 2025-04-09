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
  name: z.string().optional(),
  bio: z.string().optional(),
  profileImg: z.string().optional(),
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

export const CreateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
});

export const UpdateBlogInput = z
  .object({
    id: z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
  })
  .refine((data) => data.title !== undefined || data.content !== undefined, {
    message: "At least one field (title or content) must be provided",
  });

// export const UpdateBlogInput = z.object({
//   title: z.string().optional(),
//   content: z.string().optional(),
// });

export type SignUpType = z.infer<typeof SignUpInput>;
export type SignInType = z.infer<typeof SignInInput>;

export type CreateBlogType = z.infer<typeof CreateBlogInput>;
export type UpdateBlogType = z.infer<typeof UpdateBlogInput>;
