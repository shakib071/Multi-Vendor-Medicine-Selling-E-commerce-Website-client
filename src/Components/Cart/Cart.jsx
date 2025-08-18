import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import useUserCartMed from "../../Hooks/getUserCart/useUserCartMed";

import Loading from "../Loading/Loading";
import useAxios from "../../Hooks/AxiosHook/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/getAuth/useAuth";
import { useNavigate } from "react-router";


const Cart = () => {

    
  
  const {user,loading} = useAuth();
  const {data: cart,isLoading,refetch} = useUserCartMed(user?.uid);
  const [total,setTotal] = useState(0);
  const axiosInstance = useAxios();
  const navigate = useNavigate();


    useEffect(() => {
      if (user?.uid) {
        refetch();
      }
    }, [user?.uid,refetch]);
  

  
  
  const handleQuantityIncrement = async(name) => {
    const data  = {
      name: name,
      increment: true,
    }
    try{
      const res = await axiosInstance.patch(`/incOrDec-cat-quantity/${user?.uid}`,data)
      
      if(res.data.modifiedCount){
        refetch();
      }
    }
    catch(error){
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  }


  const handleQuantityDecrement = async(name,quantity) => {
    const data  = {
      name: name,
      increment: false,
    }
    
    if(quantity > 1){
      try{
      const res = await axiosInstance.patch(`/incOrDec-cat-quantity/${user?.uid}`,data)
      
      if(res.data.modifiedCount){
        refetch();
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
    
  } 

  useEffect (()=> {
    const handleTotal=() => {
      let intialTotal = 0;
      for(let i=0;i<cart?.medicines?.length;i++){
        // console.log(cart.medicines[i].price,cart.medicines[i].quantity)
        intialTotal += cart.medicines[i].price * cart.medicines[i].quantity;
        // console.log(intialTotal);
      }
      setTotal(intialTotal);
    } 

    handleTotal();
  },[cart?.medicines?.map(med => `${med.price}-${med.quantity}`).join(",")]);

  
  const handleClearCart = async() => {
    console.log('10');
    const res = await axiosInstance.delete(`/delete-cart/${user?.uid}`);
    console.log(res.data);
    if(res.data.deletedCount){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your cart has been deleted",
        showConfirmButton: false,
        timer: 1500
      });
      refetch();
    }
  }

  const deleteCartItem = async(name) => {
    const res = await axiosInstance.delete(`/delete-cart-item/${user?.uid}/med/${name}`)
    console.log(res.data);

    if(res.data.modifiedCount){
      Swal.fire({
      position: "center",
      icon: "success",
      title: "Item Deleted successfully",
      showConfirmButton: false,
      timer: 1500
    });
      refetch();
    }
    
  }

  const handleCheckOut = () => {
    navigate('/checkout', {state : total});
  }


  if( isLoading || loading){
    return <Loading></Loading>;
  }

  return (
    <div className="p-1 sm:p-2 md:p-6 xl:max-w-[90%] 2xl:max-w-[87%] mx-auto">
      <title>Cart - CureCart</title>
      <h1 className="text-4xl  font-bold text-blue-600 mb-10  flex justify-center items-center gap-2">
        <FaShoppingCart className="text-green-400" /> Your Cart
      </h1>
          {cart?.length === 0 ? (
        <p className="text-gray-500 text-center text-4xl">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full text-[9px] sm:text-lg lg:text-xl 2xl:text-2xl  text-left text-gray-700">
              <thead className="bg-blue-100 text-blue-800 uppercase text-[9px] sm:text-xs lg:text-lg 2xl:text-xl">
                <tr>
                  <th className="p-1 md:px-4 py-3">Image</th>
                  <th className="p-1 md:px-4 py-3">Medicine Name</th>
                  <th className="p-1 md:px-4 py-3">Company</th>
                  <th className="p-1 md:px-4 py-3">Price/Unit</th>
                  <th className="p-1 md:px-4 py-3">Quantity</th>
                  <th className="p-1 md:px-4 py-3">Total</th>
                  <th className="p-1 md:px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart?.medicines?.map((item,index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="p-1 md:px-4 py-3">
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="p-1 md:px-4 py-3 font-medium">{item.name}</td>
                    <td className="p-1 md:px-4 py-3">{item.company}</td>
                    <td className="p-1 md:px-4 py-3 text-green-600 font-semibold">
                      ${item.price}
                    </td>
                    <td className="p-1 md:px-4 py-3 flex items-center gap-2">
                      <button
                        onClick={()=> handleQuantityDecrement(item.name,item.quantity)}
                        className="p-1 border rounded hover:bg-gray-200"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={()=>handleQuantityIncrement(item.name)} 
                        className="p-1 border rounded hover:bg-gray-200"
                      >
                        <Plus  size={14} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-blue-600 font-bold">
                      {(item.quantity*item.price)}
                    </td>
                    <td className="p-1 md:px-4 py-3 text-center">
                      <button
                        onClick={()=> deleteCartItem(item.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              onClick={()=> handleClearCart()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Clear Cart
            </button>
            <div className="flex items-center gap-6">
              <h2 className="text-lg font-bold">
                Total: <span className="text-green-600">{total.toFixed(2)}</span>
              </h2>
              <button onClick={()=> handleCheckOut()} className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
  
    </div>
  );
};

export default Cart;
