
import { useState } from "react";
import { Eye } from "lucide-react";

const Shop = () => {
  const [medicines] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      price: 50,
      stock: 120,
      description:
        "Used to reduce fever and relieve mild to moderate pain.",
      image:
        "https://via.placeholder.com/100x100.png?text=Paracetamol",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotic",
      price: 120,
      stock: 80,
      description:
        "Used to treat a variety of bacterial infections.",
      image:
        "https://via.placeholder.com/100x100.png?text=Amoxicillin",
    },
    {
      id: 3,
      name: "Vitamin C Tablets",
      category: "Supplements",
      price: 200,
      stock: 50,
      description:
        "Boosts immunity and improves skin health.",
      image:
        "https://via.placeholder.com/100x100.png?text=Vitamin+C",
    },
  ]);

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-center font-bold text-blue-700 mb-10">
        Shop Medicines
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-lg">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr
                key={med.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{med.name}</td>
                <td className="p-3">{med.category}</td>
                <td className="p-3">{med.price}৳</td>
                <td className="p-3">{med.stock}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => openModal(med)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
                  >
                    <Eye size={18} />
                  </button>
                  <button
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

      {/* Medicine Details Modal */}
      {isModalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <img
              src={selectedMedicine.image}
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
                <strong>Price:</strong> {selectedMedicine.price}৳
              </p>
              <p>
                <strong>Stock:</strong> {selectedMedicine.stock}
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
