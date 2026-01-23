"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

export default function CreateEventPage() {
    return (
        <div className="flex h-full flex-col items-center justify-center p-8 relative animate-fade-in-up">
            <div>
                
            </div>
            {/* Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">

                {/* Card 1: Create New Event */}
                <Link href="/create-event/templates" className="group cursor-pointer">
                    <div className="h-96 rounded-[32px] bg-gradient-to-br from-[#A0E8D9] via-[#85DABF] to-[#CDF4A4] p-1 shadow-lg transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Plus className="w-24 h-24 text-white drop-shadow-md" strokeWidth={1.5} />
                    </div>
                </Link>

                {/* Card 2: Placeholder / Recent (Clock Tower) */}
                <div className="h-96 rounded-[32px] bg-white shadow-lg overflow-hidden relative group hover:-translate-y-2 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 font-medium">Coming Soon</span>
                    </div>
                    {/* Using a visually similar placeholder for the Clock Tower */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1570535384218-356c429bbcdb?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>

                {/* Card 3: Placeholder / Recent (Person) */}
                <div className="h-96 rounded-[32px] bg-[#0055D4] shadow-lg overflow-hidden relative group hover:-translate-y-2 transition-transform duration-300 flex items-end justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-800" />
                    <div className="relative z-10 p-6 text-white text-center w-full">
                        <h3 className="text-xl font-bold mb-1 opacity-90">My Events</h3>
                    </div>
                    {/* Using a visually similar placeholder for the 3D character */}
                    <div className="absolute bottom-0 w-48 h-56 bg-[url('https://cdn3d.iconscout.com/3d/premium/thumb/businessman-working-on-laptop-2993862-2491136.png')] bg-contain bg-bottom bg-no-repeat opacity-90" />
                </div>

            </div>
            <div className="mt-12 text-center animate-fade-in delay-200">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Set up your event in a guided flow.</h1>
                <p className="text-gray-600 mt-2 text-lg">Add event details, build or select a registration form, upload required files, and publish when ready.</p>
            </div>
        </div>
    );
}
