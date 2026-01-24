"use client";

import { ArrowRight, Save, Layout, Type, CheckSquare, Calendar, ChevronDown, AlignLeft } from "lucide-react";
import Link from "next/link";

export default function FormsPage() {
    return (
        <div className="h-full flex flex-col animate-fade-in">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Design Your Registration Form</h1>
                    <p className="text-gray-500 text-sm">Customize the questions for your attendees.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-2.5 rounded-xl border border-teal-200 text-teal-700 font-medium hover:bg-teal-50 transition-colors flex items-center gap-2">
                        <Save size={18} />
                        Save Draft
                    </button>
                    <Link href="/create-event/upload">
                        <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
                            Next Step
                            <ArrowRight size={18} />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Main Builder Area */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Sidebar: Components */}
                <div className="w-80 bg-white/80 border-r border-gray-100 p-6 overflow-y-auto">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Form Elements</h3>

                    <div className="space-y-3">
                        {[
                            { icon: Type, label: "Input fields" },
                            { icon: CheckSquare, label: "Checkboxes" },
                            { icon: ChevronDown, label: "Dropdowns" },
                            { icon: Calendar, label: "Date pickers" },
                            { icon: AlignLeft, label: "Text Area" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm cursor-grab hover:border-teal-300 hover:shadow-md transition-all group">
                                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-teal-50 text-gray-500 group-hover:text-teal-600 transition-colors">
                                    <item.icon size={20} />
                                </div>
                                <span className="font-medium text-gray-700">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Center: Preview */}
                <div className="flex-1 bg-gray-50/50 p-8 overflow-y-auto flex justify-center">
                    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 min-h-[600px] border border-gray-100">
                        <div className="border-b border-gray-100 pb-6 mb-6">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Event Registration</h2>
                            <p className="text-gray-500">Please fill out the details below to register for the event.</p>
                        </div>

                        <div className="space-y-6">
                            {/* Mock Fields */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">First name</label>
                                <input type="text" placeholder="Your name" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input type="email" placeholder="Your email address" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Ticket Type</label>
                                <select className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-white">
                                    <option>General Admission</option>
                                    <option>VIP Access</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
