"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

export default function CreateEventPage() {
    return (
        <div className="flex h-full min-h-[60vh] flex-col items-center justify-center p-6 relative animate-fade-in-up">

            <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">

                <Link href="/create-event/templates">
                    <button
                        className="group relative flex flex-col items-center justify-center w-48 h-40 rounded-3xl bg-gradient-to-r from-[#20B3BC] via-[#13C998] to-[#CFC31E] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                        aria-label="Create new event"
                    >
                        <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                        <Plus className="w-10 h-10 text-white mb-2" strokeWidth={1.5} />
                        <span className="text-white font-medium text-lg">Create Event</span>
                    </button>
                </Link>

                {/* Text Section */}
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Set up your event in a guided flow.
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto">
                        Add event details, build or select a registration form, upload required files, and publish when ready.
                    </p>
                </div>
            </div>
        </div>
    );
}

