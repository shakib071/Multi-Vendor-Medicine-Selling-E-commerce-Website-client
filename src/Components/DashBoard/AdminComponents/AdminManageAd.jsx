
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/AxiosHook/useAxios";
import useAllAdvertisement from "../../../Hooks/getAllAdversiment/useAllAdvertisement";
import Loading from "../../Loading/Loading";
import { useNavigation } from "react-router";

const AdminManageAd = () => {
  const {data:ads,isLoading,refetch} = useAllAdvertisement();
  const axiosInstance = useAxios();
  const navigation = useNavigation();
  

  const addorRemoveToadSlide = async(status,ad) => {
    
    if(status=='inactive'){
      //add to slide
      const res = await axiosInstance.patch(`/add-ad-to-slide/${ad._id}`,{Status : "active"});

      if(res?.data?.modifiedCount){
       refetch();
      }
    }
    else{
      //remove from slide
      const res = await axiosInstance.patch(`/add-ad-to-slide/${ad._id}`,{Status : "inactive"});

      if(res?.data?.modifiedCount){
       refetch();
      }
    }
  }


  if(isLoading || navigation.state == 'loading'){
    return <Loading></Loading>;
  }

  return (
    <div className="p-2 lg:p-6 bg-gray-50 rounded-2xl min-h-screen">
      <title>Manage Advertisement - CureCart</title>
      <h1 className="text-lg lg:text-2xl font-bold text-blue-700 mb-6">
        Manage Banner Advertise
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-[6px] md:text-[16px]">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-5 lg:p-3 text-left">Image</th>
              <th className="p-1 lg:p-3 text-left">Medicine Name</th>
              <th className="p-1 lg:p-3 text-left">Description</th>
              <th className="p-1 lg:p-3 text-left">Seller Email</th>
              <th className="p-1 lg:p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr
                key={ad._id}
                className="border-b  hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <img
                    src={ad.imageUrl}
                    alt={ad.name}
                    className="w-5 h-5 lg:w-16 lg:h-16 rounded-lg object-cover border"
                  />
                </td>
                <td className="p-1 lg:p-3 text-[6px]  lg:text-xl font-semibold ">{ad.name}</td>
                <td className="p-1 lg:p-3 text-gray-600">{ad.description}</td>
                <td className="p-1 lg:p-3 text-gray-500">{ad.adder_email}</td>
                <td className="p-1 lg:p-3 text-center">
                  <button
                    onClick={()=>addorRemoveToadSlide(ad.status,ad)}
                    className={`px-2 lg:px-4 py-1 rounded-full text-[5px] lg:text-sm font-semibold transition ${
                      ad.status == 'inactive'
                        ? "bg-green-100 text-green-600 hover:bg-green-200"
                        : "bg-red-100 text-red-600 hover:bg-red-200"
                    }`}
                  >
                    {ad.status == 'inactive' ? "Add to Slide" : "Remove from Slide" }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageAd;
