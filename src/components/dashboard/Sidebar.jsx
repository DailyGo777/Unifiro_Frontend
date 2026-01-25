"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Settings,
    HandCoins,
    Plus,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Events", href: "/events", icon: CalendarDays },
        { name: "Participants", href: "/participants", icon: Users },
        { name: "Payments", href: "/payments", icon: HandCoins },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <aside
            // Dynamically set width based on isCollapsed state, with transition
            // Added responsive classes to handle mobile positioning
            className={`${isCollapsed ? "w-20" : "w-64"
                } h-cover bg-white sticky top-0 border-r border-gray-100 flex flex-col p-4 transition-all duration-300 md:relative fixed z-50`}
        >
            {/* Toggle Button for collapsing/expanding the sidebar */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-10 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50 z-50 hidden md:flex"
            >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            <div className={`mb-10 flex items-center ${isCollapsed ? "justify-center" : "gap-2"}`}>
                <div className="shrink-0 overflow-hidden">
                    <Link
                        href={"/"}
                        className="block hover:opacity-80 transition-opacity whitespace-nowrap"
                    >
                        {isCollapsed ? (
                            <span className="text-3xl font-bold bg-gradient-to-r from-teal-500 via-lime-500 to-yellow-400 bg-clip-text text-transparent">
                                U
                            </span>
                        ) : (
                            <div className="text-3xl font-bold tracking-tight">
                                <span className="bg-gradient-to-r from-teal-500 via-lime-500 to-yellow-400 bg-clip-text text-transparent">
                                    uni
                                </span>
                                <span className="text-black">firo</span>
                            </div>
                        )}
                    </Link>
                </div>
            </div>

            {/* Create Event Button */}
            {/* Adjusted size and content based on isCollapsed state */}
            <Link href={"/create-event"}>
                <button

                    className={`bg-gradient-to-r cursor-pointer from-[#14b8a6] via-[#22c55e] to-[#84cc16] text-white font-medium rounded-xl flex items-center justify-center shadow-lg shadow-teal-100 hover:shadow-xl transition-all mb-8 whitespace-nowrap
                ${isCollapsed ? "w-12 h-12 p-0 mx-auto" : "w-full py-3 px-4 gap-2"}`}
                >
                    <Plus size={20} />
                    {!isCollapsed && "Create Event"}

                </button>
            </Link>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center rounded-xl transition-all duration-200 relative group
              ${isActive
                                    ? "p-[1.5px] bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 shadow-sm text-gray-800 font-bold"
                                    : "text-gray-800 hover:bg-gray-50"
                                }
              ${isCollapsed ? "justify-center p-3" : "gap-4"}
              `}
                        >
                            <div className={`flex items-center w-full h-full rounded-[10px] transition-all duration-200 text-black
                                ${isActive ? "bg-white" : ""} 
                                ${isCollapsed ? "justify-center p-3" : "gap-4 px-4 py-3"}
                            `}>
                                {/* active visible only when not collapsed */}
                                {isActive && !isCollapsed && (
                                    <div className="absolute left-0 top-0 h-full w-1 rounded-l-md text-black" />
                                )}
                                {/* Active Glow visible when its in active */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-50 pointer-events-none rounded-xl text-black" />
                                )}

                                <item.icon
                                    size={22}
                                    className={`shrink-0 ${isActive ? "text-black" : "text-gray-800"}`}
                                />
                                {/* Navigation item name */}
                                {!isCollapsed && <span className="z-10 whitespace-nowrap overflow-hidden">{item.name}</span>}

                                {/* collapsed state - appears on hover */}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded opacity-2 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                                        {item.name}
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Mobile Overlay to close sidebar*/}
            <style jsx>{`
        @media (max-width: 768px) {
          aside {
            width: 80px !important; /* Force sidebar to collapsed width on mobile */
            position: fixed; /* Ensure it stays in place on scroll */
            height: 100vh; /* Full height */
            z-index: 50; /* Ensure it's above other content */
          }
          /* Hide text elements on mobile regardless of state to ensure "only icons" */
          aside .whitespace-nowrap {
             display: none; 
          }
          /* Re-enable icon display if constrained by above */
          aside a, aside button {
             justify-content: center !important; /* Center icons */
             padding: 12px 0 !important; /* Adjust padding */
             width: 100% !important; /* Full width for items */
          }
           aside button {
             width: 48px !important; /* Specific width for the create event button */
             height: 48px !important; /* Specific height for the create event button */
             margin: 0 auto 2rem auto !important; /* Center and add margin */
           }
        }
      `}</style>
        </aside>
    );
}
