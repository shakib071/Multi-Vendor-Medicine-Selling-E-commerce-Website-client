import React, { useState } from "react";
import { FaEye, FaCartPlus } from "react-icons/fa";
import { FaPills } from "react-icons/fa";
import useCategoryMed from "../../../Hooks/getMedicineByCategory/useCategoryMed";
import useAuth from "../../../Hooks/getAuth/useAuth";
import Loading from "../../Loading/Loading";
import { useNavigate, useNavigation, useParams } from "react-router";
import { GiMedicinePills } from "react-icons/gi";
import Cart from "../../Cart/Cart";
import useAxios from "../../../Hooks/AxiosHook/useAxios";
import Swal from "sweetalert2";


const CategoryDetails = () => {
  const { category } = useParams();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const {loading,user}= useAuth();
  const {data: medicines, isLoading} = useCategoryMed(category);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const handleAddtoCart = async(medicine) => {
    const {_id, ...catMedicine}= medicine;
    
    catMedicine.quantity = parseInt(1);
    console.log(catMedicine);
    // add to datbase 
    try{
      const res = await axiosInstance.post(`/cart/${user.uid}`,catMedicine);
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
    }
  }

  if(loading || isLoading || navigation.state === 'loading'){
    return <Loading></Loading>;
  }
  // console.log(medicines);
  return (
     <div>
      { medicines.length != 0 ? ( 
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8 flex items-center justify-center gap-2">
          <FaPills className="text-red-500" />
          Medicines in <span className="text-red-400">{category}</span> Category
        </h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y text-lg divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-800">#</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-800">Name</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-800">Type</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-800">Company</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-800">Price</th>
                <th className="px-6 py-3 text-center text-lg font-medium text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {medicines.map((med, idx) => (
                <tr key={med._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">{med.name}</td>
                  <td className="px-6 py-4">{med.category}</td>
                  <td className="px-6 py-4">{med.company}</td>
                  <td className="px-6 py-4">${med.price.toFixed(2)}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => setSelectedMedicine(med)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye size={18} />
                    </button>
                    <button onClick={()=>handleAddtoCart(med)} className="text-green-600 hover:text-green-800">
                      <FaCartPlus size={18} />
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Medicine Modal */}
        {selectedMedicine && (
          <div className="fixed inset-0 bg-[#ffffff7e] bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative">
              <button
                onClick={() => setSelectedMedicine(null)}
                className="absolute top-3 right-3 text-red-500 hover:text-gray-800"
              >
                ✖
              </button>
              <img
                src={selectedMedicine.photo}
                alt={selectedMedicine.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedMedicine.name}</h3>
              <p className="text-gray-600 mb-1">Category: {selectedMedicine.category}</p>
              <p className="text-gray-600 mb-1">Company: {selectedMedicine.company}</p>
              <p className="text-gray-600 mb-1">Price: ${selectedMedicine.price.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>) : (
        <div>
          <p className="text-4xl text-center mt-10 text-blue-500 font-semibold">No Medicines in <span className="text-red-500">{category}</span> Category</p>
        </div>
      )

      }
      </div>
  );
};

export default CategoryDetails;
