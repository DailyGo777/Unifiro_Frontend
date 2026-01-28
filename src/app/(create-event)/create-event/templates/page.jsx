"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import TemplateLanding from "@/components/create-event/TemplateSection/TemplateLanding";
import TemplateGallery from "@/components/create-event/TemplateSection/TemplateGallery";
import TemplateBuilder from "@/components/create-event/TemplateSection/TemplateBuilder";

const TemplatesPage = () => {
    // view can be 'landing' or 'gallery'
    const [view, setView] = useState('landing');
    const [activeCategory, setActiveCategory] = useState("All");
    const [personalTemplates, setPersonalTemplates] = useState([]);

    const categories = ["All", "Creators", "Product", "Marketing", "Personal"];
    const gradientClass = "bg-gradient-to-r from-orange-400 via-lime-400 to-green-400";

    const defaultTemplates = [
        { title: "Registration Form", category: "Personal", color: "bg-white", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500" },
        { title: "Event Registration", category: "Marketing", color: "bg-purple-100", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500" },
        { title: "Party RSVP Form", category: "Personal", color: "bg-red-50", image: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?auto=format&fit=crop&q=80&w=500" },
        { title: "Wedding Form", category: "Personal", color: "bg-orange-50", image: "https://images.unsplash.com/photo-1519225468063-e7296d955fa2?auto=format&fit=crop&q=80&w=500" },
    ];

    // Load personal templates from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('personalTemplates');
        if (saved) {
            try {
                setPersonalTemplates(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load personal templates", e);
            }
        }
    }, []);

    const templates = [...personalTemplates, ...defaultTemplates];

    const filteredTemplates = activeCategory === "All"
        ? templates
        : templates.filter(t => t.category === activeCategory);

    const deleteTemplate = (id) => {
        if (confirm('Are you sure you want to delete this template?')) {
            const updated = personalTemplates.filter(t => t.id !== id);
            setPersonalTemplates(updated);
            localStorage.setItem('personalTemplates', JSON.stringify(updated));
        }
    };

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
                            <div onClick={() => setView('builder')} className="group cursor-pointer">
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
                    <TemplateGallery
                        onBack={() => setView('landing')}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                        categories={categories}
                        filteredTemplates={filteredTemplates}
                        onDelete={deleteTemplate}
                        personalTemplates={personalTemplates}
                        gradientClass={gradientClass}
                    />
                )}
                {/* 3. BUILDER VIEW */}
                {view === 'builder' && (
                    <TemplateBuilder onBack={() => setView('landing')} />
                )}
            </div>
        </div>
    );
};

export default function App() {
    return <TemplatesPage />;
}