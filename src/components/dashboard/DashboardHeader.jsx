import React from "react";

export default function DashboardHeader({ title = "Dashboard" }) {
    return (
        <div className="mt-0 mb-8 bg-white p-6 rounded-2xl shadow-xl border border-teal-700/60 flex justify-content-start">
            <h1 className="text-3xl font-semibold text-gray-900 font-bold" style={{fontFamily: "sans-serif", }}>{title}</h1>
        </div>
    );
}
