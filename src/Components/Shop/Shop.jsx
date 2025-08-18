
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import useAllMedicines from "../../Hooks/getAllMedicine/useAllMedicines";
import Loading from "../Loading/Loading";
import useAxios from "../../Hooks/AxiosHook/useAxios";
import useAuth from "../../Hooks/getAuth/useAuth";
import Swal from "sweetalert2";
import { useNavigate, useNavigation } from "react-router";

const Shop = () => {
  // const {data:medicineCount, isLoading:countLoading} = useMedicineCount();
  // // console.log(medicines);
  // console.log('medicine count', medicineCount?.count);
  const axiosInstance = useAxios();
  const {user,loading} = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedPage , setSelectedPage] = useState(0);
  const [numberOfPage, setNumberOfPage] = useState(2);
  const [sortOrder,setSortOrder] = useState(0);
  const [SearchQuery,setsearchQuery] = useState("");

  const {data:medicines,isLoading,refetch} = useAllMedicines(selectedPage,itemsPerPage,sortOrder,SearchQuery);

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
  }, [selectedPage, itemsPerPage,itemsPerPage,sortOrder,SearchQuery ,refetch]);

  useEffect(()=>{
    const medicinecount = medicines?.count;
    
    const numofPage = Math.ceil(medicinecount/parseInt(itemsPerPage));
    setNumberOfPage(numofPage);
    refetch();
  },[medicines?.count,itemsPerPage,refetch]);
 

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

  const handleSortOrder = (e) => {
    const value = parseInt(e.target.value);
    setSortOrder(value);
    
  }

  const handleSearchQuery = (e) => {
    e.preventDefault();
    const value = e.target.searchQuery.value;
    setsearchQuery(value);
    setSelectedPage(0);
  }


  
  console.log('items per page',itemsPerPage);
  console.log('selected page',selectedPage);

  const handleAddtoCart = async(medicine) => {
    const {_id, ...catMedicine}= medicine;
    
    catMedicine.quantity = parseInt(1);
    console.log(catMedicine);
    // add to datbase 
    if(user){

    
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
    else {
      navigate('/login');
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


  if(isLoading || loading || navigation.state == 'loading'){
    return <Loading></Loading>;
  }

  return (
    <div className="p-1 md:p-6 bg-gray-50 xl:max-w-[90%] 2xl:max-w-[87%] mx-auto rounded-2xl mt-5 min-h-screen">
      <title>Shop - CureCart</title>
      <h1 className="text-3xl text-center font-bold text-blue-700 mb-10">
        Shop Medicines
      </h1>

      <div className="p-6 bg-white rounded-xl shadow-md flex flex-col md:flex-row items-center gap-4 mb-6">
  
        
        <div className="flex-1">
          <form onSubmit={handleSearchQuery} className="flex items-center  bg-white border rounded-lg shadow-sm px-3 py-2">
            <input
              type="text"
              placeholder="Search medicine, company, generic , category name..."
              name="searchQuery"
              className="flex-1 outline-none text-gray-700 text-sm"
            />
            <button className="ml-2 md:text-lg   btn btn-primary px-3 py-1 ">
              submit
            </button>
          </form>
        </div>

       
        <div className="flex  items-center gap-2">
          <span className="text-gray-700 text-lg md:text-xl font-medium ">Sort by Price:</span>
          <select onChange={(e)=>handleSortOrder(e)} className="border rounded-lg px-3 py-1 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="1">Low to High</option>
            <option value="-1">High to Low</option>
          </select>
        </div>

      </div>


      <div className="overflow-x-auto  bg-white rounded-xl shadow-md">
        <table className="min-w-full text-[13px] md:text-lg">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-1 md:p-3 text-left">No</th>
              <th className="p-1 md:p-3 text-left">Name</th>
              <th className="p-1 md:p-3 text-left">Category</th>
              <th className="p-1 md:p-3 text-left">Price</th>
              <th className="p-1 md:p-3 text-left">Company</th>
              <th className="p-1 md:p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines?.allMedicines?.map((med,index) => (
              <tr
                key={med._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-1 md:p-3 font-medium">{index+1}</td>
                <td className="p-1 md:p-3 font-medium">{med.name}</td>
                <td className="p-1 md:p-3">{med.category}</td>
                <td className="p-1 md:p-3">${med.price}</td>
                <td className="p-1 md:p-3">{med.company}</td>
                <td className="p-1 md:p-3 flex justify-center gap-1 md:gap-2">
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

      
    <div className="flex  flex-col md:flex-row justify-center  items-center md:gap-4 mt-10 space-y-4 md:space-y-0">

      <div className="flex  items-center sm:space-x-1 md:space-x-2">
        {/* Prev */}
        <button onClick={handlePrevButton} className=" px-1 md:px-3 py-1 text-[10px] sm:text-[14px] md:text-[16px] rounded-lg border bg-white hover:bg-blue-500 hover:text-white border-gray-300">
          Prev
        </button>
        {
          pages?.map((page,index)=>
             <button  onClick={()=>{handleKeyClick(parseInt(page))}} key={index} className={`px-3 py-1  rounded-lg ${selectedPage==page ?'text-white bg-blue-500 ': 'bg-white text-black'} border text-[10px] sm:text-[14px] md:text-[16px] text-black  hover:bg-blue-500 border-gray-300`}>
              {page + 1}
            </button>
          )
        }
        
    
        {/* Next */}
        <button onClick={handleNextButton} className="px-1 md:px-3 py-1 text-[10px] sm:text-[14px] md:text-[16px] rounded-lg border bg-white hover:bg-blue-500 hover:text-white border-gray-300">
          Next
        </button>

        
        </div>


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
