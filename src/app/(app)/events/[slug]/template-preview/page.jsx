"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TemplatePreview from '@/components/templates/TemplatePreview';

const EVENTS = {
    "emerge-shark-tank": {
        title: "EMERGE 2026",
        description: "Step into a space where ideas meet execution...",
        // ... (Adding minimal needed data for fallback if strictly needed, though we primarily check local storage for templates)
    },
};

export default function TemplatePreviewPage() {
    const params = useParams();
    const router = useRouter();
    const { slug } = params;
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        // 1. Check Local Storage for Custom Events first
        const published = JSON.parse(localStorage.getItem('publishedEvents') || '[]');
        const decodedSlug = decodeURIComponent(slug);
        const localEvent = published.find(e => e.id === decodedSlug || e.slug === decodedSlug);

        if (localEvent) {
            setEvent(localEvent);
            setLoading(false);
            return;
        }

        // 2. Fallback check (though static events might not have templates, standard flow handles them elsewhere)
        if (EVENTS[slug]) {
            // Static events don't have custom templates usually, so we might redirect directly to register 
            // or show a "No template" message. For now, let's redirect to register to be safe if no template found.
            router.replace(`/events/${slug}/register`);
            return;
        }

        setLoading(false);
    }, [slug, router]);

    const handleRegister = () => {
        router.push(`/events/${slug}/register`);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading preview...</div>;

    if (!event) {
        return <div className="p-10 text-center">Event not found</div>;
    }

    // Safe rendering with try-catch
    try {
        if (!event.templateUsed || !event.templateUsed.items) {
            throw new Error("Custom template data is missing or incomplete.");
        }

        const { items, properties } = event.templateUsed;

        return (
            <TemplatePreview
                items={items}
                properties={properties}
                onRegister={handleRegister}
                onBack={() => router.push(`/events/${slug}`)}
            />
        );
    } catch (err) {
        console.error("Template rendering error:", err);
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-gray-50">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800">Unable to Load Custom Template</h2>
                    <p className="text-gray-500 max-w-md">
                        We found the event "{event.eventName || event.title}", but the custom design seems to be missing.
                    </p>
                </div>

                <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 font-mono">
                    Error: {err.message}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => router.push(`/events/${slug}`)}
                        className="px-6 py-2 border border-gray-300 rounded-xl font-medium hover:bg-white transition-colors"
                    >
                        Back to Event
                    </button>
                    <button
                        onClick={handleRegister}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                    >
                        Use Standard Form
                    </button>
                </div>
            </div>
        );
    }
}
