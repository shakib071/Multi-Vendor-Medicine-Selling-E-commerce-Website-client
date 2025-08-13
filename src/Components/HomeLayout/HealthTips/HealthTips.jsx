import { FaHeartbeat } from "react-icons/fa";

const healthTips = [
  { 
    id: 1, 
    title: "Boost Your Immunity", 
    description: "Tips to strengthen your immune system naturally.", 
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg" 
  },
  { 
    id: 2, 
    title: "Safe Antibiotics Use", 
    description: "Important guidelines to use antibiotics safely.", 
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg" 
  },
  { 
    id: 3, 
    title: "Painkillers Explained", 
    description: "How to use painkillers effectively without side effects.", 
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg" 
  },
];

const HealthTips = () => (
  <div className="py-10 ">
    <h2 className="text-3xl font-bold text-center text-green-600 mb-8 flex items-center justify-center gap-3">
      <FaHeartbeat className="text-red-500" />
      Health Tips & Guides
    </h2>
    <div className="flex flex-col gap-4 px-4">
      {healthTips.map((tip) => (
        <div 
          key={tip.id} 
          className="flex items-center bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
        >
          <img 
            src={tip.image} 
            alt={tip.title} 
            className="w-40 h-35 object-cover rounded-l-2xl p-2" 
          />
          <div className="p-4 text-xl">
            <h3 className="font-semibold text-gray-800 mb-1">{tip.title}</h3>
            <p className="text-gray-600 text-lg">{tip.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HealthTips;
