"use client";
import React, { createContext, useContext, useState } from 'react';

const TemplatesContext = createContext();

export function TemplatesProvider({ children }) {
    const [view, setView] = useState('landing'); // landing, gallery, builder
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedLayout, setSelectedLayout] = useState(null);
    const [isComponentLibraryOpen, setIsComponentLibraryOpen] = useState(false);

    const value = {
        view,
        setView,
        activeCategory,
        setActiveCategory,
        selectedLayout,
        setSelectedLayout,
        isComponentLibraryOpen,
        setIsComponentLibraryOpen
    };

    return (
        <TemplatesContext.Provider value={value}>
            {children}
        </TemplatesContext.Provider>
    );
}

export function useTemplates() {
    const context = useContext(TemplatesContext);
    if (!context) {
        throw new Error('useTemplates must be used within a TemplatesProvider');
    }
    return context;
}
