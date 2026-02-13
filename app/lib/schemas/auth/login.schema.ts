import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "ایمیل اشتباه وارد کردی!" }),
  password: z.string().min(5, { message: "پسورد حداقل 6 کاراکتر باشد" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;