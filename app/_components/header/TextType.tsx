"use client";
import { ReactTyped } from "react-typed"

function TextType({ step }: { step: number }) {
  return (
    <h2 className="text-3xl mt-5 font-semibold mb-5 text-center text-primary">
        <ReactTyped
          strings={
            step === 1
              ? ["اول شهرتو انتخاب کن..."]
              : step === 2
              ? ["خب! حالا دسته‌بندی شغل مورد نظرتو انتخاب کن..."]
              : ["همه‌چی آماده‌ست! حالا جستجو کن..."]
          }
          typeSpeed={40}
          backSpeed={20}
          showCursor={false}
        />
      </h2>
  )
}

export default TextType
