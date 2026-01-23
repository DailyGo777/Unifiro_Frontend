"use client";

import { Search, LayoutTemplate, Briefcase, Calendar, Heart, User } from "lucide-react";
import Link from "next/link";

export default function TemplatesPage() {
    const categories = ["All", "Creators", "Product", "Marketing", "Personal"];

    const templates = [
        { title: "Registration Form", category: "Personal", color: "bg-white", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500" }, // Placeholder for simple form
        { title: "Event Registration", category: "Marketing", color: "bg-purple-100", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500" }, // Concert/Event
        { title: "Party RSVP Form", category: "Personal", color: "bg-red-50", image: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?auto=format&fit=crop&q=80&w=500" }, // Elegant party
        { title: "Wedding Form", category: "Personal", color: "bg-orange-50", image: "https://images.unsplash.com/photo-1519225468063-e7296d955fa2?auto=format&fit=crop&q=80&w=500" }, // Wedding
    ];

    return (
        <div className="h-full p-8 animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Explore form & survey templates</h1>
                <p className="text-gray-600">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {templates.map((template, idx) => (
                    <Link href="/create-event/forms" key={idx} className="group block">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-80 flex flex-col">
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
    );
}
