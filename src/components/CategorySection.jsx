'use client';
import React, { useEffect, useRef } from 'react';

const CategorySection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.category-card').forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate-fade-in-up');
                                card.classList.remove('scroll-reveal');
                            }, index * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const categories = [
        {
            icon: '🎆',
            title: 'Celebrations & Festivals',
            description: 'Diwali, Holi, cultural events & more'
        },
        {
            icon: '⚛️',
            title: 'Sports & Leagues',
            description: 'Cricket, football, marathons & more'
        },
        {
            icon: '🎵',
            title: 'DJ Nights & Music',
            description: 'EDM, concerts, live performances'
        },
        {
            icon: '🏛️',
            title: 'Public & Cultural',
            description: 'Community gatherings & exhibitions'
        },
        {
            icon: '⚛️',
            title: 'Corporate Events',
            description: 'Conferences, summits & networking'
        }
    ];

    return (
        <section ref={sectionRef} className="w-full py-16 md:py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#20B3BC] mb-3 md:mb-4">
                    Browse by Category
                </h2>
                <p className="text-center text-base md:text-lg text-gray-700 mb-12 md:mb-16 max-w-3xl mx-auto px-4">
                    Find events that match your interests, from cultural celebrations to competitive sports
                </p>

                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                    {categories.slice(0, 4).map((category, index) => (
                        <div
                            key={index}
                            className="category-card scroll-reveal flex items-start gap-4 md:gap-6 p-6 md:p-8 border border-gray-300 rounded-2xl hover:border-[#20B3BC] hover:shadow-lg transition-all cursor-pointer"
                        >
                            <div className="text-4xl md:text-5xl flex-shrink-0">{category.icon}</div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-black mb-1 md:mb-2">{category.title}</h3>
                                <p className="text-sm md:text-base text-gray-600">{category.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Centered Last Card */}
                <div className="flex justify-center">
                    <div className="category-card scroll-reveal flex items-start gap-4 md:gap-6 p-6 md:p-8 border border-gray-300 rounded-2xl hover:border-[#20B3BC] hover:shadow-lg transition-all cursor-pointer w-full md:w-1/2">
                        <div className="text-4xl md:text-5xl flex-shrink-0">{categories[4].icon}</div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-black mb-1 md:mb-2">{categories[4].title}</h3>
                            <p className="text-sm md:text-base text-gray-600">{categories[4].description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
