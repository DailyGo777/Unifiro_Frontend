"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    LayoutTemplate,
    FolderOpen,
    Palette,
    Settings,
    Pencil,
    Plus,
    ChevronLeft,
    ChevronRight,
    Home
} from "lucide-react";

import { useTemplates } from "@/context/TemplatesContext";

export default function TemplatesSidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { setView, view, setIsComponentLibraryOpen, isComponentLibraryOpen, setSelectedLayout } = useTemplates();

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, type: 'link' },
        { name: "Create Event", href: "/create-event", icon: Pencil, type: 'link' },
        { name: "Templates Home", action: () => { setView('landing'); setSelectedLayout(null); }, icon: Home, type: 'button', activeView: 'landing' },
        { name: "Browse Gallery", action: () => setView('gallery'), icon: LayoutTemplate, type: 'button', activeView: 'gallery' },
        { name: "My Templates", action: () => setView('personal'), icon: FolderOpen, type: 'button', activeView: 'personal' },
        { name: "Global Themes", action: () => setView('themes'), icon: Palette, type: 'button', activeView: 'themes' },
    ];

    const handleInsertClick = () => {
        if (view === 'builder') {
            setIsComponentLibraryOpen(!isComponentLibraryOpen);
        } else {
            setView('gallery');
        }
    };

    const isCreateActive = view === 'builder';

    return (
        <aside
            className={`${isCollapsed ? "w-20" : "w-64"
                } h-cover bg-white sticky top-0 border-r border-gray-100 flex flex-col p-4 transition-all duration-300 md:relative fixed z-50`}
        >
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-10 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50 z-50 hidden md:flex"
            >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            <div className={`mb-10 flex items-center ${isCollapsed ? "justify-center" : "gap-2"}`}>
                <div className="shrink-0 overflow-hidden">
                    <button
                        onClick={() => { setView('landing'); setSelectedLayout(null); }}
                        className="block hover:opacity-80 transition-opacity whitespace-nowrap text-left"
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
                    </button>
                </div>
            </div>

            {/* Create Template Button - Prominent like Dashboard's Create Event */}
            <button
                onClick={() => { setView('builder'); setSelectedLayout(null); }}
                className={`bg-gradient-to-r cursor-pointer from-[#14b8a6] via-[#22c55e] to-[#84cc16] text-white font-medium rounded-xl flex items-center justify-center shadow-lg shadow-teal-100 hover:shadow-xl transition-all mb-8 whitespace-nowrap
                ${isCollapsed ? "w-12 h-12 p-0 mx-auto" : "w-full py-3 px-4 gap-2"}
                ${isCreateActive ? "ring-2 ring-offset-2 ring-teal-500" : ""}`}
            >
                <Plus size={20} />
                {!isCollapsed && "Create Template"}
            </button>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                    const isActive = (item.type === 'link' && pathname === item.href) ||
                        (item.type === 'button' && view === item.activeView);

                    const Content = (
                        <div className={`flex items-center w-full h-full rounded-[10px] transition-all duration-200 text-black
                                ${isActive ? "bg-white" : ""} 
                                ${isCollapsed ? "justify-center p-3" : "gap-4 px-4 py-3"}
                            `}>
                            {isActive && !isCollapsed && (
                                <div className="absolute left-0 top-0 h-full w-1 rounded-l-md text-black" />
                            )}
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-50 pointer-events-none rounded-xl text-black" />
                            )}

                            <item.icon
                                size={22}
                                className={`shrink-0 ${isActive ? "text-black" : "text-gray-800"}`}
                            />
                            {!isCollapsed && <span className="z-10 whitespace-nowrap overflow-hidden">{item.name}</span>}

                            {isCollapsed && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded opacity-2 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap text-white">
                                    {item.name}
                                </div>
                            )}
                        </div>
                    );

                    if (item.type === 'link') {
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center rounded-xl transition-all duration-200 relative group
                                ${isActive
                                        ? "p-[1.5px] bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 shadow-sm text-gray-800 font-bold"
                                        : "text-gray-800 hover:bg-gray-50"
                                    }
                                ${isCollapsed ? "justify-center p-3" : "gap-4"}
                                `}
                            >
                                {Content}
                            </Link>
                        );
                    } else {
                        return (
                            <button
                                key={item.name}
                                onClick={item.action}
                                className={`flex items-center rounded-xl transition-all duration-200 relative group text-left w-full
                                ${isActive
                                        ? "p-[1.5px] bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 shadow-sm text-gray-800 font-bold"
                                        : "text-gray-800 hover:bg-gray-50"
                                    }
                                ${isCollapsed ? "justify-center p-3" : "gap-4"}
                                `}
                            >
                                {Content}
                            </button>
                        );
                    }
                })}
            </nav>

            <div className="flex-1" />

            <div className={`mt-auto pt-8 ${isCollapsed ? "flex justify-center" : "px-1"}`}>
                <button
                    onClick={handleInsertClick}
                    className={`flex items-center gap-3 w-full p-2 rounded-2xl transition-all group ${isCollapsed ? "justify-center" : "bg-gray-50/80 hover:bg-gray-100 border border-gray-100/50 shadow-sm"} ${isComponentLibraryOpen && view === 'builder' ? 'ring-2 ring-indigo-500 bg-indigo-50' : ''}`}

                >
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <LayoutTemplate size={20} className="text-gray-600" />
                    </div>
                    {!isCollapsed && (
                        <span className="text-sm font-bold text-gray-900">Insert</span>
                    )}
                </button>
            </div>

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
