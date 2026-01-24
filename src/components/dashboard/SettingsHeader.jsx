import React from "react";

export default function SettingsHeader({ title = "Settings", children }) {
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <header className="h-25 w-full ml-0 bg-white border-b border-orange-200 shadow-lg shadow-orange-400/30 flex items-center px-8 shrink-0">
                <h1 className="text-3xl font-semibold text-gray-900 font-bold" style={{ fontFamily: "sans-serif", }}>{title}</h1>
            </header>

            <main className="flex-1 overflow-auto p-4">
                {children}
            </main>
        </div>
    );
}
