"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, Filter, Mail, ChevronLeft, ChevronRight, Download } from "lucide-react";
import ParticipantsHeader from "@/components/dashboard/ParticipantsHeader";

export default function ParticipantsPage() {
    const [libLoaded, setLibLoaded] = useState(false);
    const tableRef = useRef(null);
    const [scrollMetrics, setScrollMetrics] = useState({ thumbWidth: 0, thumbLeft: 0 });
    const [participants] = useState([
        {
            id: 1,
            name: "Rahul Sharma",
            email: "rahul.sharma@gmail.com",
            phone: "+91 98765 43210",
            date: "12 Jan 2026",
            time: "10:42 AM",
            regStatus: "Confirmed",
            paymentStatus: "Paid",
        },
        {
            id: 2,
            name: "Ananya Reddy",
            email: "ananya.reddy@outlook.com",
            phone: "+91 91234 56789",
            date: "12 Jan 2026",
            time: "11:05 AM",
            regStatus: "Pending",
            paymentStatus: "Pending",
        },
        {
            id: 3,
            name: "Pooja Kulkarni",
            email: "aman.verma@yahoo.com",
            phone: "+91 90123 45678",
            date: "13 Jan 2026",
            time: "02:31 PM",
            regStatus: "Rejected",
            paymentStatus: "Rejected",
        },
        {
            id: 4,
            name: "Rahul Sharma",
            email: "rahul.sharma@gmail.com",
            phone: "+91 98765 43210",
            date: "12 Jan 2026",
            time: "10:42 AM",
            regStatus: "Confirmed",
            paymentStatus: "Paid",
        },
        {
            id: 5,
            name: "Arjun Mehta",
            email: "arjun.mehta@gmail.com",
            phone: "+91 98765 43210",
            date: "12 Jan 2026",
            time: "10:42 AM",
            regStatus: "Confirmed",
            paymentStatus: "Paid",
        },
        {
            id: 6,
            name: "Rahul Sharma",
            email: "rahul.sharma@gmail.com",
            phone: "+91 98765 43210",
            date: "12 Jan 2026",
            time: "10:42 AM",
            regStatus: "Confirmed",
            paymentStatus: "Paid",
        },
        {
            id: 7,
            name: "Rahul Sharma",
            email: "rahul.sharma@gmail.com",
            phone: "+91 98765 43210",
            date: "12 Jan 2026",
            time: "10:42 AM",
            regStatus: "Confirmed",
            paymentStatus: "Paid",
        },
        {
            id: 8,
            name: "Rahul Sharma",
            email: "rahul.sharma@gmail.com",
            phone: "+91 98765 43210",
            date: "12 Jan 2026",
            time: "10:42 AM",
            regStatus: "Confirmed",
            paymentStatus: "Paid",
        },
    ]);
    // Update scroll indicator based on table scroll position
    const handleScroll = () => {
        if (tableRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = tableRef.current;
            setScrollMetrics({
                thumbWidth: (clientWidth / scrollWidth) * 100,
                thumbLeft: (scrollLeft / scrollWidth) * 100
            });
        }
    };

    // Load XLSX library dynamically to avoid "Dynamic require" errors in this environment
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
        script.async = true;
        script.onload = () => setLibLoaded(true);
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case "Confirmed":
            case "Paid":
                return "bg-teal-100 text-teal-700 hover:bg-teal-200";
            case "Pending":
                return "bg-orange-100 text-orange-700 hover:bg-orange-200";
            case "Rejected":
                return "bg-red-100 text-red-700 hover:bg-red-200";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };
    /**
     * Function to handle Excel Export
     */
    const handleExport = () => {
        if (!libLoaded || !window.XLSX) {
            console.error("Excel library not loaded yet.");
            return;
        }

        try {
            const XLSX = window.XLSX;
            // 1. Prepare data for Excel (Map to user-friendly headers)
            const excelData = participants.map(p => ({
                "Participant Name": p.name,
                "Email Address": p.email,
                "Phone Number": p.phone,
                "Date": p.date,
                "Time": p.time,
                "Registration Status": p.regStatus,
                "Payment Status": p.paymentStatus
            }));

            // 2. Create worksheet
            const worksheet = XLSX.utils.json_to_sheet(excelData);

            // 3. Create workbook and add worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

            // 4. Generate filename with current date
            const fileName = `Participants_Data_${new Date().toISOString().split('T')[0]}.xlsx`;

            // 5. Trigger download
            XLSX.writeFile(workbook, fileName);
        } catch (error) {
            console.error("Export failed:", error);
        }
    };

    return (
        <ParticipantsHeader title="Participants">
            <div className="w-full relative pb-20">
                {/* Action Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex items-center justify-center gap-7 w-full md:w-auto">
                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search event"
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                            />
                        </div>

                        {/* Filters */}
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                            <Filter size={18} />
                            <span>Filters</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-end">

                        {/* Send Bulk Email Button */}
                        <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-teal-400 to-lime-500 text-white font-medium rounded-xl hover:shadow-lg hover:opacity-90 transition-all">
                            Send bulk email
                        </button>
                    </div>
                </div>

                {/* Participants Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                    <div className="overflow-x-auto scrollbar-hide" 
                        ref={tableRef} 
                        onScroll={handleScroll}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <table className="w-full">
                            <thead className="bg-gray-50/50">
                                <tr className="text-left text-sm font-semibold text-gray-900 border-b border-gray-100">
                                    <th className="px-6 py-4">Participant Name</th>
                                    <th className="px-6 py-4">Email Address</th>
                                    <th className="px-6 py-4">Phone Number</th>
                                    <th className="px-6 py-4">Registration Date & Time</th>
                                    <th className="px-6 py-4">Registration Status</th>
                                    <th className="px-6 py-4">Payment Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {participants.map((participant) => (
                                    <tr key={participant.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-gray-900">{participant.name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{participant.email}</td>
                                        <td className="px-6 py-4 text-gray-600">{participant.phone}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-sm text-gray-600">
                                                <span>{participant.date} • {participant.time}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${getStatusStyle(participant.regStatus)}`}>
                                                {participant.regStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${getStatusStyle(participant.paymentStatus)}`}>
                                                {participant.paymentStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Horizontal Scroll Indicator / Pagination UI */}
                    <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-white">
                        <button 
                            onClick={() => scrollBy('left')}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        
                        {/* Custom Scroll Progress Bar */}
                        <div className="flex-1 mx-8 h-1.5 bg-gray-100 rounded-full relative overflow-hidden">
                            <div 
                                className="absolute h-full bg-gray-400 rounded-full transition-all duration-150"
                                style={{ 
                                    width: `${scrollMetrics.thumbWidth}%`,
                                    left: `${scrollMetrics.thumbLeft}%`
                                }}
                            ></div>
                        </div>
                        
                        <button 
                            onClick={() => scrollBy('right')}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                
                </div>

                {/* Bottom Export Button */}
                <div className="flex justify-end">
                    <button 
                        onClick={handleExport}
                        disabled={!libLoaded}
                        className={`flex items-center gap-2 px-6 py-2 text-white font-medium rounded-xl transition-all group ${
                            libLoaded 
                            ? "bg-gradient-to-r from-teal-400 to-lime-500 hover:shadow-lg hover:opacity-90 cursor-pointer" 
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <Download size={18} className={libLoaded ? "group-hover:translate-y-0.5 transition-transform" : ""} />
                        {libLoaded ? "Export participant data" : "Loading exporter..."}
                    </button>
                </div>
            </div>
        </ParticipantsHeader>
    );
}
