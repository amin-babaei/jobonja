"use client";

import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { useActionState, useTransition } from "react";
import { createJob } from "@lib/actions/EmployerActions";
import ErrorMessage from "@components/ui/ErrorMessage";
import { Category } from "@typess/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateJobFormData, createJobSchema } from "@lib/schemas/create-job.schema";

interface CreateJobFormProps {
  employerId: string;
  categories: Category[];
}

export default function CreateJobForm({ employerId, categories }: CreateJobFormProps) {
  const [state, formAction, isPending] = useActionState(createJob, { error: null });
  const [isTransitionPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      description: "",
      city: "",
      category_id: "",
      job_type: "full_time",
      salary_min: "",
      salary_max: "",
    },
  });

  const onSubmit = (data: CreateJobFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("city", data.city);
      formData.append("category_id", data.category_id);
      formData.append("job_type", data.job_type);
      if (data.salary_min !== null) formData.append("salary_min", data.salary_min.toString());
      if (data.salary_max !== null) formData.append("salary_max", data.salary_max.toString());
      formData.append("employer_id", employerId);
      formAction(formData)
    });
  };

  const pending = isPending || isTransitionPending;

  return (
    <div className="bg-card rounded-2xl shadow-soft p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <input type="hidden" name="employer_id" value={employerId} />

        <div>
          <label className="block text-lg font-medium mb-3">عنوان آگهی</label>
          <Input
            type="text"
            placeholder="مثال: استخدام توسعه‌دهنده React"
            error={errors.title}
            {...register("title")}
            disabled={pending}
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-3">توضیحات کامل</label>
          <textarea
            className={`resize-none border w-full p-3 rounded-lg focus:outline-2 focus:outline-primary/30 ${errors.description ? "border-red-500" : "border-border-main"
              } bg-background`}
            placeholder="وظایف، شرایط، مزایا، مهارت‌های مورد نیاز و ..."
            rows={10}
            {...register("description")}
            disabled={pending}
          />
          {errors.description && <ErrorMessage message={errors.description.message} />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium mb-3">شهر</label>
            <Input
              type="text"
              placeholder="مثال: تهران"
              error={errors.city}
              {...register("city")}
              disabled={pending}
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-3">دسته‌بندی</label>
            <select
              {...register("category_id")}
              disabled={pending}
              className={`w-full px-4 py-3 rounded-lg border focus:border-primary focus:outline-none bg-background ${errors.category_id ? "border-red-500" : "border-border-main"
                }`}
            >
              <option value="">انتخاب دسته‌بندی</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category_id && <ErrorMessage message={errors.category_id.message} />}
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium mb-3">نوع همکاری</label>
          <select
            {...register("job_type")}
            disabled={pending}
            className={`w-full px-4 py-3 rounded-lg border focus:border-primary focus:outline-none bg-background ${errors.job_type ? "border-red-500" : "border-border-main"
              }`}
          >
            <option value="full_time">تمام وقت</option>
            <option value="part_time">پاره وقت</option>
            <option value="remote">دورکاری</option>
          </select>
          {errors.job_type && <ErrorMessage message={errors.job_type.message} />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium mb-3">حداقل حقوق (تومان)</label>
            <Input
              type="number"
              placeholder="مثال: 15000000"
              min="0"
              error={errors.salary_min}
              {...register("salary_min")}
              disabled={pending}
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-3">حداکثر حقوق (تومان)</label>
            <Input
              type="number"
              placeholder="مثال: 25000000"
              min="0"
              error={errors.salary_max}
              {...register("salary_max")}
              disabled={pending}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            اگر حقوق توافقی است، هر دو فیلد را خالی بگذارید
          </p>
        </div>

        {state?.error && (
          <ErrorMessage message={state.error} />
        )}

        <Button type="submit" variant="success" className="w-full text-xl font-bold" disabled={pending}>
          {pending ? "در حال انتشار..." : "انتشار آگهی"}
        </Button>
      </form>
    </div>
  );
}