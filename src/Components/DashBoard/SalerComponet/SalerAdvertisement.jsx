import React, { useState } from 'react';

const dummyAds = [
  {
    id: 1,
    medicineName: 'Paracetamol',
    description: 'Best painkiller',
    imageUrl: 'https://i.ibb.co/Hw7Ggz0/Whats-App-Image-2025-08-12-at-22-59-20-4a4658b3.jpg',
    status: 'Active',
  },
  {
    id: 2,
    medicineName: 'Amoxicillin',
    description: 'Effective antibiotic',
    imageUrl: 'https://i.ibb.co/Hw7Ggz0/Whats-App-Image-2025-08-12-at-22-59-20-4a4658b3.jpg',
    status: 'Inactive',
  },
];

const SalerAdvertisement = () => {
  const [ads, setAds] = useState(dummyAds);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAd, setNewAd] = useState({ image: null, description: '' });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewAd({ image: null, description: '' });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewAd((prev) => ({ ...prev, image: files[0] }));
    } else {
      setNewAd((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you’d upload the image, save ad info, etc.
    const newAdEntry = {
      id: ads.length + 1,
      medicineName: 'New Medicine', // You can extend this to select medicine
      description: newAd.description,
      imageUrl: URL.createObjectURL(newAd.image),
      status: 'Pending',
    };
    setAds([...ads, newAdEntry]);
    closeModal();
  };

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
        {ads.map(({ id, medicineName, description, imageUrl, status }) => (
          <div key={id} className="flex items-center gap-4 border p-4 rounded-xl">
            <img src={imageUrl} alt={medicineName} className="w-24 h-24 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{medicineName}</h3>
              <p className="text-gray-600 text-[24px]">{description}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-gray-300 text-gray-700'
              }`}
            >
              {status}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4 overflow-auto">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl ring-1 ring-gray-300">
            <h3 className="text-xl font-bold mb-4">Add Advertisement</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required
                className="w-full text-xl border border-gray-300 px-4 py-1 rounded-lg"
              />
              <textarea
                name="description"
                rows={3}
                placeholder="Description for the advertisement"
                value={newAd.description}
                onChange={handleChange}
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
