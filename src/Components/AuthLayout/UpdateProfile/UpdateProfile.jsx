import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/getAuth/useAuth';
import { useNavigate } from 'react-router';
import Loading from '../../Loading/Loading';
import uploadImageBB from '../../../Hooks/UploadImage/uploadImageBB';

const UpdateProfile = () => {

    const {user,updateUserData,setUser,setLoading,loading} = useAuth();
    const navigate = useNavigate();

    const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm();

  const onSubmit = async(data) => {
  
    const name = data.name;
    const photo = data.photo[0];
    console.log(name,photo);

    const photoURL = await uploadImageBB(photo);



    updateUserData({displayName : name, photoURL : photoURL})
        .then(()=>{
            setUser({...user,displayName : name, photoURL : photoURL});
            setLoading(false);

            navigate('/');
            
        })
        .catch((error)=> {
            console.log(error);
            setUser(user);
            setLoading(false);
        });
  };

  if(loading){
    return <Loading></Loading>;
  }

    
    return (
        <div className="max-w-md bg-gray-200 mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-2xl font-bold mb-5">Update Profile Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Photo Field */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Photo</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            {...register("photo", { required: "Photo is required" })}
          />
          {errors.photo && (
            <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
    );
};

export default UpdateProfile;


//  updateUserData({displayName : username, photoURL : data.data.url})
//                         .then(()=>{
//                             setUser({...user,displayName : username, photoURL : data.data.url});
//                             setLoading(false);

//                             navigate('/');
                            
//                         })
//                         .catch((error)=> {
//                             console.log(error);
//                             setUser(user);
//                             setLoading(false);
//                         });