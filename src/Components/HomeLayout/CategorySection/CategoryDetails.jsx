import React, { useEffect, useState } from "react";
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
import useCatMedCount from "../../../Hooks/getCategoryMedCount/useCatMedCount";


const CategoryDetails = () => {
  const { category } = useParams();
  const {data:medicineCount, isLoading:countLoading} = useCatMedCount(category);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const {loading,user}= useAuth();
  console.log(medicineCount)
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedPage , setSelectedPage] = useState(0);
  const [numberOfPage, setNumberOfPage] = useState(2);
  const {data: medicines, isLoading,refetch} = useCategoryMed(category,selectedPage,itemsPerPage);


  const [pages, setPages] = useState([]);
  
  useEffect(() => {
    const pageWindowSize = 10;
    let start = Math.max(selectedPage - Math.floor(pageWindowSize / 2), 0);
    let end =  Math.min(selectedPage + Math.floor(pageWindowSize / 2), numberOfPage);

    if(selectedPage - Math.floor(pageWindowSize / 2)<=0){
      end = Math.min(pageWindowSize+start,numberOfPage);
    }
    if(selectedPage + Math.floor(pageWindowSize / 2)>numberOfPage){
      start = Math.max(end-pageWindowSize,0)
    }

    const newPages = [];
    for (let i = start; i < end; i++) {
      newPages.push(i);
    }

    setPages(newPages); 
  }, [selectedPage, numberOfPage]);

  useEffect(() => {
    refetch();
  }, [selectedPage, itemsPerPage,itemsPerPage, refetch]);
  
  useEffect(()=>{
    const medicinecount = medicineCount?.count;
    
    const numofPage = Math.ceil(medicinecount/parseInt(itemsPerPage));
    setNumberOfPage(numofPage);
    refetch();
  },[medicineCount?.count,itemsPerPage,refetch]);
  
  
  console.log(pages);
  console.log('num of pages',numberOfPage);
  
  
    const handleItemsPerPage = (e) => {
      const value = parseInt(e.target.value);
      setItemsPerPage(value);
      setSelectedPage(0);
    }
  
    const handlePrevButton = () => {
      const value = selectedPage-1
      if(selectedPage>0){
        setSelectedPage(value);
     
      }
      
    }
  
    const handleNextButton = () => {
      const value = selectedPage+1;
      if(selectedPage<numberOfPage-1){
        setSelectedPage(value);
  
      }
      
    }
  
    const handleKeyClick=(page) => {
      
      setSelectedPage(page);
  
    }

  const handleAddtoCart = async(medicine) => {
    const {_id, ...catMedicine}= medicine;
    
    catMedicine.quantity = parseInt(1);
    console.log(catMedicine);
    // add to datbase 
  

      try{
        const res = await axiosInstance.post(`/cart/${user?.uid}`,catMedicine);
        // console.log(res.data);
        if(res?.data?.insertedId || res?.data?._id){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Medicine has been added to cart ",
            showConfirmButton: false,
            timer: 1500
          });
          navigate(`/cart/${user?.uid}`)
        }

        else{
            Swal.fire({
            position: "center",
            icon: "warning",
            title: "Medicine already exist in your cart",
            showConfirmButton: false,
            timer: 1500
          });
          navigate(`/cart/${user?.uid}`)
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

  if(loading || isLoading || navigation.state === 'loading' || countLoading){
    return <Loading></Loading>;
  }
  // console.log(medicines);
  return (
     <div className=" xl:max-w-[90%] 2xl:max-w-[87%] mx-auto">
      <title>Category - CureCart</title>
      { medicines.length != 0 ? ( 
      <div className="p-2 md:p-6  bg-gray-100 min-h-screen">
        <h2 className="text-xl md:text-3xl  mt-5  font-bold text-center text-blue-600 mb-8 flex items-center justify-center gap-2">
          <FaPills className="text-red-500" />
          Medicines in <span className="text-red-400">{category}</span> Category
        </h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full  divide-y text-[12px] md:text-lg divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-1 md:px-6 py-3 text-left text-[12px] md:text-lg font-medium text-gray-800">#</th>
                <th className="px-1 md:px-6 py-3 text-left text-[12px] md:text-lg font-medium text-gray-800">Name</th>
                <th className="px-1 md:px-6 py-3 text-left text-[12px] md:text-lg font-medium text-gray-800">Type</th>
                <th className="px-1 md:px-6 py-3 text-left text-[12px] md:text-lg font-medium text-gray-800">Company</th>
                <th className="px-1 md:px-6 py-3 text-left text-[12px] md:text-lg font-medium text-gray-800">Price</th>
                <th className="px-1 md:px-6 py-3 text-center text-[12px] md:text-lg font-medium text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {medicines.map((med, idx) => (
                <tr key={med._id} className="hover:bg-gray-50">
                  <td className="p-1 md:px-6 py-4">{idx + 1}</td>
                  <td className="p-1 md:px-6 py-4">{med.name}</td>
                  <td className="p-1 md:px-6 py-4">{med.category}</td>
                  <td className="p-1 md:px-6 py-4">{med.company}</td>
                  <td className="p-1 md:px-6 py-4">${med.price.toFixed(2)}</td>
                  <td className="p-1 md:px-6 py-4 flex justify-center gap-3">
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


        <div className="flex  flex-col md:flex-row justify-center  items-center md:gap-4 mt-10 space-y-4 md:space-y-0">

          <div className="flex  items-center sm:space-x-1 md:space-x-2">
            {/* Prev */}
            <button onClick={handlePrevButton} className="px-1 md:px-3 py-1 text-[10px] sm:text-[14px] md:text-[16px] rounded-lg border bg-white hover:bg-blue-500 hover:text-white border-gray-300">
              Prev
            </button>
            {
              pages?.map((page,index)=>
                <button onClick={()=>{handleKeyClick(parseInt(page))}} key={index} className={`px-3 py-1  rounded-lg ${selectedPage==page ?'text-white bg-blue-500 ': 'bg-white text-black'} border text-[10px] sm:text-[14px] md:text-[16px] text-black  hover:bg-blue-500 border-gray-300`}>
                  {page + 1}
                </button>
              )
            }
            
            {/* <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-1 rounded-lg border bg-white hover:bg-blue-500 hover:text-white border-gray-300">
              10
            </button> */}

            {/* Next */}
            <button onClick={handleNextButton} className="px-1 md:px-3 py-1 text-[10px] sm:text-[14px] md:text-[16px] rounded-lg border bg-white hover:bg-blue-500 hover:text-white border-gray-300">
              Next
            </button>

            <div className="flex items-center space-x-2">
            <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
              Items per page:
            </label>
            <select 
              onChange={handleItemsPerPage}
              value={itemsPerPage}
              id="itemsPerPage"
              className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            </div>
          </div>

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
