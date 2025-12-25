import Link from "next/link"

const SummaryEmployer = () => {
    return (
        <div className="hidden lg:flex lg:w-7/10 bg-primary items-center justify-center px-12 text-white">
            <div className="max-w-2xl text-center">
                <h1 className="text-5xl font-extrabold mb-8">استخدام آسان، سریع و هوشمند</h1>
                <p className="text-xl mb-12">
                    با <Link href="/jobs" className="underline">انتشار آگهی</Link> در جاب اونجا، به هزاران کارجو حرفه‌ای دسترسی پیدا کنید
                </p>
                <div className="grid grid-cols-3 gap-8 text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <p className="text-4xl font-bold">+۱۰,۰۰۰</p>
                        <p className="text-lg mt-2">کارجو فعال</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <p className="text-4xl font-bold">۹۵٪</p>
                        <p className="text-lg mt-2">رضایت کارفرمایان</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <p className="text-4xl font-bold">۲۴/۷</p>
                        <p className="text-lg mt-2">پشتیبانی</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryEmployer
