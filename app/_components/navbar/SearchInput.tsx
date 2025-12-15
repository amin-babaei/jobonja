"use client";
import type { FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/Input";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const searchValue = (formData.get("search") ?? "").toString();

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", "1");
    if (searchValue) {
      newParams.set("search", searchValue);
    } else {
      newParams.delete("search");
    }

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full xs:w-auto">
      <Input
        key={searchParams?.get("search")}
        type="text"
        name="search"
        placeholder="شغل مورد نظرت؟"
        autoComplete="off"
        defaultValue={searchParams?.get("search") || ""}
        className="border border-border-main p-3 md:w-80"
      />
      <button
        type="submit"
        className="absolute left-0 top-0 ml-3 flex h-full items-center"
      >
        <SearchIcon size={22} className="text-muted cursor-pointer"/>
      </button>
    </form>
  );
}