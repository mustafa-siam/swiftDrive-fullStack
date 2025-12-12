import React from 'react';
import Title from './title';
import { easeOut, motion } from 'motion/react';
const Testimonial = () => {
    const testimonials = [
        { id: 1, name: "Emma Rodriguez", address: "Barcelona, Spain", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!" },
        { id: 2, name: "Liam Johnson", address: "New York, USA", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", rating: 4, review: "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" },
        { id: 3, name: "Sophia Lee", address: "Seoul, South Korea", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results." }
    ];
     const Star = ({ filled }) => (
        <svg className="w-4 h-4 text-[#0558FE]" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z" />
        </svg>
    );
    return (
       <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 pt-20 pb-30">
            <Title title={"What Our Customers Say"} subtitle={"Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."}></Title>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                {testimonials.map((testimonial,idx) => (
                    <motion.div 
                    initial={{opacity:0,y:40}}
                    whileInView={{opacity:1,y:0}}
                    transition={{duration:0.6,delay:idx*0.2,ease:easeOut}}
                    viewport={{once:true,amount:0.3}}
                    key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-xs hover:-translate-y-2 transition-all duration-500">
                        <div className="flex items-center gap-3 ">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <Star key={index} filled={testimonial.rating > index} />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;