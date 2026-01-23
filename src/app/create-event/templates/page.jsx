"use client";

import { Search, LayoutTemplate, Briefcase, Calendar, Heart, User, Plus } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";

export default function TemplatesPage() {
    const galleryRef = useRef(null);

    const scrollToGallery = () => {
        galleryRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const categories = ["All", "Creators", "Product", "Marketing", "Personal"];

    const templates = [
        { title: "Registration Form", category: "Personal", color: "bg-white", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500" },
        { title: "Event Registration", category: "Marketing", color: "bg-purple-100", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500" },
        { title: "Party RSVP Form", category: "Personal", color: "bg-red-50", image: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?auto=format&fit=crop&q=80&w=500" },
        { title: "Wedding Form", category: "Personal", color: "bg-orange-50", image: "https://images.unsplash.com/photo-1519225468063-e7296d955fa2?auto=format&fit=crop&q=80&w=500" },
    ];

    return (
        <div className="h-full p-4 animate-fade-in-up space-y-24">

            {/* Top Section: Quick Selection Cards */}
            <div className="flex flex-col items-center justify-center min-h-[80vh] relative">
                <div className="text-center mb-12 animate-fade-in delay-100">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Set up your event in a guided flow.</h1>
                    <p className="text-gray-600 mt-4 text-xl max-w-2xl mx-auto">Add event details, build or select a registration form, upload required files, and publish when ready.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-4">

                    {/* Card 1: Create New Event (Scrolls to Templates) */}
                    <div onClick={scrollToGallery} className="group cursor-pointer">
                        <div className="h-100 rounded-[24px] bg-gradient-to-br from-[#A0E8D9] via-[#85DABF] to-[#CDF4A4] p-1 shadow-lg transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Plus className="w-24 h-24 text-white drop-shadow-lg" strokeWidth={1.5} />
                            <div className="absolute bottom-10 text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                Start from Template
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Placeholder / Recent (Clock Tower) */}
                    <div onClick={scrollToGallery} className="h-100 rounded-[24px] bg-white shadow-lg overflow-hidden relative group hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 font-medium">Coming Soon</span>
                        </div>
                        <div className="absolute inset-0">
                            <Image
                                src="/template/clocktemplate.png"
                                alt="Event Template"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    </div>

                    {/* Card 3: Placeholder / Recent (Person) */}
                    <div onClick={scrollToGallery} className="h-100 rounded-[24px] bg-[#0055D4] shadow-lg overflow-hidden relative group hover:-translate-y-2 transition-transform duration-300 flex items-end justify-center cursor-pointer">
                        <div className="absolute inset-0">
                            <Image
                                src="/template/webinartemplate.png"
                                alt="My Events"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative z-10 p-6 text-white text-center w-full bg-gradient-to-t from-black/60 to-transparent">
                            <h3 className="text-xl font-bold mb-1 opacity-90">My Events</h3>
                        </div>
                    </div>

                </div>
            </div>


            {/* Template Gallery Section */}
            <div ref={galleryRef} className="pt-0 mt-3 mb-12 flex flex-col items-center justify-start animate-fade-in-up">
                {/* Header */}
                <div className="text-center mb-4 mt-auto">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2 mt-0">Explore form & survey templates</h2>
                    <p className="text-gray-600 mt-2">
                        Explore, pick, and customize templates to your needs. <br />
                        Discover how to <span className="underline cursor-pointer">use templates</span>, <span className="underline cursor-pointer">create your own</span> or <span className="underline cursor-pointer">submit your template</span> to the gallery.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex justify-center flex-wrap gap-4 mb-12">
                    {categories.map((cat, idx) => (
                        <button
                            key={cat}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${idx === 0
                                ? "bg-teal-100 text-teal-700 border border-teal-200"
                                : "bg-white text-gray-600 hover:bg-gray-50 border border-transparent"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-4 mb-12 p-6">
                    {templates.map((template, idx) => (
                        <Link href="/create-event/forms" key={idx} className="group block">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-80 flex flex-col ">
                                <div className="h-4/5 overflow-hidden relative">
                                    {/* Mockup Image */}
                                    <div className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 bg-gray-100 flex items-center justify-center`}>
                                        <img src={template.image} alt={template.title} className="w-full h-full object-cover" />
                                    </div>
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                </div>
                                <div className="h-1/5 flex items-center justify-center border-t border-gray-50 bg-white z-10">
                                    <h3 className="text-md font-medium text-gray-800 group-hover:text-teal-600 transition-colors">
                                        {template.title} Template
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
