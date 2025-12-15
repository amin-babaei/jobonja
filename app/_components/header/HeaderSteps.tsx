'use client';
import { useState } from "react";
import SelectInput from "./city/CitySelectInput";
import TextType from "./TextType";
import ArrowDownSVG from "./svg/ArrowDownSVG";
import { Category, City } from "@typess/index";
import { Button } from "@components/ui/Button";
import CategorySelect from "./category/CategorySelect";

export default function HeaderClient({ cities, categories }: { cities: City[], categories: Category[] }) {
    const [step, setStep] = useState(1);
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const result = "شهر " + city + (category ? ` در دسته ${category}` : "");
    return (
        <div className="relative md:w-1/2 mx-auto space-y-4">
            <TextType step={step} />
            <ArrowDownSVG />

            {step === 1 && (
                <SelectInput cities={cities} value={city} onChange={setCity} />
            )}
            {step === 2 && (
                <CategorySelect categories={categories} value={category} onChange={setCategory} />
            )}
            {step === 3 && (
                <div className="text-center p-4 shadow-soft rounded-lg">
                    <h3 className="text-lg mb-2">جستجو برای:</h3>
                    <p className="text-primary font-semibold">{result || "همه مشاغل"}</p>
                </div>
            )}
            <div className="flex justify-center">
                <Button
                    variant="primary"
                    disabled={(step === 1 && !city) || (step === 2 && !category)}
                    onClick={() => setStep(step + 1)}
                    className="w-full md:w-1/4"
                >
                    {step === 1 || step === 2 ? "مرحله بعد" : "جستجو"}
                </Button>
            </div>
        </div>
    );
}
