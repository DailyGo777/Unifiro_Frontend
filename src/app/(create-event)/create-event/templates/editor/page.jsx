"use client";

import React from "react";
import TemplateBuilderSidebar from "@/components/create-event/TemplateSection/TemplateBuilderSidebar";

export default function EditorPage() {
    return (
        <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
            {/* Left Sidebar */}
            <TemplateBuilderSidebar />

            {/* Main Canvas Area */}
            <main className="flex-1 relative flex flex-col h-full overflow-hidden">
                {/* Top Bar / Toolbar (Optional - for context) */}
                <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        {/* Breadcrumbs or Title */}
                        <h1 className="font-semibold text-gray-700">Untitled Template</h1>
                        <span className="px-2 py-0.5 bg-gray-100 text-xs rounded text-gray-500">Draft</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-black transition-colors">Publish</button>
                    </div>
                </header>

                {/* Canvas Background */}
                <div className="flex-1 bg-gray-100 p-8 overflow-auto flex justify-center">
                    {/* The "Page" being edited */}
                    <div className="w-full max-w-[1024px] min-h-[800px] bg-white shadow-xl rounded-lg border border-gray-200 relative">
                        {/* Empty State / Grid lines could go here */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                            style={{
                                backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}
                        />

                        <div className="p-12 text-center mt-20 text-gray-400">
                            <p>Drag and drop components here</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
