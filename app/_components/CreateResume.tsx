import { toPersianDigits } from "app/utils/numberFormatter"

const CreateResume = () => {
    return (
        <section className="container mx-auto my-20">
            <h2 className="text-center text-3xl font-extrabold">چطوری رزومه بسازیم؟</h2>
            <div className="flex sm:justify-center gap-y-10 gap-x-4 mt-10">
                <div className="relative space-y-12">
                    <div className="hidden md:block absolute w-1 h-full top-0 right-[34px] bg-muted z-0"></div>

                    <div className="flex flex-col md:flex-row items-center gap-5 relative z-10">
                        <div className="w-18 h-18 rounded-full border-4 border-primary bg-card flex justify-center items-center shrink-0">
                            <h4 className="text-2xl font-extrabold">{toPersianDigits(1)}</h4>
                        </div>
                        <p className="text-right max-w-xl"> ابتدا در سایت ثبت نام کنید و از بین قالب‌ها و طرح‌های متنوع موجود، الگوی رزومه مورد علاقه خود را انتخاب نمایید.</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-5 relative z-10">
                        <div className="w-18 h-18 rounded-full border-4 border-primary bg-card flex justify-center items-center shrink-0">
                            <h4 className="text-2xl font-extrabold">{toPersianDigits(2)}</h4>
                        </div>
                        <p className="text-right max-w-xl">   اطلاعات هویتی، سوابق تحصیلی، تجربیات شغلی، مهارت‌ها و گواهینامه‌های مرتبط را به دقت و به ترتیب زمانی وارد کنید.</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-5 relative z-10">
                        <div className="w-18 h-18 rounded-full bg-card border-4 border-primary flex justify-center items-center shrink-0">
                            <h4 className="text-2xl font-extrabold">{toPersianDigits(3)}</h4>
                        </div>
                        <p className="text-right max-w-xl"> رنگ‌بندی و فونت رزومه را ویرایش کنید، پیش‌نمایش را بررسی کنید و سپس فایل نهایی را در قالب PDF یا سایر فرمت‌های مورد نیاز دانلود نمایید.</p>
                    </div>

                </div>

            </div>
        </section>
    )
}
export default CreateResume