import React, { useState } from "react";
import { FaEye, FaCartPlus } from "react-icons/fa";
import { FaPills } from "react-icons/fa";

// Fake medicine data
const medicines = [
  {
    id: 1,
    name: "Paracetamol",
    type: "Tablet",
    company: "Pharma Inc",
    price: 5.99,
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
  },
  {
    id: 2,
    name: "Cough Syrup",
    type: "Syrup",
    company: "MediCorp",
    price: 12.5,
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
  },
  {
    id: 3,
    name: "Vitamin C Capsule",
    type: "Capsule",
    company: "HealthPlus",
    price: 8.75,
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
  },
];

const CategoryDetails = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8 flex items-center justify-center gap-2">
        <FaPills className="text-red-500" />
        Medicines in This Category
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y text-lg divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-800">#</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-800">Name</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-800">Type</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-800">Company</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-gray-800">Price</th>
              <th className="px-6 py-3 text-center text-lg font-medium text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {medicines.map((med, idx) => (
              <tr key={med.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4">{med.name}</td>
                <td className="px-6 py-4">{med.type}</td>
                <td className="px-6 py-4">{med.company}</td>
                <td className="px-6 py-4">${med.price.toFixed(2)}</td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  <button
                    onClick={() => setSelectedMedicine(med)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye size={18} />
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <FaCartPlus size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Medicine Modal */}
      {selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative">
            <button
              onClick={() => setSelectedMedicine(null)}
              className="absolute top-3 right-3 text-red-500 hover:text-gray-800"
            >
              ✖
            </button>
            <img
              src={selectedMedicine.image}
              alt={selectedMedicine.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedMedicine.name}</h3>
            <p className="text-gray-600 mb-1">Type: {selectedMedicine.type}</p>
            <p className="text-gray-600 mb-1">Company: {selectedMedicine.company}</p>
            <p className="text-gray-600 mb-1">Price: ${selectedMedicine.price.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
