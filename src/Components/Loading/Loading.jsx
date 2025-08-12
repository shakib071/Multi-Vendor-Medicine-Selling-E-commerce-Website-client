import React from 'react';
import Lottie from "lottie-react";
import loadingAnimation from "./Loadinganimation.json";

const Loading = () => {
  // console.log('loading');
    return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <Lottie animationData={loadingAnimation} loop={true} />;
    </div>
    
    );
};

export default Loading;