
import { useNavigate } from "react-router";
import { FaFolderOpen } from "react-icons/fa";
import useCategories from "../../../Hooks/getCategories/useCategories";
import useAuth from "../../../Hooks/getAuth/useAuth";
import Loading from "../../Loading/Loading";


const CategoryCard = () => {
  const navigate = useNavigate();
  const {loading} = useAuth();

  const {data:categories,isLoading } = useCategories();



  const handleCategory = (category) => {
    navigate(`/category-details/${category}`);
  }

  if(loading || isLoading ){
    return <Loading></Loading>;
  }

  return (
    <div className="md:max-w-6xl 2xl:max-w-7xl  mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8 flex justify-center items-center gap-2">
        <FaFolderOpen className="text-red-500" /> Medicine Categories
      </h2>

      <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div onClick={()=> handleCategory(category.categoryName)}
            key={category._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer overflow-hidden"
            
          >
            <img
              src={category.categoryImage}
              alt={category.categoryName}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {category.categoryName}
              </h3>
              <p className="text-gray-500">
                {category.noOfMedicine}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
