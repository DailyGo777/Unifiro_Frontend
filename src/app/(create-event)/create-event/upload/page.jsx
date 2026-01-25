"use client";

import { CloudUpload, FolderUp, FileUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function UploadPage() {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        // Handle files here
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 animate-fade-in relative">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Content</h1>

            {/* Drop Zone */}
            <div
                className={`w-full max-w-4xl h-96 border-3 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all duration-300 bg-white/50 backdrop-blur-sm
            ${isDragging ? "border-teal-500 bg-teal-50/50 scale-[1.02]" : "border-gray-300 hover:border-teal-400"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg mb-6 animate-bounce-slow">
                    <CloudUpload className="text-white w-16 h-16" />
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Drop your content here or</h2>
                <p className="text-gray-500 mb-8">Support for images, videos, and documents</p>

                <div className="flex gap-4">
                    <button className="px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all flex items-center gap-2 font-medium text-gray-700">
                        <FileUp size={20} />
                        Upload files
                    </button>
                    <button className="px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all flex items-center gap-2 font-medium text-gray-700">
                        <FolderUp size={20} />
                        Upload folder
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 w-full max-w-4xl flex justify-end">
                <Link href="/create-event/settings">
                    <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                        Continue to Settings
                        <ArrowRight size={20} />
                    </button>
                </Link>
            </div>
        </div>
    );
}
