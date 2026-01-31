"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutTemplate,
    FileText,
    FolderOpen,
    Settings,
    Plus,
    Pencil
} from "lucide-react";

/**
 * Navigation configuration for the sidebar
 */
const navItems = [
    { name: "Create Event", id: "/create-event", icon: Pencil },
    { name: "Template", id: "/templates", icon: LayoutTemplate },
    { name: "Forms", id: "/create-event/forms", icon: FileText },
    { name: "Files", id: "/create-event/upload", icon: FolderOpen },
    { name: "Settings", id: "/create-event/settings", icon: Settings },
];

/**
 * Sidebar Component
 * - Laptop/Desktop: Constant w-64 with labels
 * - Tablet/Mobile: Constant w-20 icons-only
 */
export default function CreateEventSidebar() {
    const pathname = usePathname();

    return (
        <aside
            className="w-20 lg:w-64 h-screen bg-white border-r border-gray-100 flex flex-col p-4 transition-all duration-300 ease-in-out shrink-0 sticky top-0 z-50"
        >
            {/* Primary Action - Dashboard */}
            <div className="mb-8 mt-4 flex justify-center lg:px-2">
                <Link href="/dashboard"
                    className={`transition-all duration-200 flex items-center justify-center whitespace-nowrap
                        ${pathname === '/dashboard'
                            ? "bg-gradient-to-r from-teal-600 via-green-600 to-lime-600 shadow-teal-200"
                            : "bg-gradient-to-r from-teal-500 via-green-500 to-lime-500 opacity-90 hover:opacity-100 shadow-teal-100"
                        } 
                        text-white font-medium rounded-xl shadow-lg hover:shadow-xl
                        w-12 h-12 lg:w-full lg:h-auto lg:py-3.5 lg:px-4 lg:gap-2`}
                >
                    <Plus size={20} className="shrink-0" />
                    <span className="hidden lg:inline text-sm">Dashboard</span>
                </Link>
            </div>

            {/* Navigation List */}
            <nav className="flex flex-col gap-2 w-full">
                {navItems.map((item) => {
                    const isActive = pathname === item.id;

                    return (
                        <Link
                            key={item.id}
                            href={item.id}
                            className={`flex items-center rounded-xl  transition-all duration-200 relative group
                            ${isActive
                                    ? "p-[2px] bg-gradient-to-r from-orange-400 via-lime-400 to-green-400 shadow-md "
                                    : "hover:bg-gray-50 text-gray-800 hover:text-gray-900"
                                }
                            justify-center lg:justify-start w-12 h-12 mx-auto lg:w-full lg:h-auto`}
                        >
                            <div className={`flex items-center w-full h-full rounded-[10px] px-4 py-3 gap-3 transition-all duration-200 
                                ${isActive ? "bg-white" : ""}
                            `}>
                                <item.icon
                                    size={22}
                                    className={`shrink-0 ${isActive ? "text-teal-600" : "text-gray-600 group-hover:text-gray-600"}`}
                                />
                                <span className={`hidden lg:block font-medium text-sm whitespace-nowrap overflow-hidden ${isActive ? "text-teal-900 font-semibold" : ""}`}>
                                    {item.name}
                                </span>
                            </div>

                            {/* Tooltip for Mobile Icons */}
                            <div className="lg:hidden absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all transform translate-x-[-10px] group-hover:translate-x-0 z-[100] whitespace-nowrap shadow-xl">
                                {item.name}
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}