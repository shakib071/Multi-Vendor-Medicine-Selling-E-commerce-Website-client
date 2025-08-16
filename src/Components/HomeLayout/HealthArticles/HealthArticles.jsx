import React from "react";
import { FaBookMedical } from "react-icons/fa";

const articles = [
  {
    id: 1,
    title: "Understanding Pain Management",
    excerpt: "Learn effective ways to manage chronic and acute pain safely.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5MojEVvCXHQ5f_X6rP-46zblb3SkGCoT-0A&s",
    link: "https://www.healthline.com/health/pain-relief"
  },
  {
    id: 2,
    title: "Healthy Heart Tips",
    excerpt: "Simple lifestyle changes to maintain a healthy cardiovascular system.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIlA389vbfkPlppscdECT5qeltBkxdmv37Vg&s",
    link: "https://www.heart.org/en/healthy-living"
  },
  {
    id: 3,
    title: "Preventing Common Infections",
    excerpt: "How to strengthen immunity and avoid common infections.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB6HRl5tk-Klx95vsC34dTpSTsMyAf5mJrmg&s",
    link: "https://www.cdc.gov/preventing-infections/index.html"
  },
  {
    id: 4,
    title: "Nutrition for Better Immunity",
    excerpt: "Foods and supplements to boost your immune system naturally.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8uLEYfZMDnc8rJPJGSprmEGIFznxX6JinJw&s",
    link: "https://www.medicalnewstoday.com/articles/322412"
  },
  {
    id: 5,
    title: "Managing Diabetes Effectively",
    excerpt: "Tips and strategies for controlling blood sugar levels.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsA4Yjnef6g9RKsD6LLU3kTBCB8dpWs1WleA&s",
    link: "https://www.diabetes.org/diabetes"
  },
  {
    id: 6,
    title: "Mental Health Awareness",
    excerpt: "Understanding mental health and ways to improve well-being.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxAxvu0ctPNaOpBkJ5fVQZsnkYE4nyMrqkCA&s",
    link: "https://www.mentalhealth.gov/"
  },
  {
    id: 7,
    title: "Safe Use of Antibiotics",
    excerpt: "How to use antibiotics correctly and avoid resistance.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3EvulFC7HjTO9Ot-jYcRWFvARPLiH-OjXQw&s",
    link: "https://www.who.int/news-room/fact-sheets/detail/antibiotic-resistance"
  },
  {
    id: 8,
    title: "Exercise for Joint Health",
    excerpt: "Simple exercises to improve mobility and reduce joint pain.",
    image: "https://www.vhwellfit.com/wp-content/uploads/sites/4/2023/10/PWM-2524959_Oct10_Infograph_LowImpactArthtritis-scaled.jpg",
    link: "https://www.arthritis.org/health-wellness/healthy-living/physical-activity/getting-started/8-ways-exercise-helps-joints"
  },
  {
    id: 9,
    title: "Understanding Hypertension",
    excerpt: "Learn about high blood pressure and how to manage it.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeS1L0Z_yJ1p7O0SdfQ0rB9sQSgLoLzXakkQ&s",
    link: "https://www.heart.org/en/health-topics/high-blood-pressure"
  },
  
];



const HealthArticles = () => {
  return (
    <div className="py-10  px-4">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8 flex items-center justify-center gap-2">
        <FaBookMedical /> Latest Health Articles
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover p-2"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
              <a href={article.link} target="_blank">
                <button className="text-indigo-600 font-semibold hover:underline">
                Read More
              </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthArticles;
