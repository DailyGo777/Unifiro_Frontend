import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full h-full flex flex-col items-center py-20 overflow-hidden px-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url(/herobg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col justify-center items-center mt-4 md:mt-8">
        <h1 className="text-4xl md:text-5xl lg:text-[5rem] font-bold text-black tracking-tight leading-[1.1] mb-6 animate-fade-in-up">
          Your Gateway to <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-lime-400">
            Uni
          </span>
          firo Experiences
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-[#171717] max-w-3xl mb-8 md:mb-12 leading-relaxed font-medium animate-fade-in-up delay-200">
          Explore, register, and attend thousands of events.{" "}
          <br className="hidden md:block" />
          <span className="md:inline block">
            From conferences to concerts, workshops to webinars—all in one
            place.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto animate-fade-in-up delay-300">
          <Link href={"/discover"}>
            <button className="w-full cursor-pointer sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-xl text-white font-bold text-lg md:text-xl shadow-[0_10px_30px_rgba(32,179,188,0.2)] bg-gradient-to-r from-[#20B3BC] to-[#CFC31E] hover:opacity-90 hover:scale-105 transition-all">
              Explore Events
            </button>
          </Link>
          {/* // Assuming you have an 'isLoggedIn' variable from your auth state
          const destination = isLoggedIn ? "/dashboard" : "/organiser-login"; */}
          <Link href={"/dashboard"}>
            <button className="w-full cursor-pointer sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-xl bg-white text-black font-bold text-lg md:text-xl border border-gray-300 shadow-sm hover:shadow-md hover:scale-105 transition-all">
              Host an Event
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
