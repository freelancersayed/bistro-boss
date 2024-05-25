import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTite/SectionTitle";

const Category = () => {
  return (
    <section className="mb-8">
        <SectionTitle 
        subHeading={"From 11.00am to 10.00pm"}
        heading={"Order Online"}
        >

        </SectionTitle>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slide1} alt="" />
          <h1 className="text-2xl text-center uppercase -mt-10 text-white ">salad</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" />
          <h1 className="text-2xl text-center uppercase -mt-10 text-white ">pizza</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" />
          <h1 className="text-2xl text-center uppercase -mt-10 text-white ">soup</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="" />
          <h1 className="text-2xl text-center uppercase -mt-10 text-white ">desserts</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide5} alt="" />
          <h1 className="text-2xl text-center uppercase -mt-10 text-white ">salad</h1>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;
