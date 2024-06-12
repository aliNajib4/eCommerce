import { z } from "zod";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confim_password: z
      .string()
      .min(1, { message: "Please confim your password" }),
  })
  .refine((data) => data.password === data.confim_password, {
    path: ["confim_password"],
    message: "Passwords do not match",
  });

type TInputs = z.infer<typeof signUpSchema>;

export { signUpSchema, type TInputs };
