import React from 'react';

const TitleOwner = ({title,subtitle}) => {
    return (
        <div className='text-start space-y-3'>
            <h1 className='text-xl md:text-3xl text-[#090A0B]'>{title}</h1>
            <p className='text-base text-[#414141CC]'>{subtitle}</p>
        </div>
    );
};

export default TitleOwner;