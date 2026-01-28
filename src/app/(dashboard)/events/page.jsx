"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter, Plus, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import EventHeader from "@/components/dashboard/EventHeader";
import { getPublishedEvents } from "@/utils/publishEvent";

export default function EventsPage() {
    const [events, setEvents] = useState([
        {
            id: 1,
            name: "Tech Innovation Summit 2024",
            date: "Oct 24, 2024",
            time: "10:00 AM",
            type: "Paid",
            registrations: 156,
            status: "Published",
            active: false,
            image: "https://images.unsplash.com/photo-1540575467063-178a50937178?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        {
            id: 2,
            name: "Design Thinking Workshop",
            date: "Oct 24, 2024",
            time: "10:00 AM",
            type: "Paid",
            registrations: 156,
            status: "Published",
            active: true,
            image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        {
            id: 3,
            name: "Annual Cultural Fest",
            date: "Oct 24, 2024",
            time: "10:00 AM",
            type: "Paid",
            registrations: 156,
            status: "Published",
            active: true,
            image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        {
            id: 4,
            name: "Startups Meetup v2",
            date: "Oct 24, 2024",
            time: "10:00 AM",
            type: "Paid",
            registrations: 156,
            status: "Published",
            active: true,
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        {
            id: 5,
            name: "React Developers Conf",
            date: "Oct 24, 2024",
            time: "10:00 AM",
            type: "Paid",
            registrations: 156,
            status: "Published",
            active: true,
            image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        {
            id: 6,
            name: "Tech Innovation Summit 2024",
            date: "Oct 24, 2024",
            time: "10:00 AM",
            type: "Paid",
            registrations: 156,
            status: "Published",
            active: true,
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
    ]);

    const [openMenuId, setOpenMenuId] = useState(null);

    // Load published events from localStorage on mount
    useEffect(() => {
        const publishedEvents = getPublishedEvents();
        
        if (publishedEvents.length > 0) {
            // Convert published events to table format
            const formattedPublishedEvents = publishedEvents.map((event, idx) => ({
                id: event.id,
                name: event.eventName,
                date: new Date(event.dateTime).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                time: new Date(event.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
                type: "Event",
                registrations: event.registrationCount || 0,
                status: event.status === 'active' ? 'Published' : event.status,
                active: event.status === 'active',
                image: event.resources?.coverImage || "https://images.unsplash.com/photo-1540575467063-178a50937178?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                description: event.description,
                location: event.location,
                isPublished: true,
                eventData: event
            }));
            
            // Combine published events with mock data
            setEvents(prev => [...formattedPublishedEvents, ...prev]);
        }
    }, []);

    const handleToggleActive = (id) => {
        setEvents(events.map(event =>
            event.id === id ? { ...event, active: !event.active } : event
        ));
    };

    const handleDeleteEvent = (id) => {
        if (confirm('Are you sure you want to delete this event?')) {
            setEvents(events.filter(event => event.id !== id));
            
            // Also remove from localStorage
            const publishedEvents = getPublishedEvents();
            const updated = publishedEvents.filter(e => e.id !== id);
            localStorage.setItem('publishedEvents', JSON.stringify(updated));
            
            setOpenMenuId(null);
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setEvents(events.map(event =>
            event.id === id ? { ...event, status: newStatus } : event
        ));
        setOpenMenuId(null);
    };

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (openMenuId && !event.target.closest('.action-menu-container')) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenuId]);

    const ToggleSwitch = ({ isOn, onToggle }) => (
        <div
            onClick={onToggle}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${isOn ? 'bg-teal-500' : 'bg-red-700'}`}
        >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? 'translate-x-6' : 'translate-x-0'}`}></div>
            <span className={`absolute text-[10px] font-bold text-white ml-1.5 ${isOn ? 'opacity-0' : 'opacity-100'}`}>OFF</span>
            <span className={`absolute text-[10px] font-bold text-white ml-7 ${isOn ? 'opacity-100' : 'opacity-0'}`}>ON</span>
        </div>
    );

    return (
        <EventHeader title="Events">
            <div className="w-full h-full pb-20">
                {/* Action Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 ">
                    <div className="flex items-center gap-4 w-full md:w-auto ">
                        {/* Search */}
                        <div className="relative w-full md:w-80 ">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search event"
                                className="w-full pl-10 pr-4 py-2 border border-gray-400 bg-cyan-90 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                            />
                        </div>
                        <div>
                            {/* Filters */}
                            <button className="flex items-center gap-2 px-4 py-2 border bg-cyan-90 border-gray-400 rounded-xl hover:bg-gray-50 transition-colors">
                                <Filter size={18} />
                                <span>Filters</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                        {/* Create Event Button */}
                        <Link href="/create-event">
                            <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-teal-400 to-lime-500 text-white font-medium rounded-xl hover:shadow-lg hover:opacity-90 transition-all">
                                <Plus size={20} />
                                Create Event
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Events Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible mb-20">
                    <div className="overflow-x-auto overflow-y-visible">
                        <table className="w-full">
                            <thead className="bg-gray-50/50">
                                <tr className="text-left text-sm font-semibold text-gray-900 border-b border-gray-100">
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Date & Time</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4 text-center">Registrations</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {events.map((event) => (
                                    <tr key={event.id} className="hover:bg-gray-50/50 transition-colors relative">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                                                    <Image
                                                        src={event.image}
                                                        alt={event.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="font-medium text-gray-900 line-clamp-2 max-w-[200px]">{event.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-sm text-gray-600">
                                                <span>{event.time}</span>
                                                <span className="text-gray-400 text-xs">{event.date}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600">
                                                {event.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-gray-900 font-medium">{event.registrations}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${event.status === 'Published' ? 'bg-teal-50 text-teal-600' :
                                                    event.status === 'Closed' ? 'bg-red-50 text-red-600' :
                                                        'bg-blue-50 text-blue-600'
                                                }`}>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4 action-menu-container relative">
                                                <ToggleSwitch
                                                    isOn={event.active}
                                                    onToggle={() => handleToggleActive(event.id)}
                                                />

                                                {/* More Options Menu */}
                                                <div className="relative">
                                                    <button
                                                        onClick={() => toggleMenu(event.id)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                                                    >
                                                        <MoreHorizontal size={20} />
                                                    </button>

                                                    {openMenuId === event.id && (
                                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                                            <button
                                                                onClick={() => handleStatusChange(event.id, 'Published')}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                                            >
                                                                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                                                                Published
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusChange(event.id, 'Active')}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                                            >
                                                                <span className="w-2 h-2 rounded-full bg-blue-50    0"></span>
                                                                Active
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusChange(event.id, 'Closed')}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                                            >
                                                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                                                Closed
                                                            </button>
                                                            <div className="border-t border-gray-100 my-1"></div>
                                                            <button
                                                                onClick={() => handleDeleteEvent(event.id)}
                                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                                                            >
                                                                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </EventHeader>
    );
}
