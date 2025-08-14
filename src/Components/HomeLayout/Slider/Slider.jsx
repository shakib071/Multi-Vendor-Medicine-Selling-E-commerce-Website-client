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
                    <div className="   shadow-lg  flex flex-col items-center text-center w-full  mx-auto">
                       <div className="bg-white rounded-2xl p-3">
                         <div className="h-110 w-230  object-cover rounded-lg mb-5">
                          <img
                          src={slide.image}
                          alt={slide.name}
                          className=" " 
                          />
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-xl text-gray-800 mb-2">{slide.name}</h3>
                        <p className="text-gray-600 text-base">{slide.description}</p>
                        </div>
                       </div>
                    </div>
                    </SwiperSlide>
                ))}
        </Swiper>


    
    </div>
  );
};

export default Slider;
