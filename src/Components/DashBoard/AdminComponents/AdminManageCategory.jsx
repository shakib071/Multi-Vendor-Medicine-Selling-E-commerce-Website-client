import React, { useState } from "react";
import uploadImageBB from '../../../Hooks/UploadImage/uploadImageBB'
import useAuth from "../../../Hooks/getAuth/useAuth";
import Loading from "../../Loading/Loading";
import { useNavigation } from "react-router";
import useAxios from "../../../Hooks/AxiosHook/useAxios";
import Swal from "sweetalert2";
import useCategories from "../../../Hooks/getCategories/useCategories";


const fakeCategories = [
  {
    id: 1,
    categoryName: "Painkillers",
    categoryImage:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 2,
    categoryName: "Antibiotics",
    categoryImage:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 3,
    categoryName: "Vitamins",
    categoryImage:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=80&q=80",
  },
];

export default function AdminManageCategory() {
  
  const [showModal, setShowModal] = useState(false);
  const {loading} = useAuth();
  const Navigation = useNavigation();
  const axiosInstance = useAxios();
  const {data:categories, isLoading ,refetch} = useCategories();
  
  

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const addCategoryToDatabase = async(categoryData) => {
    try{
      const res = await axiosInstance.post('/category',categoryData);
    
      // console.log(res.data);
      if(res.data.acknowledged){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Category Has been added",
          showConfirmButton: false,
          timer: 1500
        });
        refetch();
        setShowModal(false);
        
      }
      else {
 
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Category Already Exists",
          showConfirmButton: false,
          timer: 2500
        });
         setShowModal(false);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  const handleAddCategory = async(e) => {
    e.preventDefault();
    const form = e.target ;
    const categoryName = form.categoryName.value;
    const categoryImageFile = form.categoryImageFile.files[0];
    const imageUrl = await uploadImageBB(categoryImageFile);

    const categoryData = {
      categoryName,
      categoryImage : imageUrl,
    }

    //add to database  

    addCategoryToDatabase(categoryData);

    
    

    
  }

  if(loading || Navigation.state == 'loading' || isLoading){
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Manage Categories
        </h1>
        <button
          onClick={() => openModal()}
          className="px-6 py-3 bg-indigo-600 text-xl hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition"
        >
          + Add Category
        </button>
      </header>

      <table className="w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white text-left text-lg">
          <tr>
            <th className="py-4 px-6 font-semibold">No</th>
            <th className="py-4 px-6 font-semibold">Image</th>
            <th className="py-4 px-6 font-semibold">Category Name</th>
            <th className="py-4 px-6 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(({ _id, categoryName, categoryImage }, i) => (
            <tr
              key={_id}
              className={`${
                i % 2 === 0 ? "bg-gray-300" : "bg-white"
              } hover:bg-indigo-50 transition-colors`}
            >
              <td className="text-center">{i+1}</td>
              <td className="p-4">
                {categoryImage ? (
                  <img
                    src={categoryImage}
                    alt={categoryName}
                    className="w-20 h-20 object-cover rounded-md shadow-sm"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-sm font-medium">
                    No Image
                  </div>
                )}
              </td>
              <td className="py-4 px-6 text-gray-900 font-semibold text-lg">
                {categoryName}
              </td>
              <td className="py-4 px-6 space-x-3">
                <button
                  
                  className="px-4 py-2 text-xl rounded-md bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold transition"
                >
                  Update
                </button>
                <button
                  
                  className="px-4 py-2 text-xl rounded-md bg-red-600 text-white hover:bg-red-700 font-semibold transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="text-center text-gray-500 py-10 text-lg font-medium"
              >
                No categories available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-[#ffffff87] bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Add New Category
            </h2>
            <form onSubmit={handleAddCategory} className="space-y-5">
              <input
                type="text"
                name="categoryName"
                placeholder="Category Name"
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 text-lg"
              />


              <div>
                <label className="block mb-3 font-semibold text-gray-700">
                   Upload Image
                </label>
                <input
                  type="file"
                  name="categoryImageFile"
                  accept="image/*"
                  required
                  className="w-full border text-xl px-3 py-2 text-gray-700"
                />
               
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 text-xl rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xl rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-md"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
