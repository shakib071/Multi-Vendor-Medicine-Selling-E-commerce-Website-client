// src/components/DiscountProducts.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaTag } from "react-icons/fa";
import useTopDiscountedMed from "../../../Hooks/getTopDicountedMed/useTopDiscountedMed";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";
import { useNavigate, useNavigation } from "react-router";
import useAuth from "../../../Hooks/getAuth/useAuth";
import useAxios from "../../../Hooks/AxiosHook/useAxios";



const DiscountProducts = () => {
  const {data:discountProducts,isLoading} = useTopDiscountedMed();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const {user,loading} = useAuth();
  const axiosInstance = useAxios();

  // console.log('discounted prod',discountProducts);


  
  const handleAddtoCart = async(medicine) => {
    const {_id, ...catMedicine}= medicine;
    
    catMedicine.quantity = parseInt(1);
    console.log(catMedicine);
    // add to datbase 
    try{
      const res = await axiosInstance.post(`/cart/${user?.uid}`,catMedicine);
      // console.log(res.data);
      if(res.data.insertedId || res.data._id){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Medicine has been added to cart ",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(`/cart/${user.uid}`)
      }

      else{
          Swal.fire({
          position: "center",
          icon: "warning",
          title: "Medicine already exist in your cart",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(`/cart/${user.uid}`)
      }

      

    }
    catch(error){
      console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          });
        }
  }

  if(isLoading || loading || navigation.state=='loading'){
    return <Loading></Loading>;
  }

  return (
    <div className=" xl:max-w-[90%] 2xl:max-w-[87%] mx-auto px-4 py-10">

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
        className="md:pb-10 "
      >
        {discountProducts && discountProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200   w-90">
             
              <div className="relative aspect-square w-full">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                  {product.discount}% OFF
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.company}</p>
                <div className="mt-2">
                  <span className="text-red-500 font-bold">
                    ${(product.price - (product.price * product.discount) / 100).toFixed(2)}
                  </span>{" "}
                  <span className="line-through text-gray-400 text-sm">
                    ${product.price}
                  </span>
                </div>
                <button onClick={()=>handleAddtoCart(product)} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
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
