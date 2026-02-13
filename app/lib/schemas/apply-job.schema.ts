import { z } from "zod";

export const applyJobSchema = z.object({
    resume_file: z
        .instanceof(File, { error: "فایل رزومه خود را بارگزاری کنید" })
        .refine((file) => file.size > 0, { message: "فایل خالی است" })
        .refine(
            (file) => {
                const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
                return allowedTypes.includes(file.type);
            },
            { message: "فقط فرمت‌های PDF، DOC و DOCX مجاز هستند" }
        )
        .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            { message: "حجم فایل حداکثر ۵ مگابایت می‌تواند باشد" }
        ),

    cover_letter: z
        .string()
        .trim()
        .optional()
});

export type ApplyJobFormData = z.infer<typeof applyJobSchema>;