import React from 'react';
import Hero from '../components/Hero';
import Featuredcar from '../components/Featuredcar';
import Banner from '../components/Banner';
import Testimonial from '../components/Testimonial';
import NewsLetter from '../components/NewsLetter';

const Home = () => {
    return (
        <div className='space-y-12'>
            <Hero></Hero>
            <Featuredcar></Featuredcar>
            <Banner></Banner>
            <Testimonial></Testimonial>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;