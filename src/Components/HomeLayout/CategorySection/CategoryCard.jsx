
import { useNavigate } from "react-router";
import { FaFolderOpen } from "react-icons/fa";


const CategoryCard = () => {
  const navigate = useNavigate();

  // Fake Data
  const categories = [
    {
      id: 1,
      name: "Pain Relief",
      image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
      medicinesCount: 12,
    },
    {
      id: 2,
      name: "Vitamins & Supplements",
      image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
      medicinesCount: 18,
    },
    {
      id: 3,
      name: "Cough & Cold",
      image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
      medicinesCount: 9,
    },
    {
      id: 4,
      name: "Antibiotics",
      image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
      medicinesCount: 15,
    },
    {
      id: 5,
      name: "Skin Care",
      image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
      medicinesCount: 7,
    },
    {
      id: 6,
      name: "Diabetes Care",
      image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
      medicinesCount: 5,
    },
  ];

  const handleCategory = () => {
    navigate('/category-details');
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8 flex justify-center items-center gap-2">
        <FaFolderOpen className="text-red-500" /> Medicine Categories
      </h2>

      <div onClick={handleCategory} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer overflow-hidden"
            
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {category.name}
              </h3>
              <p className="text-gray-500">
                {category.medicinesCount} Medicines
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
