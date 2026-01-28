import React, { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

export function TrendChart({ events = [] }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [timeRange, setTimeRange] = useState("Last 6 Months");

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const ranges = ["Last 3 Months", "Last 6 Months", "Last Year"];

    // 1. Dynamic Data Processing
    const dataPoints = useMemo(() => {
        if (!events || events.length === 0) return months.map(() => 0);

        const counts = events.map((e) => e.count || 0);
        // Ensure we have 12 points to match the month labels
        while (counts.length < months.length) counts.push(0);
        return counts.slice(0, months.length);
    }, [events, months]);

    // 2. SVG Coordinate Calculation
    const maxVal = 600;
    const coords = useMemo(() => {
        return dataPoints.map((val, i) => {
            const x = (i / (dataPoints.length - 1)) * 100;
            const y = 95 - (val / maxVal) * 85; // Map 0 to Y=95 (baseline)
            return { x, y };
        });
    }, [dataPoints, maxVal]);

    // 3. Smooth Path Generation (Cubic Bezier)
    const generatePath = (points) => {
        if (points.length === 0) return "";
        let d = `M ${points[0].x},${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const curr = points[i];
            const next = points[i + 1];
            const cp1x = curr.x + (next.x - curr.x) / 2;
            const cp2x = curr.x + (next.x - curr.x) / 2;
            d += ` C ${cp1x},${curr.y} ${cp2x},${next.y} ${next.x},${next.y}`;
        }
        return d;
    };

    const linePath = useMemo(() => generatePath(coords), [coords]);
    const areaPath = useMemo(() => `${linePath} L 100,100 L 0,100 Z`, [linePath]);

    return (
        <div
            className="bg-white p-6 rounded-2xl shadow-xl relative overflow-hidden flex flex-col min-h-[350px] select-none transition-all"
            style={{ border: "3px solid #30c2cc" }}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold text-black leading-tight">Registration Trends</h3>
                    <p className="text-xs text-black opacity-60">
                        {events.length === 0 ? "No active registrations found" : "Overview of participant sign-ups over time"}
                    </p>
                </div>

                {/* Dropdown Menu */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-black hover:bg-opacity-90 rounded-lg border border-gray-200 transition-all shadow-sm"
                        style={{ backgroundColor: "#30c2cc" }}
                    >
                        {timeRange}
                        <ChevronDown size={12} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden">
                            {ranges.map((range) => (
                                <button
                                    key={range}
                                    className="w-full px-4 py-2.5 text-left text-xs text-black hover:bg-teal-50 hover:text-[#30c2cc] font-medium transition-colors border-b last:border-0 border-gray-50"
                                    onClick={() => {
                                        setTimeRange(range);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Visualizer Area */}
            <div className="relative flex-1 mb-3">
                <div className="absolute left-0 h-full w-8 flex flex-col justify-between text-[10px] font-bold text-black pb-4 pointer-events-none opacity-60">
                    <span>500</span>
                    <span>400</span>
                    <span>300</span>
                    <span>200</span>
                    <span>100</span>
                    <span>0</span>
                </div>

                <div className="ml-10 h-[360px] relative">
                    <div className="absolute inset-0 flex flex-col justify-between pb-4 opacity-5 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-full border-t border-black" />
                        ))}
                    </div>

                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full overflow-visible"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#30c2cc" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#30c2cc" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#2dd4bf" />
                                <stop offset="100%" stopColor="#30c2cc" />
                            </linearGradient>
                        </defs>

                        {hoveredIndex !== null && (
                            <line
                                x1={coords[hoveredIndex].x}
                                y1="0"
                                x2={coords[hoveredIndex].x}
                                y2="100"
                                stroke="#30c2cc"
                                strokeWidth="0.2"
                                strokeDasharray="1,1"
                                className="opacity-40"
                            />
                        )}

                        <path d={areaPath} fill="url(#areaGrad)" className="transition-all duration-1000 ease-in-out" />
                        <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="0.4" strokeLinecap="round" className="transition-all duration-1000 ease-in-out" />

                        {coords.map((p, i) => (
                            <g
                                key={i}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-pointer transition-all duration-1000 ease-in-out"
                            >
                                <rect x={p.x - 4} y="0" width="8" height="50" fill="transparent" />

                                <circle
                                    cx={p.x}
                                    cy={p.y}
                                    r={hoveredIndex === i ? "1" : "1"}
                                    fill={hoveredIndex === i ? "#30c2cc" : "white"}
                                    stroke="#30c2cc"
                                    strokeWidth="0.5"
                                    className="transition-all duration-200"
                                />

                                {hoveredIndex === i && dataPoints[i] > 0 && (
                                    <g className="pointer-events-none">
                                        <rect x={p.x - 7} y={p.y - 16} width="14" height="10" rx="3" fill="white" />
                                        <text x={p.x} y={p.y - 9} fontSize="4" fill="#30c2cc" textAnchor="middle" fontWeight="bold">
                                            {dataPoints[i]}
                                        </text>
                                        <path d={`M ${p.x - 2},${p.y - 5} L ${p.x},${p.y - 2} L ${p.x + 2},${p.y - 5} Z`} fill="#30c2cc" />
                                    </g>
                                )}
                            </g>
                        ))}
                    </svg>
                </div>
            </div>

            {/* X-Axis Labels */}
            <div className="ml-10 flex justify-between text-[10px] font-bold text-black uppercase tracking-tighter opacity-60">
                {months.map((m, i) => (
                    <span key={m} className={`transition-all duration-300 ${hoveredIndex === i ? 'text-[#30c2cc] scale-125' : ''}`}>
                        {m}
                    </span>
                ))}
            </div>
        </div>
    );
}

// SIMPLIFIED APP COMPONENT
export function App() {
    // You can populate this array with actual data from your database
    const myEvents = [
        { count: 120 }, { count: 300 }, { count: 250 },
        { count: 480 }, { count: 400 }, { count: 520 },
        { count: 310 }, { count: 290 }, { count: 450 },
        { count: 380 }, { count: 510 }, { count: 590 }
    ];

    return (
        <div className="min-h-screen flex justify-content-start p-3 font-sans">
            <div className="w-full max-w-3xl">
                <TrendChart events={myEvents} />
            </div>
        </div>
    );
}

export default TrendChart;