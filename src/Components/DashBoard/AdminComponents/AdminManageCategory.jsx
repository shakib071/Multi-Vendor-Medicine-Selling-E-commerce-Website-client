import React, { useState } from "react";
import uploadImageBB from '../../../Hooks/UploadImage/uploadImageBB'
import useAuth from "../../../Hooks/getAuth/useAuth";
import Loading from "../../Loading/Loading";
import { useNavigation } from "react-router";
import useAxios from "../../../Hooks/AxiosHook/useAxios";
import Swal from "sweetalert2";
import useCategories from "../../../Hooks/getCategories/useCategories";

export default function AdminManageCategory() {
  
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const {loading} = useAuth();
  const Navigation = useNavigation();
  const axiosInstance = useAxios();
  const {data:categories, isLoading ,refetch} = useCategories();
  const [updateData,setUpdateData] = useState([]);
  
  

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

  const deleteCategory = async(id) => {
    console.log(id);
    const res = await axiosInstance.delete(`/delete-category/${id}`);
    console.log(res.data);
    if(res.data.deletedCount){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "category deleted successfully",
        showConfirmButton: false,
        timer: 1500
      });
      refetch();
    }
  }

  const handleUpdateModal = (id, categoryName, categoryImage) => {
    setShowUpdateModal(true);
    const updatedData = {
        id,
        categoryName,
        categoryImage
    }
    setUpdateData(updatedData);
    

  }


  const updateCategoryToDatabase = async(upData) => {
    // console.log(upData.id);
    try{
      const res = await axiosInstance.patch(`/update-category/${updateData.id}`,upData);
      console.log(res.data);
      if(res.data.modifiedCount){
        Swal.fire({
        position: "center",
        icon: "success",
        title: "category updated  successfully",
        showConfirmButton: false,
        timer: 1500
      });
      setShowUpdateModal(false);
      refetch();
      }
      
    }
    catch(error) {
      console.log(error);
    }
    
  }
  
  const updateCategory = async(e) => {
    e.preventDefault();
    const form = e.target;
    const categoryName = form.categoryName.value;
    const categoryImageFile = form.categoryImageFile.files[0];
    let photoUrl = null;
    if(categoryImageFile){
       photoUrl = await uploadImageBB(categoryImageFile);
    }
   
    const upData = {
      categoryName,
      categoryImage:photoUrl,
    }
    updateCategoryToDatabase(upData);
    
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

  if(loading || Navigation.state == 'loading'|| Navigation.state=='submitting' || isLoading){
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-7xl mx-auto p-2 lg:p-8 bg-white rounded-xl shadow-lg">
      <title>Manage Category - CureCart</title>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
          Manage Categories
        </h1>
        <button
          onClick={() => openModal()}
          className="px-6 py-3 bg-indigo-600 text-[14px] lg:text-xl hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition"
        >
          + Add Category
        </button>
      </header>

      <table className="w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white text-left text-xs lg:text-lg">
          <tr>
            <th className="py-4 px-3 lg:px-6 font-semibold">No</th>
            <th className="py-4 px-6 lg:px-6 font-semibold">Image</th>
            <th className="py-4 px-3 lg:px-6 font-semibold">Category Name</th>
            <th className="py-4 px-3 lg:px-6 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(({ _id, categoryName, categoryImage }, i) => (
            <tr
              key={_id}
              className={`${
                i % 2 === 0 ? "bg-gray-300" : "bg-white"
              } hover:bg-indigo-50 transition-colors `}
            >
              <td className="text-center text-xs lg:text-lg">{i+1}</td>
              <td className="p-4 text-xs lg:text-lg">
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
              <td className="py-4 px-2 lg:px-6 text-gray-900 font-semibold text-xs lg:text-lg">
                {categoryName}
              </td>
              <td className="py-4 px-2 lg:px-6 flex flex-col gap-2 lg:flex-row space-x-3">
                <button
                  onClick={() => handleUpdateModal(_id, categoryName, categoryImage)}
                  className="px-2 lg:px-6 py-2 text-sm lg:text-xl rounded-md bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold transition"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteCategory(_id)}
                  className="px-2 lg:px-6 py-2 text-sm lg:text-xl rounded-md bg-red-600 text-white hover:bg-red-700 font-semibold transition"
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
      
      {showUpdateModal && (
        <div className="fixed inset-0 bg-[#ffffff87] bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Update Category
            </h2>
            <form onSubmit={updateCategory} className="space-y-5">
              <input
                type="text"
                name="categoryName"
                placeholder="Category Name"
                defaultValue={updateData.categoryName}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 text-lg"
              />


              <div>
                <label className="block mb-3 font-semibold text-gray-700">
                   Upload Image (optional)
                </label>
                <input
                  type="file"
                  name="categoryImageFile"
                  accept="image/*"
                  className="w-full border text-xl px-3 py-2 text-gray-700"
                />
               
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={()=>setShowUpdateModal(false)}
                  className="px-5 py-2 text-xl rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xl rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-md"
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
