import Image from "next/image"
import SignupIcon from "@images/signup-home-icon.svg"
import BrowseIcon from "@images/browse-home-icon.svg"
import ResumeIcon from "@images/resume-home-icon.svg"
import ApplyIcon from "@images/apply-home-icon.svg"

const StartGuide = () => {
    return (
        <section className="container mx-auto my-20">
            <h2 className="text-center text-3xl font-extrabold">از کجا شروع کنیم؟</h2>
            <div className="grid xs:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 mt-10">
                <div className="flex flex-col items-center gap-y-3">

                    <Image src={SignupIcon} width={85} height={85} alt="signup icon" />

                    <h3 className="font-semibold">ثبت نام در جاب اونجا</h3>
                    <p className="text-center text-muted max-w-xs">
                        برای شروع باید در جاب اونجا ثبت نام کنید. ثبت نام سریع و رایگان است.
                    </p>
                </div>
                <div className="flex flex-col items-center gap-y-3">

                    <Image src={BrowseIcon} width={85} height={85} alt="browse icon" />

                    <h3 className="font-semibold">جستجوی مشاغل</h3>
                    <p className="text-center text-muted max-w-xs">
                       می‌تونی عنوان شغلی یا نام شرکتی که می‌خوای رو در قسمت جستجو وارد کنی و آگهی‌ها رو ببینی
                    </p>
                </div>
                <div className="flex flex-col items-center gap-y-3">

                    <Image src={ResumeIcon} width={85} height={85} alt="resume icon" />

                    <h3 className="font-semibold">آپلود رزومه</h3>
                    <p className="text-center text-muted max-w-xs">
                     رزومه‌ات رو آپلود کن تا کارفرماها بهتر با توانمندی‌هات آشنا بشن
                    </p>
                </div>
                <div className="flex flex-col items-center gap-y-3">

                    <Image src={ApplyIcon} width={85} height={85} alt="apply icon" />

                    <h3 className="font-semibold">ارسال درخواست شغلی</h3>
                    <p className="text-center text-muted max-w-xs">
                       جزییات آگهی رو با دقت بخون و اگر شرایطش با سابقه شغلیت هماهنگ بود، رزومه‌ات رو براشون ارسال کن
                    </p>
                </div>
            </div>
        </section>
    )
}

export default StartGuide
