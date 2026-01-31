"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import FormPreview from '@/components/forms/FormPreview';
import { toast } from 'react-toastify';

export default function RegisterPage() {
    const params = useParams();
    const router = useRouter();
    const { slug } = params;
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        // 1. Try Local Storage (Published Events)
        const published = JSON.parse(localStorage.getItem('publishedEvents') || '[]');
        // Match by ID (slug might be ID for local events) or slug
        // decodeURIComponent is important if slug has special chars
        const decodedSlug = decodeURIComponent(slug);
        const localEvent = published.find(e => e.id === decodedSlug || e.slug === decodedSlug);

        if (localEvent) {
            setEvent(localEvent);
            setLoading(false);
            return;
        }

        // 2. Fallback to formatted static events
        // If not found locally, provide a default registration form
        // This ensures standard events like 'emerge-shark-tank' also have a working form
        setEvent({
            formBlocks: [
                { id: 'b1', type: 'heading_1', content: 'Event Registration' },
                { id: 'b2', type: 'text', content: 'Please fill out your details to register.' },
                { id: 'b3', type: 'short_answer', content: 'Full Name', required: true, placeholder: 'Jane Doe' },
                { id: 'b4', type: 'email', content: 'Email Address', required: true, placeholder: 'jane@example.com' },
                { id: 'b5', type: 'phone', content: 'Phone Number', required: true, placeholder: '(555) 000-0000' }
            ],
            formSettings: { themeColor: 'teal', themeFont: 'font-sans' }
        });
        setLoading(false);
        return;
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading form...</div>;

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                <h1 className="text-xl font-bold text-gray-800">Event Form Not Found</h1>
                <p className="text-gray-500">The event you are looking for does not exist or has been removed.</p>
                <button onClick={() => router.push('/events')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Browse Events</button>
            </div>
        );
    }

    const handleSubmit = (formData) => {

        // Update local storage with new participant
        const published = JSON.parse(localStorage.getItem('publishedEvents') || '[]');
        const updatedEvents = published.map(e => {
            if (e.id === event.id || e.slug === event.slug) {
                const participants = e.participants || [];
                const newParticipant = {
                    id: Date.now(),
                    date: new Date().toISOString(),
                    // Add dummy data or actual formData if available
                    name: "New Participant",
                    email: "participant@example.com",
                    ...formData
                };
                return { ...e, participants: [...participants, newParticipant] };
            }
            return e;
        });
        try {
            localStorage.setItem('publishedEvents', JSON.stringify(updatedEvents));
            toast.success("Registration submitted successfully!");
            setTimeout(() => {
                router.push(`/events`);
            }, 1500);
        } catch (e) {
            console.error("Failed to save registration", e);
            if (e.name === 'QuotaExceededError' || e.code === 22) {
                toast.error("Storage limit reached! Cannot save registration.");
                alert("Storage limit reached! Please clear local storage or delete some events/templates.");
            } else {
                toast.error("Failed to save registration. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <FormPreview
                blocks={event.formBlocks || []}
                coverImage={event.resources?.coverImage}
                logo={event.resources?.logo}
                themeColor={event.formSettings?.themeColor || 'teal'}
                themeFont={event.formSettings?.themeFont || 'font-sans'}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
