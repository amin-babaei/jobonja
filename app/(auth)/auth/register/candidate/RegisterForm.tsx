"use client";

import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Mail, User, Phone, Linkedin, Github } from "lucide-react";
import { useActionState, useTransition } from "react";
import { signUpWithEmail } from "@lib/actions/RegisterActions";
import ErrorMessage from "@components/ui/ErrorMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterCandidateFormData, registerCandidateSchema } from "@lib/schemas/auth/register-candidate.schema";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, { error: null });
  const [isTransitionPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerCandidateSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      phone: "",
      linkedin_url: "",
      github_url: "",
    },
  });

  const onSubmit = (data: RegisterCandidateFormData) => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("full_name", data.full_name);
      if (data.phone) formData.append("phone", data.phone);
      if (data.linkedin_url) formData.append("linkedin_url", data.linkedin_url);
      if (data.github_url) formData.append("github_url", data.github_url);
      formAction(formData);
    });
  };

  const pending = isPending || isTransitionPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="email"
        placeholder="ایمیل"
        error={errors.email}
        {...register("email")}
        rightIcon={<Mail className="text-muted w-5 h-5" />}
      />

      <Input
        type="password"
        placeholder="پسورد (حداقل ۶ کاراکتر)"
        error={errors.password}
        {...register("password")}
      />

      <Input
        type="text"
        placeholder="نام کامل"
        error={errors.full_name}
        {...register("full_name")}
        rightIcon={<User className="text-muted w-5 h-5" />}
      />

      <Input
        type="tel"
        placeholder="تلفن (اختیاری)"
        error={errors.phone}
        {...register("phone")}
        rightIcon={<Phone className="text-muted w-5 h-5" />}
        className="placeholder:text-end"
      />

      <Input
        type="url"
        placeholder="لینک لینکدین (اختیاری)"
        error={errors.linkedin_url}
        {...register("linkedin_url")}
        rightIcon={<Linkedin className="text-muted w-5 h-5" />}
      />

      <Input
        type="url"
        placeholder="لینک گیت‌هاب (اختیاری)"
        error={errors.github_url}
        {...register("github_url")}
        rightIcon={<Github className="text-muted w-5 h-5" />}
      />

      {state?.error && (
        <ErrorMessage message={state.error} />
      )}

      <Button type="submit" variant="primary" className="w-full py-2 text-lg" disabled={pending}>
        {pending ? "در حال ثبت‌نام..." : "ثبت‌نام"}
      </Button>
    </form>
  );
}