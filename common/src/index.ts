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

export type SignUpType = z.infer<typeof SignUpInput>;
export type SignInType = z.infer<typeof SignInInput>;
