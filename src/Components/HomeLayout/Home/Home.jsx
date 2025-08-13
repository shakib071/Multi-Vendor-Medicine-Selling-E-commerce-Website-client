import React from 'react';
import useAuth from '../../../Hooks/getAuth/useAuth';
import CategoryCard from '../CategorySection/CategoryCard';
import DiscountProducts from '../DiscountProducts/DiscountProducts';
import Slider from '../Slider/Slider';
import HealthTips from '../HealthTips/HealthTips';
import HealthArticles from '../HealthArticles/HealthArticles'

const Home = () => {
    const {user} = useAuth();
    console.log(user);
    return (
        <div>
            
            <Slider></Slider>
            <CategoryCard></CategoryCard>
            <DiscountProducts></DiscountProducts>
            <HealthTips></HealthTips>
            <HealthArticles></HealthArticles>
        </div>
    );
};

export default Home;