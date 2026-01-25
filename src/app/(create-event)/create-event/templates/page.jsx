"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { LayoutTemplate, Plus, X, ArrowLeft } from "lucide-react";

// Mock Link component for standalone preview environment
const Link = ({ children, href, className }) => (
    <a href="#" onClick={(e) => e.preventDefault()} className={className}>{children}</a>
);

const TemplatesPage = () => {
    // view can be 'landing' or 'gallery'
    const [view, setView] = useState('landing');
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Creators", "Product", "Marketing", "Personal"];
    const gradientClass = "bg-gradient-to-r from-orange-400 via-lime-400 to-green-400";

    const templates = [
        { title: "Registration Form", category: "Personal", color: "bg-white", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500" },
        { title: "Event Registration", category: "Marketing", color: "bg-purple-100", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500" },
        { title: "Party RSVP Form", category: "Personal", color: "bg-red-50", image: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?auto=format&fit=crop&q=80&w=500" },
        { title: "Wedding Form", category: "Personal", color: "bg-orange-50", image: "https://images.unsplash.com/photo-1519225468063-e7296d955fa2?auto=format&fit=crop&q=80&w=500" },
    ];

    const filteredTemplates = activeCategory === "All"
        ? templates
        : templates.filter(t => t.category === activeCategory);

    return (
        <div className="min-h-screen overflow-x-hidden">
            <div className="max-w-7xl mx-auto pt-4">

                {/* 1. LANDING VIEW */}
                {view === 'landing' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center">
                        <div className="text-center mb-6">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                                Set up your event in a guided flow.
                            </h1>
                            <p className="text-gray-600 mt-6 text-xl max-w-2xl mx-auto">
                                Add event details, build or select a registration form, upload required files, and publish when ready.
                            </p>
                        </div>
                        {/* card1 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl pb-24">
                            <div onClick={() => setView('gallery')} className="group cursor-pointer">
                                <div className="h-100 rounded-[24px] bg-gradient-to-br from-[#A0E8D9] via-[#85DABF] to-[#CDF4A4] p-1 shadow-lg transition-all duration-500 transform group-hover:-translate-y-3 group-hover:shadow-2xl relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <Plus className="w-24 h-24 text-white drop-shadow-md" strokeWidth={1.5} />
                                    <div className="absolute bottom-10 text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300">
                                        Start from Template
                                    </div>
                                </div>
                            </div>

                            {/* Card 2*/}
                            <div className="h-100 rounded-[24px] bg-white shadow-md overflow-hidden relative group border border-gray-100 flex items-center justify-center">
                                <div className="absolute inset-0">
                                    <Image
                                        src="/template/clocktemplate.png"
                                        alt="Event Template"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                <div className="text-center">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Coming Soon</span>
                                </div>
                            </div>

                            {/* Card 3*/}
                            <div onClick={() => setView('gallery')} className="h-100 rounded-[24px] bg-[#0055D4] shadow-lg overflow-hidden relative group hover:-translate-y-3 transition-all duration-500 flex items-end justify-center cursor-pointer">
                                <div className="absolute inset-0">
                                    <Image
                                        src="/template/webinartemplate.png"
                                        alt="My Events"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="relative z-10 p-6 text-white text-center w-full bg-gradient-to-t from-black/60 to-transparent">
                                    {/* <p className="font-bold text-lg">Webinar & Workshops</p>
                                    <p className="text-sm opacity-80">View recent picks</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. GALLERY VIEW */}

                {view === 'gallery' && (
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        <div className="flex items-center justify-between mb-0 mt-0">
                            <button
                                onClick={() => setView('landing')}
                                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium group"
                            >
                                <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100 group-hover:bg-gray-50">
                                    <ArrowLeft className="w-5 h-5" />
                                </div>
                                {/* <span>Back to flow</span> */}
                            </button>

                            <button
                                onClick={() => setView('landing')}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold md:text-4xl text-gray-900 tracking-tight">Explore form & survey templates</h2>
                            <p className="text-gray-800 mt-3 max-w-xl mx-auto">
                                Explore, pick, and customize templates to your needs. <br />
                                Discover how to <span className="underline cursor-pointer">use templates</span> , <span className="underline cursor-pointer">create your own</span> or <span className="underline cursor-pointer">submit your template</span> to the gallery.
                            </p>
                        </div>

                        {/* Navigation  */}

                        <div className="flex justify-center flex-wrap gap-3 mb-6">
                            {categories.map((cat) => {
                                const isActive = activeCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`rounded-full transition-all duration-300 focus:outline-none ${isActive
                                            ? `p-[1.5px] ${gradientClass} shadow-md scale-105`
                                            : "p-[1.5px] bg-transparent hover:scale-105"
                                            }`}
                                    >
                                        <span className={`block px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${isActive
                                            ? "bg-white text-gray-900"
                                            : "bg-transparent text-gray-600 hover:text-gray-900"
                                            }`}>
                                            {cat}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>



                        {/* Templates Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-24">
                            {filteredTemplates.map((template, idx) => (
                                <Link href="#" key={idx} className="group block">
                                    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-96 flex flex-col">
                                        <div className="h-5/6 overflow-hidden relative bg-gray-50">
                                            <img
                                                src={template.image}
                                                alt={template.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-gray-600 uppercase">
                                                    {template.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="h-1/6 flex flex-col items-center justify-center px-6 bg-white z-10">
                                            <h3 className="text-base font-bold text-gray-800 group-hover:text-orange-500 transition-colors text-center">
                                                {template.title}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function App() {
    return <TemplatesPage />;
}