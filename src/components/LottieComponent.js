import React from 'react';
import Lottie from 'react-lottie';
import animationData from './pencil.json';
/* eslint-disable */
const LottieComponent = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    renderer: 'svg',
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
};

export default LottieComponent;
