import React from "react";
import useUsers from "../../../Hooks/getUser/useUsers";
import Loading from "../../Loading/Loading";
import useAuth from "../../../Hooks/getAuth/useAuth";
import useAxios from "../../../Hooks/AxiosHook/useAxios";
import Swal from "sweetalert2";



const AdminManageUser = () => {
 
  const roles = ["user", "saler", "admin"];
  const {user,loading} = useAuth();
  const  {data: users, isLoading,refetch} = useUsers(user?.uid);
  const axiosInstance = useAxios();
  console.log(users);

  const changeRole = (id, newRole) => {
    // console.log(id,newRole);
    axiosInstance.patch(`/update-role/${id}`,{role: newRole})
    .then(res =>{
      if(res.data.acknowledged){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Role has been Updated",
          showConfirmButton: false,
          timer: 1500
        });
        refetch();
      }
    });
    
  };

  if(isLoading || loading){
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <title>Manage User - CureCart</title>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h1>

      <table className="w-full border-collapse">
        <thead className="text-lg ">
          <tr>
            <th className="text-left  px-6 py-3 font-semibold uppercase bg-gradient-to-r from-green-300 to-teal-600 text-white rounded-tl-lg">
              No
            </th> 
            <th className="text-left  px-6 py-3 font-semibold uppercase bg-gradient-to-r from-purple-500 to-indigo-600 text-white ">
              Username
            </th>
            <th className="text-left px-6 py-3 font-semibold uppercase bg-gradient-to-r from-green-400 to-teal-500 text-white">
              Email
            </th>
            <th className="text-left px-6 py-3 font-semibold uppercase bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              Role
            </th>
            <th className="text-left px-6 py-3 font-semibold uppercase bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-tr-lg">
              Change Role
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map(({ _id, username, email, role },index) => (
            <tr
              key={_id}
              className="bg-gray-50 text-xl hover:bg-gray-100 transition-colors"
            >
              <td className="text-center">{index+1}</td>
              <td className="px-6 py-4 text-gray-900 font-medium">{username ? username : 'No name'}</td>
              <td className="px-6 py-4 text-gray-700">{email}</td>
              <td className="px-6 py-4 capitalize text-indigo-800 font-semibold">
                {role}
              </td>
              <td className="px-6 py-4">
                <select
                  value={role}
                  onChange={(e) => changeRole(_id, e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageUser;
