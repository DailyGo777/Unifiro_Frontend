"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Globe, Lock, ArrowRight, Share2, AlertCircle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publishEvent, collectEventData, clearWorkingData } from "@/utils/publishEvent";

export default function SettingsPage() {
    const router = useRouter();
    const [isPublishing, setIsPublishing] = useState(false);
    const [privacy, setPrivacy] = useState('public');
    
    const [formData, setFormData] = useState({
        eventName: '',
        description: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        location: '',
        organizerName: '',
        organizerEmail: '',
        organizerPhone: '',
        requireEmail: false,
        requirePhone: false,
        allowMultipleRegistrations: true
    });

    const [validationErrors, setValidationErrors] = useState([]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        const errors = [];
        
        if (!formData.eventName.trim()) errors.push('Event name is required');
        if (!formData.description.trim()) errors.push('Event description is required');
        if (!formData.startDate) errors.push('Start date is required');
        if (!formData.endDate) errors.push('End date is required');
        if (!formData.startTime) errors.push('Start time is required');
        if (!formData.endTime) errors.push('End time is required');
        if (!formData.location.trim()) errors.push('Location is required');

        if (new Date(formData.startDate) > new Date(formData.endDate)) {
            errors.push('End date must be after start date');
        }

        setValidationErrors(errors);
        return errors.length === 0;
    };

    const handlePublish = async () => {
        if (!validateForm()) {
            toast.error('Please fill in all required fields', {
                className: 'unifiro-toast',
                progressClassName: 'unifiro-toast-progress',
            });
            return;
        }

        setIsPublishing(true);

        try {
            // Collect all data from localStorage and form state
            const eventData = collectEventData({
                ...formData,
                dateTime: `${formData.startDate}T${formData.startTime}`,
                privacy: privacy
            });

            // Publish event (hybrid: localStorage + API)
            const result = await publishEvent(eventData);

            if (result.success) {
                // Show appropriate toast based on sync status
                const message = result.syncedToServer 
                    ? '✨ Event published and synced to server!'
                    : '✨ Event published locally! (Will sync when server is available)';
                
                toast.success(message, {
                    className: 'unifiro-toast',
                    progressClassName: 'unifiro-toast-progress',
                    autoClose: 3000
                });

                // Clear working data
                clearWorkingData();

                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    router.push(`/dashboard/events/${result.eventId}`);
                }, 2000);
            } else {
                toast.error(`Failed to publish: ${result.error}`, {
                    className: 'unifiro-toast',
                    progressClassName: 'unifiro-toast-progress',
                });
            }
        } catch (error) {
            console.error('Publish error:', error);
            toast.error('An error occurred while publishing', {
                className: 'unifiro-toast',
                progressClassName: 'unifiro-toast-progress',
            });
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="h-full p-8 overflow-y-auto animate-fade-in-up pb-24">
            <ToastContainer position="bottom-right" />

            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Event Settings</h1>
                    <p className="text-gray-500 mt-1">Finalize your event details before publishing.</p>
                </div>

                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-semibold text-red-900 mb-2">Required fields missing:</h3>
                                <ul className="space-y-1 text-sm text-red-800">
                                    {validationErrors.map((error, idx) => (
                                        <li key={idx}>• {error}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* General Info */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4 text-teal-600">
                            <Share2 size={20} />
                            <h2 className="font-semibold text-lg">General Info</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
                                <input 
                                    type="text" 
                                    name="eventName"
                                    value={formData.eventName}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Summer Music Festival" 
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                <textarea 
                                    rows={4} 
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe your event..." 
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4 text-purple-600">
                            <Calendar size={20} />
                            <h2 className="font-semibold text-lg">Date & Time</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                                    <input 
                                        type="date" 
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                                    <input 
                                        type="date" 
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" 
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                                    <input 
                                        type="time" 
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                                    <input 
                                        type="time" 
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4 text-red-500">
                            <MapPin size={20} />
                            <h2 className="font-semibold text-lg">Location</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="h-32 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                                Map Placeholder
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                <input 
                                    type="text" 
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="123 Event St, City" 
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Privacy */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div className="flex items-center gap-2 mb-4 text-blue-600">
                            <Lock size={20} />
                            <h2 className="font-semibold text-lg">Privacy</h2>
                        </div>
                        <div className="flex items-center justify-around py-8">
                            <div 
                                onClick={() => setPrivacy('public')}
                                className="text-center group cursor-pointer"
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                                    privacy === 'public' 
                                        ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-400' 
                                        : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                                }`}>
                                    <Globe size={28} />
                                </div>
                                <span className={`font-medium ${privacy === 'public' ? 'text-blue-600' : 'text-gray-500'}`}>Public</span>
                            </div>
                            <div 
                                onClick={() => setPrivacy('private')}
                                className="text-center group cursor-pointer"
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                                    privacy === 'private' 
                                        ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-400' 
                                        : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                                }`}>
                                    <Lock size={28} />
                                </div>
                                <span className={`font-medium ${privacy === 'private' ? 'text-blue-600' : 'text-gray-500'}`}>Private</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Action Bar */}
                <div className="flex justify-center mt-12 mb-12">
                    <button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className={`px-12 py-4 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-75 disabled:scale-100 disabled:cursor-not-allowed`}
                    >
                        {isPublishing ? (
                            <>
                                <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                                Publishing...
                            </>
                        ) : (
                            <>
                                Publish Event
                                <ArrowRight size={24} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
