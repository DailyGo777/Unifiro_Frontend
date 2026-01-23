import React from "react";

export default function StatCard({
    icon: Icon,
    title,
    value,
    trend,
    trendLabel,
    trendPositive = true,
}) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-600/80 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-3 text-black-500 text-sm font-medium">
                {Icon && <Icon size={18} />}
                {title}
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-4">{value}</div>
            <div className="flex items-center gap-2 text-xs font-medium">
                <span
                    className={`px-2 py-1 rounded-md ${trendPositive
                        ? "bg-cyan-50 text-cyan-600"
                        : "bg-red-50 text-red-600"
                        }`}
                >
                    {trend}
                </span>
                <span className="px-2 py-1 rounded-md bg-cyan-50 text-cyan-600">{trendLabel}</span>
            </div>
        </div>
    );
}
