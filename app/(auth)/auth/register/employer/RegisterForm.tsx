"use client";

import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Mail, Building2, Phone, Globe, MapPin } from "lucide-react";
import { useActionState, useTransition } from "react";
import { signUpEmployer } from "@lib/actions/RegisterActions";
import ErrorMessage from "@components/ui/ErrorMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterEmployerFormData, registerEmployerSchema } from "@lib/schemas/auth/register-employer.schema";

export default function EmployerRegisterForm() {
  const [state, formAction, isPending] = useActionState(signUpEmployer, { error: null });
  const [isTransitionPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerEmployerSchema),
    defaultValues: {
      email: "",
      password: "",
      company_name: "",
      phone: "",
      website: "",
      address: "",
    },
  });
  const onSubmit = (data: RegisterEmployerFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("company_name", data.company_name);
      if (data.phone) formData.append("phone", data.phone);
      if (data.website) formData.append("website", data.website);
      if (data.address) formData.append("address", data.address);
      formAction(formData);
    });
  };

  const pending = isPending || isTransitionPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        type="email"
        placeholder="ایمیل شرکت"
        error={errors.email}
        {...register("email")}
        rightIcon={<Mail className="text-muted w-5 h-5" />}
        disabled={pending}
      />

      <Input
        type="password"
        placeholder="پسورد (حداقل ۶ کاراکتر)"
        error={errors.password}
        {...register("password")}
        minLength={6}
        disabled={pending}
      />

      <Input
        type="text"
        placeholder="نام شرکت"
        error={errors.company_name}
        {...register("company_name")}
        rightIcon={<Building2 className="text-muted w-5 h-5" />}
        disabled={pending}
      />

      <Input
        type="tel"
        placeholder="تلفن شرکت"
        rightIcon={<Phone className="text-muted w-5 h-5" />}
        disabled={pending}
        error={errors.phone}
        {...register("phone")}
        className="placeholder:text-end"
      />

      <Input
        type="url"
        placeholder="وب‌سایت شرکت"
        error={errors.website}
        {...register("website")}
        rightIcon={<Globe className="text-muted w-5 h-5" />}
        disabled={pending}
      />

      <Input
        type="text"
        placeholder="آدرس شرکت"
        error={errors.address}
        {...register("address")}
        rightIcon={<MapPin className="text-muted w-5 h-5" />}
        disabled={pending}
      />

      {state?.error && (
        <ErrorMessage message={state.error} />
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full py-2 text-lg"
        disabled={pending}
      >
        {pending ? "در حال ثبت‌نام..." : "ثبت‌نام کارفرما"}
      </Button>
    </form>
  );
}