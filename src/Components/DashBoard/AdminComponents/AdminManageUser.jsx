import React, { useState } from "react";

const roles = ["user", "seller", "admin"];

const AdminManageUser = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "Alice", email: "alice@example.com", role: "user" },
    { id: 2, username: "Bob", email: "bob@example.com", role: "seller" },
    { id: 3, username: "Charlie", email: "charlie@example.com", role: "admin" },
  ]);

  const changeRole = (id, newRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h1>

      <table className="w-full border-collapse">
        <thead className="text-lg ">
          <tr>
            <th className="text-left  px-6 py-3 font-semibold uppercase bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-tl-lg">
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
          {users.map(({ id, username, email, role }) => (
            <tr
              key={id}
              className="bg-gray-50 text-xl hover:bg-gray-100 transition-colors"
            >
              <td className="px-6 py-4 text-gray-900 font-medium">{username}</td>
              <td className="px-6 py-4 text-gray-700">{email}</td>
              <td className="px-6 py-4 capitalize text-indigo-800 font-semibold">
                {role}
              </td>
              <td className="px-6 py-4">
                <select
                  value={role}
                  onChange={(e) => changeRole(id, e.target.value)}
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
