import React from 'react';
import Image from 'next/image';

const WhyChooseUs = () => {
    const features = [
        {
            icon: '🎫',
            title: 'Easy Registration',
            description: 'Book tickets and register for events in just a few clicks'
        },
        {
            icon: '🔒',
            title: 'Secure Payments',
            description: 'Multiple payment options with bank-grade security'
        },
        {
            icon: '✅',
            title: 'Verified Organizers',
            description: 'All event organizers are verified for your safety'
        },
        {
            icon: '⭐',
            title: 'Quality Events',
            description: 'Curated selection of the best events in your city'
        }
    ];

    return (
        <section className="relative w-full py-20 px-4 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/Why Choose US .webp"
                    alt="Background"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <h2 className="text-4xl md:text-5xl font-bold text-center text-black mb-4">
                    Why Choose <span className="font-bold">Unifiro?</span>
                </h2>
                <p className="text-center text-lg text-gray-800 mb-16">
                    We make event discovery and registration seamless, safe, and enjoyable
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-6 p-8 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-3xl hover:bg-white/90 transition-all"
                        >
                            <div className="text-5xl flex-shrink-0">{feature.icon}</div>
                            <div>
                                <h3 className="text-xl font-bold text-black mb-2">{feature.title}</h3>
                                <p className="text-gray-700">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
