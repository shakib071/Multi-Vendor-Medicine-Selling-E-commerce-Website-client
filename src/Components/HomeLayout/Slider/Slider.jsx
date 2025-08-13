import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Pagination } from "swiper/modules";


import "swiper/css";
import 'swiper/css/navigation';


import './slider.css';



// Fake data for slides
const slidesData = [
  { id: 1, name: "Pain Relief Medicine", description: "Fast acting painkiller for headaches", image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg" },
  { id: 2, name: "Antibiotic Capsule", description: "For bacterial infections", image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg" },
  { id: 3, name: "Vitamin C", description: "Boosts immunity", image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg" },
  { id: 4, name: "Cough Syrup", description: "Soothes cough and throat", image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg" },
];

const Slider = () => {
  
  return (
    <div className="py-10 ">
      <h2 className="text-3xl font-bold text-center  text-blue-600 mb-8">
        🩺 Featured Products
      </h2>
      {/* <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true ,
        }}
        modules={[Autoplay,Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        speed={1500}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="mySwiper"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="bg-white rounded-xl shadow-lg p-3 flex flex-col items-center text-center">
              <img
                src={slide.image}
                alt={slide.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg text-gray-800 mb-1">{slide.name}</h3>
              <p className="text-gray-600 text-sm">{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}

        <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}            
        slidesPerView={1}            
        loop={true}
        speed={1500}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        centeredSlides={true}        
       
        className="mySwiper"
        >
                {slidesData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                    <div className="bg-white rounded-xl shadow-lg p-3 flex flex-col items-center text-center w-full max-w-5xl mx-auto">
                        <img
                        src={slide.image}
                        alt={slide.name}
                        className=" h-110 object-cover rounded-lg mb-5" 
                        />
                        <h3 className="font-semibold text-xl text-gray-800 mb-2">{slide.name}</h3>
                        <p className="text-gray-600 text-base">{slide.description}</p>
                    </div>
                    </SwiperSlide>
                ))}
        </Swiper>


    
    </div>
  );
};

export default Slider;
