import { z } from "zod";

export const registerEmployerSchema = z.object({
    email: z
        .email("ایمیل اشتباه وارد کردی!")
        .trim(),

    password: z
        .string()
        .min(6, "پسورد باید حداقل ۶ کاراکتر باشد")
        .trim(),

    company_name: z
        .string()
        .nonempty({ error: "اسم شرکتتون؟" })
        .trim(),

    phone: z
        .string()
        .refine(
            (val) => {
                if (!val) return true;
                return /^09[0-9]{9}$/.test(val);
            },
            { message: "شماره تلفن باید با ۰۹ شروع شود و ۱۱ رقم باشد" }
        )
        .transform((val) => (val ? val.trim() : undefined)),

    website: z
        .string()
        .refine(
            (val) => {
                if (!val) return true;
                try {
                    new URL(val);
                    return true;
                } catch {
                    return false;
                }
            },
            { message: "آدرس وب‌سایت معتبر نیست" }
        )
        .transform((val) => (val ? val.trim() : undefined)),

    address: z
        .string()
        .min(5, "آدرس باید حداقل ۵ کاراکتر باشد")
        .transform((val) => (val ? val.trim() : undefined)),
});

export type RegisterEmployerFormData = z.infer<typeof registerEmployerSchema>;