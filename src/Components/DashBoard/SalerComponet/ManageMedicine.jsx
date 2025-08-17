import { useState } from "react";
import useAuth from "../../../Hooks/getAuth/useAuth";
import useAxios from "../../../Hooks/AxiosHook/useAxios";
import Swal from "sweetalert2";
import Loading from '../../Loading/Loading';
import useSalerMedicineData from '../../../Hooks/salerMedicineData/useSalerMedicineData';
import { useNavigation } from "react-router";
import useCategories from "../../../Hooks/getCategories/useCategories";

export default function ManageMedicine() {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const [itemMass,setItemMass] = useState('Mg');
  const {user,loading} = useAuth();
  const axiosInstance = useAxios();
  const {data:medicines, isLoading,refetch} = useSalerMedicineData(user?.uid);
  const {data:categories , isLoading:categoriesLoading} = useCategories();
 

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);


  const addMedicineToDatabase = async(medicinesData) => {
    
     try{
        
        const res = await axiosInstance.post('/medicines',medicinesData);
        
        
        if(res.data.acknowledged){
          
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          refetch();
        }
     }
     catch(error) {
      console.log(error);
     }
    

  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const genericName = form.genericName.value;
    const description = form.description.value;
    const photo = form.image.files[0];
    const category = form.category.value;
    const company = form.company.value;
    const itemMassUnit = itemMass;
    const price = form.price.value;
    const discount = form.discount.value;
    
    // console.log(name,genericName,description,photo,category,company,itemMassUnit,price,discount);

    //get the image link 
    const imgBBApi = import.meta.env.VITE_ImgBB_API;

    const imageData = new FormData();
    imageData.append("image",photo);

    try{
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBApi}`,{
            method:"POST",
            body: imageData,
        });
        const data = await res.json();
        // console.log(data.data.url);
        const medicinesData = {
          name,
          genericName,
          description,
          photo:data.data.url,
          category,
          company,
          itemMassUnit,
          price: parseFloat(price),
          discount:parseFloat(discount),
          addedDate : new Date(),
         
          saler: {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
          }
        }
        addMedicineToDatabase(medicinesData);
    }
    catch(error){
      console.log(error);
    }


    closeModal();
  };

  if(loading || isLoading || navigation.state === 'loading' ||categoriesLoading){
    return <Loading></Loading>;
  }

  // console.log(categories);
  

  return (
    

    
    <div className="p-1  min-h-screen">
      <title>Manage Medicine - CureCart</title>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Medicines</h1>
        <button
          onClick={openModal}
          className="bg-indigo-600 text-xl hover:bg-indigo-700 text-white px-5 py-2 rounded-md shadow"
        >
          + Add Medicine
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              {[
                "Item Name",
                "Generic Name",
                "Category",
                "Company",
                "Mass Unit",
                "Price",
                "Discount",
                
              ].map((header) => (
                <th
                  key={header}
                  className="px-2 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y text-[16px] text-center divide-gray-50">
            {medicines.map((med) => (
              <tr key={med._id} className="hover:bg-indigo-50 transition">
                <td className="px-2 py-4 whitespace-nowrap text-[16px] font-medium text-gray-900">
                  {med.name}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[16px] text-gray-700">
                  {med.genericName}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[16px] text-gray-700">
                  {med.category}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[16px] text-gray-700">
                  {med.company}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[16px] text-gray-700">
                  {med.itemMassUnit}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[16px] text-gray-700">
                  ${med.price.toFixed(2)}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-[16px] text-gray-700">
                  {med.discount}%
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
    

        <div className="mt-5 fixed inset-0  bg-opacity-40 flex justify-center items-center z-50 p-4 overflow-auto">
            <div className="bg-white rounded-xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl ring-1 ring-gray-3000">
                <h2 className="text-2xl font-bold  mb-6 text-gray-900 tracking-wide">
                Add New Medicine
                </h2>
                <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    required
                    className="w-full border border-gray-300 rounded-lg text-lg px-5 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <input
                    type="text"
                    name="genericName"
                    placeholder="Generic Name"
                    required
                    className="w-full border border-gray-300 rounded-lg text-lg px-5 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <textarea
                    name="description"
                    placeholder="Short Description"
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg text-lg px-5 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition"
                ></textarea>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full text-lg px-5 py-2 border border-gray-300 rounded-lg text-gray-700"
                />
                <select
                    name="category"
                    required
                    className="w-full border border-gray-300 rounded-lg text-lg px-5 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                    <option value="">Select Category</option>
                    {
                      categories.map((cat)=> (
                        <option key={cat._id} value={cat.categoryName}>{cat.categoryName}</option>
                      ))
                    }
      
                </select>
                <select
                    name="company"
                    required
                    className="w-full border border-gray-300 rounded-lg text-lg px-5 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                    <option value="">Select Company</option>
                    <option value="Pharma Inc">Pharma Inc</option>
                    <option value="MediCorp">MediCorp</option>
                    <option value="HealCare Pharma">HealCare Pharma</option>
                    <option value="CurePlus Pharma">CurePlus Pharma</option>
                    <option value="BioMed Pharma">BioMed Pharma</option>
                    <option value="LifeWell Pharma">LifeWell Pharma</option>
                    <option value="MediLife Labs">MediLife Labs</option>
                </select>
                <label className="text-xl pl-2">Item Mass Unit</label>
                <div className="flex gap-6 text-lg px-5 py-2 items-center">
                  
                    <label className="flex items-center gap-3 cursor-pointer text-gray-700">
                    <input
                        type="radio"
                        name="massUnit"
                        value="Mg"
                        checked = {itemMass === 'Mg'}
                        onChange={(e)=> setItemMass(e.target.value)}
                        className="form-radio h-5 w-5 text-indigo-600"
                    />
                    Mg
                    </label>
                    <label className="flex items-center gap-3  cursor-pointer text-gray-700">
                    <input
                        type="radio"
                        name="massUnit"
                        value="ML"
                        checked = {itemMass === 'ML'}
                        onChange={(e)=> setItemMass(e.target.value)}
                        className="form-radio h-5 w-5  text-indigo-600"
                    />
                    ML
                    </label>
                </div>

                <input
                    type="number"
                    name="price"
                    placeholder="Per Unit Price"
                    min="0"
                    step="0.01"
                    required
                    className="w-full border border-gray-300 rounded-lg text-lg px-5 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <label className="text-xl">Discount</label>
                <input
                    type="number"
                    name="discount"
                    placeholder="Discount % (default 0)"
                    min="0"
                    max="100"
                    defaultValue={0}
                    className="w-full border border-gray-300 rounded-lg text-lg px-5 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />

                <div className="flex justify-end gap-2 mt-2">
                    <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 rounded-lg text-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-6 py-2 rounded-lg text-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                    >
                    Add Medicine
                    </button>
                </div>
                </form>
            </div>
        </div>


      )}
    </div>
    
    
  );
}
