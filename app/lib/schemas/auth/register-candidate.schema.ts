import { z } from "zod";

export const registerCandidateSchema = z.object({
    email: z
        .email({ message: "ایمیل اشتباه وارد کردی!" })
        .trim(),

    password: z
        .string()
        .min(6, { message: "پسورد باید حداقل ۶ کاراکتر باشد" })
        .trim(),

    full_name: z
        .string()
        .nonempty({ error: "اسمتو نگفتی!" })
        .trim(),

    phone: z
        .string()
        .optional()
        .refine(
            (val) => {
                if (!val) return true;
                return /^09[0-9]{9}$/.test(val);
            },
            { message: "شماره تماس نا معتبر است" }
        )
        .transform((val) => (val ? val.trim() : undefined)),

    linkedin_url: z
        .string()
        .optional()
        .refine(
            (val) => {
                if (!val) return true;
                try {
                    new URL(val);
                    return val.includes("linkedin.com");
                } catch {
                    return false;
                }
            },
            { message: "لینک لینکدین معتبر نیست" }
        )
        .transform((val) => (val ? val.trim() : undefined)),

    github_url: z
        .string()
        .optional()
        .refine(
            (val) => {
                if (!val) return true;
                try {
                    new URL(val);
                    return val.includes("github.com");
                } catch {
                    return false;
                }
            },
            { message: "لینک گیت‌هاب معتبر نیست" }
        )
        .transform((val) => (val ? val.trim() : undefined)),
});

export type RegisterCandidateFormData = z.infer<typeof registerCandidateSchema>;