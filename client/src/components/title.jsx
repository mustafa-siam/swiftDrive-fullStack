import React from 'react';

const Title = ({title,subtitle}) => {
    return (
        <div className='text-center space-y-3'>
            <h1 className='text-3xl md:text-4xl font-bold'>{title}</h1>
            <p className='text-base text-[#414141CC]'>{subtitle}</p>
        </div>
    );
};

export default Title;