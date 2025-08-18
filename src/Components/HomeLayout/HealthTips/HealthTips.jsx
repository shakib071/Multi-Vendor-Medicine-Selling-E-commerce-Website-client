import { FaHeartbeat } from "react-icons/fa";

const healthTips = [
  { 
    id: 1, 
    title: "Boost Your Immunity", 
    description: "Tips to strengthen your immune system naturally.", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMWIMRfdmPGZJ2YIfWohaSvj7uRxQY7blcgA&s",
    link: "https://www.iffcotokio.co.in/blog/health-insurance/boost-your-immunity",
  },
  { 
    id: 2, 
    title: "Safe Antibiotics Use", 
    description: "Important guidelines to use antibiotics safely.", 
    image: "https://www.babymed.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fmithya%2Fbabymed%2Fantibiotics%2520pregnancy%2520thermometer-temperature-fever-flu_0.jpg&w=3840&q=75&dpl=dpl_4AWBDq4oEGGYqSUNck6NTBpygdSQ",
    link: "https://www.babymed.com/medications/safe-antibiotics-during-pregnancy",
  },
  { 
    id: 3, 
    title: "Painkillers Explained", 
    description: "How to use painkillers effectively without side effects.", 
    image: "https://www.midwestdetoxcenter.com/wp-content/uploads/2021/02/Most-Commonly-Abused-Painkillers.jpg" ,
    link: "https://www.midwestdetoxcenter.com/rehab-blog/most-commonly-abused-painkillers/",
  },
  { 
    id: 4, 
    title: "Healthy Hydration", 
    description: "Learn why staying hydrated is essential for overall health.", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjEsCfkKAluCzljXgshxbgPHXF4vDLhXEVkw&s" ,
    link: "https://meant2preventkitchen.ca/2020/07/30/healthy-hydration-are-you-drinking-enough-water/",
  },
  { 
    id: 5, 
    title: "Balanced Diet Basics", 
    description: "Tips for maintaining a balanced diet for optimal energy.", 
    image: "https://media.istockphoto.com/id/146807105/photo/food-pyramid-pie-chart.jpg?s=612x612&w=0&k=20&c=SX0hFBaED3Wwi0G2pLfhsYN1GRjlyK8wzqHf-qUyJOk=",
    link: "https://www.istockphoto.com/photos/balanced-diet-chart",
  },
  { 
    id: 6, 
    title: "Exercise Regularly", 
    description: "Simple ways to include daily exercise in your routine.", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVmC2y4NOt2HpHCkimcx17VxyrMvsP2Vc74g&s" ,
    link:"https://www.lifelinehealthcarebd.org/Exercise-Regularly-Stay-Fit-and-Healthy-138",

  },
  { 
    id: 7, 
    title: "Mental Health Matters", 
    description: "Tips to reduce stress and improve mental well-being.", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp8FVmXDJvNQ7aioREM6RD0Ak1EYjePA5LJg&s",
    link: "https://makersgonnalearn.com/cut_files/mental-health-matters/",
  },
  { 
    id: 8, 
    title: "Sleep Hygiene", 
    description: "How to get quality sleep for better health.", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv4fjIj6EH2K5hT5sK9kxGEkiQfT_2sHFftw&s" ,
    link: "https://centershealthcare.com/media/is-your-sleep-hygiene-as-good-as-it-should-be/",
  },
  { 
    id: 9, 
    title: "Heart Health Tips", 
    description: "Ways to maintain a healthy heart and reduce risks.", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrhEOBh1GNJo3X3DrlptlaMNZNzWs_fY9ASQ&s",
    link: "https://www.bestcardiologistpune.com/preventive-tips-for-a-healthy-heart/",
  },
  { 
    id: 10, 
    title: "Vaccination Awareness", 
    description: "Why staying up-to-date with vaccines is important.", 
    image: "https://reginacommunityclinic.ca/pub/why_vaccinate_english_1.png",
    link: "https://reginacommunityclinic.ca/services/vaccine-awareness",
  },
];


const HealthTips = () => (
  <div className="py-10 xl:max-w-6xl 2xl:max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center text-green-600 mb-8 flex items-center justify-center gap-3">
      <FaHeartbeat className="text-red-500" />
      Health Tips & Guides
    </h2>
    <div className="flex flex-col gap-4 px-4">
      {healthTips.map((tip) => (
        <a key={tip.id}  href={tip.link} target="_blank">
        <div 
          
          className="flex cursor-pointer items-center bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
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
        </a>
      ))}
    </div>
  </div>
);

export default HealthTips;
