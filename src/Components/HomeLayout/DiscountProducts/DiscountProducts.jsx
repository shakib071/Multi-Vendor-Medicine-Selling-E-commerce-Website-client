// src/components/DiscountProducts.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaTag } from "react-icons/fa";

// Fake data
const discountProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    company: "ABC Pharma",
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
    price: 50,
    discountPrice: 40,
  },
  {
    id: 2,
    name: "Vitamin C 1000mg",
    company: "XYZ Health",
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
    price: 100,
    discountPrice: 80,
  },
  {
    id: 3,
    name: "Cough Syrup",
    company: "MediCare",
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
    price: 120,
    discountPrice: 99,
  },
  {
    id: 4,
    name: "Antibiotic Capsule",
    company: "LifeWell",
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
    price: 200,
    discountPrice: 150,
  },
  {
    id: 5,
    name: "Skin Ointment",
    company: "SkinCare Co",
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
    price: 80,
    discountPrice: 60,
  },
];

const DiscountProducts = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8 flex items-center justify-center gap-2">
        <FaTag className="text-red-500" /> Discount Products
      </h2>

      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        
        speed={1500}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {discountProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                  {Math.round(
                    ((product.price - product.discountPrice) / product.price) *
                      100
                  )}
                  % OFF
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.company}</p>
                <div className="mt-2">
                  <span className="text-red-500 font-bold">
                    ৳{product.discountPrice}
                  </span>{" "}
                  <span className="line-through text-gray-400 text-sm">
                    ৳{product.price}
                  </span>
                </div>
                <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountProducts;
