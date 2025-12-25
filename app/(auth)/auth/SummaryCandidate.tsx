import Link from "next/link"

const SummaryCandidate = () => {
    return (
        <div className="hidden lg:flex lg:w-[70%] bg-primary items-center justify-center px-10">
            <div className="text-white text-center max-w-xl">
                <h1 className="text-5xl font-extrabold mb-6">
                    به جمع ما بپیوندید
                </h1>
                <p className="text-xl mb-12">
                    هزاران فرصت شغلی منتظر شماست. با یک ثبت‌نام ساده، رزومه خود را برای بهترین شرکت‌ها ارسال کنید.
                </p>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 inline-block">
                    <p className="text-6xl font-bold">+۵۰۰</p>
                    <p className="text-lg mt-2">آگهی فعال</p>
                </div>
                <h4 className="text-xl mt-5 underline">
                    <Link href="/jobs">مشاهده آگهی های شغلی</Link>
                </h4>
            </div>
        </div>
    )
}

export default SummaryCandidate
