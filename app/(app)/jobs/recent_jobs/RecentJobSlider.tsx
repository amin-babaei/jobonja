"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import JobCard from "../JobCard";
import { JobPost } from "@typess/index";
import { Autoplay } from "swiper/modules";
const RecentJobSlider = ({ jobs }: { jobs: JobPost[] }) => {

    return (
        <Swiper
            spaceBetween={25}
            modules={[Autoplay]}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            style={{ padding: "20px 5px" }}
            breakpoints={{
                0: {
                    slidesPerView: 1.2,
                },
                550: {
                    slidesPerView: 1.5,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }}
        >
            {jobs?.map((job) => (
                <SwiperSlide key={job.id}>
                    <JobCard job={job} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
export default RecentJobSlider