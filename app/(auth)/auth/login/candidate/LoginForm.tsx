"use client";

import { Button } from "@components/ui/Button";
import ErrorMessage from "@components/ui/ErrorMessage";
import { Input } from "@components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmail } from "@lib/actions/LoginActions";
import { LoginFormData, loginSchema } from "@lib/schemas/auth/login.schema";
import { Mail } from "lucide-react";
import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, { error: null });
  const [isTransitionPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormData) => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
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

      {state?.error && <ErrorMessage message={state.error} />}

      <Button type="submit" variant="primary" className="w-full py-2 text-lg" disabled={pending}>
        {pending ? "در حال ورود..." : "ورود"}
      </Button>
    </form>
  );
}