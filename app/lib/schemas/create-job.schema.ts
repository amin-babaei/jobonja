import { z } from "zod";

export const createJobSchema = z.object({
    title: z
        .string()
        .nonempty("عنوان آگهی شما چیه؟")
        .min(5, { message: "عنوان باید حداقل ۵ کاراکتر باشد" })
        .trim(),

    description: z
        .string()
        .min(50, "توضیحات باید حداقل ۵۰ کاراکتر باشد")
        .trim(),

    city: z
        .string()
        .nonempty({ error: "شهر را وارد کنید" })
        .trim(),

    category_id: z
        .string()
        .min(1, "لطفاً یک دسته‌بندی انتخاب کنید"),

    job_type: z.union([
        z.literal("full_time", { error: "نوع همکاری نامعتبر است" }),
        z.literal("part_time", { error: "نوع همکاری نامعتبر است" }),
        z.literal("remote", { error: "نوع همکاری نامعتبر است" }),
    ]),

    salary_min: z
        .string()
        .optional()
        .refine(
            (val) => {
                if (!val) return true;
                const num = Number(val);
                return !isNaN(num) && num >= 0;
            },
            { message: "حداقل حقوق باید عدد مثبت یا صفر باشد" }
        )
        .transform((val) => (val ? Number(val) : null)),

    salary_max: z
        .string()
        .optional()
        .refine(
            (val) => {
                if (!val) return true;
                const num = Number(val);
                return !isNaN(num) && num >= 0;
            },
            { message: "حداکثر حقوق باید عدد مثبت یا صفر باشد" }
        )
        .transform((val) => (val ? Number(val) : null)),

}).refine(
    (data) => {
        if (data.salary_min != null && data.salary_max != null) {
            return data.salary_min <= data.salary_max;
        }
        return true;
    },
    {
        message: "حداقل حقوق نمی‌تواند بیشتر از حداکثر باشد",
        path: ["salary_max"],
    }
);

export type CreateJobFormData = z.infer<typeof createJobSchema>;