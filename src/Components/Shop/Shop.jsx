
import { useState } from "react";
import { Eye } from "lucide-react";
import useAllMedicines from "../../Hooks/getAllMedicine/useAllMedicines";
import Loading from "../Loading/Loading";
import useAxios from "../../Hooks/AxiosHook/useAxios";
import useAuth from "../../Hooks/getAuth/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Shop = () => {
  const {data:medicines,isLoading} = useAllMedicines();
  console.log(medicines);
  const axiosInstance = useAxios();
  const {user,loading} = useAuth();
  const navigate = useNavigate();
  
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  


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

  const openModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  if(isLoading || loading){
    return <Loading></Loading>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-center font-bold text-blue-700 mb-10">
        Shop Medicines
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-lg">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 text-left">No</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med,index) => (
              <tr
                key={med._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{index+1}</td>
                <td className="p-3 font-medium">{med.name}</td>
                <td className="p-3">{med.category}</td>
                <td className="p-3">${med.price}</td>
                <td className="p-3">{med.company}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => openModal(med)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={()=> handleAddtoCart(med)}
                    className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold hover:bg-green-200 transition"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Medicine Details Modal */}
      {isModalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-[#ffffff84] bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <img
              src={selectedMedicine.photo}
              alt={selectedMedicine.name}
              className="w-32 h-32 object-cover mx-auto rounded-lg border"
            />
            <h2 className="text-xl font-bold text-center mt-4">
              {selectedMedicine.name}
            </h2>
            <p className="text-gray-600 text-center mt-2">
              {selectedMedicine.description}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <p>
                <strong>Category:</strong> {selectedMedicine.category}
              </p>
              <p>
                <strong>Price:</strong> ${selectedMedicine.price}
              </p>
              <p>
                <strong>Generic Name:</strong> {selectedMedicine.genericName}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
