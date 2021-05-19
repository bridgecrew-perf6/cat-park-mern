import React from 'react';
import logo from '../img/logo.png';

const DefaultImage = () => {
    return (
        <img
            src={logo}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt="loading"
        />
    );
};

export default DefaultImage;
