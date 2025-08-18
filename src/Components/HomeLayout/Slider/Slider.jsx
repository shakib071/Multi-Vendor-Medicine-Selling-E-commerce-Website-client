import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import { Typewriter } from 'react-simple-typewriter';


import "swiper/css";
import 'swiper/css/navigation';


import './slider.css';
import useAllAdvertisement from "../../../Hooks/getAllAdversiment/useAllAdvertisement";
import Loading from "../../Loading/Loading";
import { useNavigation } from "react-router";



const Slider = () => {

  const {data,isLoading} = useAllAdvertisement();
  const navigation = useNavigation();
  const slidesData = data?.filter(item => item.status == 'active');
  console.log(slidesData);

  if(isLoading || navigation.state == 'loading'){
    return <Loading></Loading>;
  }
  
  return (
    <div className="py-10 md:max-w-6xl 2xl:max-w-7xl mx-auto rounded-2xl">
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
                    <SwiperSlide key={slide.id} className="rounded-3xl">
                    
                      <div className="relative w-full h-80 md:h-140 xl:160 2xl:h-170 bg-center bg-no-repeat  bg-contain transition-transform duration-500 hover:scale-110" style={{backgroundImage: `url(${slide.imageUrl})`}}>
                                     <div className='absolute bottom-3 sm:bottom-10 w-[60%] sm:w-[40%]  px-2 sm:px-6'>
                                        <p className="text-sm sm:text-5xl 2xl:text-6xl font-bold text-[#E11D48]">
                                           <Typewriter
                                                words={[slide.name]}
                                                loop={0}
                                                cursor
                                                cursorStyle='_'
                                                typeSpeed={200}
                                                deleteSpeed={80}
                                                delaySpeed={1000}
                                                // onLoopDone={handleDone}
                                                // onType={handleType}
                                              />
                                          </p>
                                        {/* <p className="text-5xl font-bold text-[#E11D48]">{item.title}</p> */}
                                        <p className='	text-orange-400 text-[11px] sm:text-sm md:text-[14px] lg:text-lg 2xl:text-xl mt-4 font-semibold'>{slide.description}</p>
                                     </div>
                                  </div>
                   
                    </SwiperSlide>
                ))}
        </Swiper>


    
    </div>
  );
};

export default Slider;
