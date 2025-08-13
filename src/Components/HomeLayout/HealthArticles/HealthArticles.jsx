import React from "react";
import { FaBookMedical } from "react-icons/fa";

const articles = [
  {
    id: 1,
    title: "Understanding Pain Management",
    excerpt: "Learn effective ways to manage chronic and acute pain safely.",
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
  },
  {
    id: 2,
    title: "Healthy Heart Tips",
    excerpt: "Simple lifestyle changes to maintain a healthy cardiovascular system.",
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
  },
  {
    id: 3,
    title: "Preventing Common Infections",
    excerpt: "How to strengthen immunity and avoid common infections.",
    image: "https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
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
              <button className="text-indigo-600 font-semibold hover:underline">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthArticles;
