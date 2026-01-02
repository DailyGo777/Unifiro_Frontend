import React from 'react';

const HostEventCTA = () => {
    return (
        <section className="w-full py-16 md:py-20 px-4 md:px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#20B3BC] mb-4 md:mb-6 px-4">
                    Ready to host your event?
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed px-4">
                    Join thousands of organizers who trust Ayojan to bring their events to life.<br className="hidden md:block" />
                    <span className="md:inline block mt-1">Easy setup, secure payments, and great visibility.</span>
                </p>
            </div>
        </section>
    );
};

export default HostEventCTA;
