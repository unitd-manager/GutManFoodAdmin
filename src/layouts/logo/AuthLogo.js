import { Link } from 'react-router-dom';
import React from 'react';
import  MainLogo from '../../assets/images/logos/PearlFoodChainLogo.png';

const AuthLogo = () => {
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
    <img src={MainLogo} alt="Logo" className='w-100' />
    </Link>
  );
};

export default AuthLogo;