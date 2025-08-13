import React from 'react';
import useAuth from '../../../Hooks/getAuth/useAuth';
import CategoryCard from '../CategorySection/CategoryCard';
import DiscountProducts from '../DiscountProducts/DiscountProducts';
import Slider from '../Slider/Slider';

const Home = () => {
    const {user} = useAuth();
    console.log(user);
    return (
        <div>
            {/* <p>This is Home</p> */}
            <Slider></Slider>
            <CategoryCard></CategoryCard>
            <DiscountProducts></DiscountProducts>
        </div>
    );
};

export default Home;