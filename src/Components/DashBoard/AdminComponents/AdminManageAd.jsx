// AdminManageAd.jsx
import { useState } from "react";

const AdminManageAd = () => {
  const [ads, setAds] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      description: "Effective for fever and mild pain relief.",
      sellerEmail: "seller1@example.com",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=80&q=80",
      inSlide: false,
    },
    {
      id: 2,
      name: "Amoxicillin",
      description: "Antibiotic for bacterial infections.",
      sellerEmail: "seller2@example.com",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=80&q=80",
      inSlide: true,
    },
    {
      id: 3,
      name: "Vitamin C",
      description: "Boosts immunity and prevents scurvy.",
      sellerEmail: "seller3@example.com",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=80&q=80",
      inSlide: false,
    },
  ]);

  const toggleSlide = (id) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id ? { ...ad, inSlide: !ad.inSlide } : ad
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 rounded-2xl min-h-screen">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Manage Banner Advertise
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-[16px]">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Medicine Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Seller Email</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr
                key={ad.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <img
                    src={ad.image}
                    alt={ad.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                </td>
                <td className="p-3 font-medium">{ad.name}</td>
                <td className="p-3 text-gray-600">{ad.description}</td>
                <td className="p-3 text-gray-500">{ad.sellerEmail}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => toggleSlide(ad.id)}
                    className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
                      ad.inSlide
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                    }`}
                  >
                    {ad.inSlide ? "Remove from Slide" : "Add to Slide"}
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
