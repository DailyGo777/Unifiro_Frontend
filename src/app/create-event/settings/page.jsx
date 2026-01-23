"use client";

import { Calendar, MapPin, Globe, Lock, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SettingsPage() {

    const handlePublish = () => {
        toast.success("Event Published Successfully!", {
            className: 'unifiro-toast',
            progressClassName: 'unifiro-toast-progress',
        });
    };

    return (
        <div className="h-full p-8 overflow-y-auto animate-fade-in-up pb-24">
            <ToastContainer position="bottom-right" />

            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Event Settings</h1>
                    <p className="text-gray-500 mt-1">Finalize your event details before publishing.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* General Info */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4 text-teal-600">
                            <Share2 size={20} />
                            <h2 className="font-semibold text-lg">General Info</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                                <input type="text" placeholder="e.g. Summer Music Festival" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea rows={4} placeholder="Describe your event..." className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4 text-purple-600">
                            <Calendar size={20} />
                            <h2 className="font-semibold text-lg">Date & Time</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <input type="date" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <input type="date" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                    <input type="time" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                    <input type="time" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4 text-red-500">
                            <MapPin size={20} />
                            <h2 className="font-semibold text-lg">Location</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="h-32 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                                Map Placeholder
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input type="text" placeholder="123 Event St, City" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Privacy */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div className="flex items-center gap-2 mb-4 text-blue-600">
                            <Lock size={20} />
                            <h2 className="font-semibold text-lg">Privacy</h2>
                        </div>
                        <div className="flex items-center justify-around py-8">
                            <div className="text-center group cursor-pointer">
                                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-2 group-hover:bg-blue-100 transition-colors mx-auto">
                                    <Globe size={28} />
                                </div>
                                <span className="font-medium text-gray-700">Public</span>
                            </div>
                            <div className="text-center group cursor-pointer">
                                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2 group-hover:bg-gray-200 transition-colors mx-auto">
                                    <Lock size={28} />
                                </div>
                                <span className="font-medium text-gray-500">Private</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Action Bar */}
                <div className="flex justify-center mt-12 mb-12">
                    <button
                        onClick={handlePublish}
                        className="px-12 py-4 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
                    >
                        Publish Event
                        <ArrowRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
