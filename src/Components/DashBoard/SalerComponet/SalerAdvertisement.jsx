import React, { useState } from 'react';
import uploadImageBB from '../../../Hooks/UploadImage/uploadImageBB';
import useAuth from '../../../Hooks/getAuth/useAuth'
import useAxios from '../../../Hooks/AxiosHook/useAxios'
import Loading from '../../Loading/Loading';
import Swal from 'sweetalert2';
import useSalerAd from '../../../Hooks/getSalerAddedAd/useSalerAd';



const SalerAdvertisement = () => {


  const {user,loading} = useAuth();
  const axiosInstance = useAxios();
  const {data:ads,isLoading} = useSalerAd(user?.uid);
  console.log('adver',ads);
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };


  


  const addAdvertisement = async(e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const description = form.description.value;
    const imageUrl = await uploadImageBB(image);
    console.log(name,imageUrl,description);

    //add to database 
    const advertisement = {
      name,
      imageUrl,
      description,
      status: "inactive",
      added_by: user?.uid,
      adder_email: user?.email,
    }
    const res = await axiosInstance.post('add-advertisement', {advertisement : advertisement});
    console.log(res.data);
    if(res.data.insertedId){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your advertisement has been added",
        showConfirmButton: false,
        timer: 1500
      });
      closeModal();
    }
  }

 
  if(loading || isLoading){
    return <Loading></Loading>;
  }


  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Ask For Advertisement</h2>
      <button
        onClick={openModal}
        className="mb-4 px-5 py-2 text-xl bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Add Advertisement
      </button>

      <div className="space-y-4">
        {ads.map((ad,index) => (
          <div key={index} className="flex items-center gap-4 border p-4 rounded-xl">
            <img src={ad.imageUrl} alt={ad.name} className="w-24 h-24 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="font-semibold text-[24px]">{ad.name}</h3>
              <p className="text-gray-600 text-[16px]">{ad.description}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                ad.status !== 'inactive' ? 'bg-green-200 text-green-800' : 'bg-gray-300 text-gray-700'
              }`}
            >
              {ad.status}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#ffffff68] bg-opacity-40 flex justify-center items-center z-50 p-4 overflow-auto">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl ring-1 ring-gray-300">
            <h3 className="text-xl font-bold mb-4">Add Advertisement</h3>
            <form onSubmit={addAdvertisement} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder='Medicine Name'
                required
                className="w-full text-xl border border-gray-300 px-4 py-1 rounded-lg"
              />
             
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className="w-full text-xl border border-gray-300 px-4 py-1 rounded-lg"
              />
              <textarea
                name="description"
                rows={3}
                placeholder="Description for the advertisement"
                required
                className="w-full border text-xl border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-lg rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  o
                  type="submit"
                  className="px-4 py-2 text-lg rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalerAdvertisement;
