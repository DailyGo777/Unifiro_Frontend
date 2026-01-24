import React from "react";
import CreateEventSidebar from "@/components/create-event/CreateEventSidebar";
import Link from "next/link";

export default function CreateEventLayout({ children }) {
    return (
        <div className="flex h-screen overflow-auto bg-gradient-to-br from-green-500/20 via-yellow-400/20 to-orange-400/20">
            <CreateEventSidebar />

            <div className="flex-1 flex flex-col h-full overflow-auto">
                <header className="h-25 bg-white border-b border-orange-200 shadow-lg shadow-orange-400/30 flex items-center px-8 shrink-0">
                    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                        <span className="text-4xl font-bold bg-gradient-to-r from-teal-500 via-lime-500 to-yellow-400 bg-clip-text text-transparent">
                            uni
                        </span>
                        <span className="text-4xl font-bold text-black">firo</span>
                    </Link>
                </header>

                <main className="flex-1 p-8 overflow-auto bg-gradient-to-br from-teal-50/50 via-green-50/50 to-lime-50/50">
                    {children}
                </main>
            </div>
        </div>
    );
}