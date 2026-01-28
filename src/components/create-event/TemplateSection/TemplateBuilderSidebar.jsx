"use client";

import React, { useState } from "react";
import {
    Search,
    LayoutTemplate,
    Type,
    Image as ImageIcon,
    MousePointer2,
    Menu,
    CreditCard,
    ChevronRight,
    ChevronDown,
    Box,
    Layout,
    Music,
    Video,
    Twitter,
    Instagram,
    Facebook,
    Linkedin,
    MapPin,
    FormInput,
    Send,
    Table,
    Palette,
    Shapes,
    Smile,
    Star,
    Heart,
    Cloud,
    Sun,
    Moon,
    Zap,
    Bell,
    Home,
    User,
    Settings,
    Info
} from "lucide-react";

// --- Template Data Presets ---
const kanLayout = [
    // Top Logos (Placeholder)
    { id: 'logo-1', type: 'image', label: 'Logos', x: 50, y: 20, w: 350, h: 60, zIndex: 10, properties: { src: 'https://placehold.co/400x80/white/png?text=Logos+Here' } },

    // Hero Section (Split Layout)
    // Dark Overlay implementation via 'hero' type with specific color
    {
        id: 'hero-txt', type: 'hero', label: 'Hero Text', x: 0, y: 0, w: 500, h: 550, zIndex: 1, properties: {
            title: 'KARNATAKA ACCELERATION NETWORK (KAN)',
            subtitle: 'COHORT 2 | MANGALURU CLUSTER',
            color: '#000000' // Dark background 
        }
    },
    { id: 'hero-img', type: 'image', label: 'Hero Image', x: 500, y: 0, w: 500, h: 550, zIndex: 1, properties: { src: 'https://placehold.co/600x800/orange/white?text=Tower+Image' } },

    // Floating Info Cards
    { id: 'card-1', type: 'icon-card', label: 'Date', x: 50, y: 480, w: 220, h: 120, zIndex: 20, properties: { icon: 'calendar', label: 'Date', text: 'JANUARY 16, 2026' } },
    { id: 'card-2', type: 'icon-card', label: 'Time', x: 290, y: 480, w: 220, h: 120, zIndex: 20, properties: { icon: 'clock', label: 'Time', text: '9AM - 4PM' } },
    { id: 'card-3', type: 'icon-card', label: 'Location', x: 530, y: 480, w: 300, h: 120, zIndex: 20, properties: { icon: 'map', label: 'Location', text: 'University Auditorium, Mangalore' } },

    // About Section
    {
        id: 'about-1', type: 'section', label: 'About', x: 50, y: 650, w: 900, h: 200, zIndex: 2, properties: {
            title: 'ABOUT THE PROGRAM',
            subtitle: 'To create a national platform where all the fisheries stakeholders come together...',
            color: '#ffffff'
        }
    },

    // Feature Section (Image Left, Text Right)
    { id: 'feat-img', type: 'image', label: 'Feature Image', x: 50, y: 880, w: 400, h: 300, zIndex: 3, properties: { src: 'https://placehold.co/400x300/e2e8f0/64748b?text=Illustration' } },
    {
        id: 'feat-txt', type: 'section', label: 'About Logic', x: 480, y: 880, w: 470, h: 300, zIndex: 3, properties: {
            title: 'Mission',
            subtitle: 'Identify ground-level challenges in aquaculture and fisheries.',
            color: '#ffffff'
        }
    },

    // Implementation List
    {
        id: 'imp-list', type: 'list', label: 'Implementation', x: 50, y: 1200, w: 900, h: 300, zIndex: 4, properties: {
            items: [
                'Industry + Farmers + Hatcheries submit real problems via JSVB portal',
                'Officials & scientists access the data to analyze problems',
                'Potential startups & researchers work on these real-world challenges',
                'Creates a strong Lab-to-Land connection',
                'Supports funding, innovation, and collaboration'
            ]
        }
    },

    // Footer
    {
        id: 'footer', type: 'hero', label: 'Contact', x: 0, y: 1550, w: 1000, h: 200, zIndex: 5, properties: {
            title: 'Contact Us',
            subtitle: 'Dr. Ashwath Nayak | 7760570519 | ashwath.nayak@nitte.edu.in',
            color: '#f97316' // Orange
        }
    }
];

/**
 * Sidebar Component for the Template Builder
 * mimics the "Framer" sidebar style in light mode.
 */
const TemplateBuilderSidebar = ({ onThemeSelect, onLoadTemplate }) => {
    const [expandedCategories, setExpandedCategories] = useState({
        Start: true,
        Basics: true,
        Elements: true,
        FormElements: true,
    });

    // State to track which "Tab" (Secondary Drawer) is active
    // Default to 'Menus' as per original design, or 'Templates' for start
    const [activeTab, setActiveTab] = useState('Templates'); // Default to Templates for easy access
    const [searchQuery, setSearchQuery] = useState('');

    const toggleCategory = (category) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const handleTabClick = (tabName) => {
        if (activeTab === tabName) {
            setActiveTab(null);
        } else {
            setActiveTab(tabName);
        }
        setSearchQuery(''); // Clear search when switching tabs manually
    };

    const handleDragStart = (e, type, label) => {
        e.dataTransfer.setData("application/react-dnd", JSON.stringify({ type, label }));
        e.dataTransfer.effectAllowed = "copy";
    };

    return (
        <div className="flex h-screen w-fit bg-white border-r">
            {/* PRIMARY SIDEBAR (Left Strip) */}
            <aside className="w-[280px] h-screen bg-white border-r border-gray-200 flex flex-col text-gray-800 font-sans select-none overflow-y-auto">
                {/* Header / Search */}
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                            <LayoutTemplate size={16} className="text-gray-600" />
                        </div>
                        <div className="text-sm font-semibold">Insert</div>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-500 transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder="Search components..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-blue-500 rounded-md py-1.5 pl-9 pr-3 text-sm outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-6">

                    {/* Start Section */}
                    <div className="px-2">
                        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Start</div>
                        <SidebarItem
                            icon={Box}
                            label="Templates" // Renamed from Wireframer for clarity
                            isActive={activeTab === 'Templates'}
                            onClick={() => handleTabClick('Templates')}
                        />
                        <SidebarItem
                            icon={Palette}
                            label="Design"
                            isActive={activeTab === 'Design'}
                            onClick={() => handleTabClick('Design')}
                        />
                    </div>

                    {/* Basics Section */}
                    <div>
                        <CategoryHeader
                            label="Basics"
                            isOpen={expandedCategories.Basics}
                            onClick={() => toggleCategory('Basics')}
                        />
                        {expandedCategories.Basics && (
                            <div className="mt-1 space-y-0.5">
                                <SidebarItem
                                    icon={Shapes}
                                    label="Icons"
                                    isActive={activeTab === 'Icons'}
                                    onClick={() => handleTabClick('Icons')}
                                />
                                <SidebarItem
                                    icon={Layout}
                                    label="Sections"
                                    isActive={activeTab === 'Sections'}
                                    onClick={() => handleTabClick('Sections')}
                                />
                                <SidebarItem
                                    icon={Menu}
                                    label="Menus"
                                    isActive={activeTab === 'Menus'}
                                    onClick={() => handleTabClick('Menus')}
                                />
                            </div>
                        )}
                    </div>

                    {/* Form Elements Section */}
                    <div>
                        <CategoryHeader
                            label="Form Elements"
                            isOpen={expandedCategories.FormElements}
                            onClick={() => toggleCategory('FormElements')}
                        />
                        {expandedCategories.FormElements && (
                            <div className="mt-1 space-y-0.5">
                                <SidebarItem icon={FormInput} label="Input Field" onDragStart={(e) => handleDragStart(e, 'input', 'Input Field')} />
                                <SidebarItem icon={Type} label="Text Area" onDragStart={(e) => handleDragStart(e, 'textarea', 'Text Area')} />
                                <SidebarItem icon={CreditCard} label="Checkbox" onDragStart={(e) => handleDragStart(e, 'checkbox', 'Checkbox')} />
                                <SidebarItem icon={MousePointer2} label="Button" onDragStart={(e) => handleDragStart(e, 'button', 'Button')} />
                                <SidebarItem icon={Type} label="Form Header" onDragStart={(e) => handleDragStart(e, 'header', 'Form Header')} />
                            </div>
                        )}
                    </div>

                    {/* Elements Section */}
                    <div>
                        <CategoryHeader
                            label="Elements"
                            isOpen={expandedCategories.Elements}
                            onClick={() => toggleCategory('Elements')}
                        />
                        {expandedCategories.Elements && (
                            <div className="mt-1 space-y-0.5">
                                <SidebarItem icon={ImageIcon} label="Media" onDragStart={(e) => handleDragStart(e, 'media', 'Media')} />
                                <SidebarItem icon={FormInput} label="Forms" onDragStart={(e) => handleDragStart(e, 'forms', 'Forms')} />
                                <SidebarItem icon={MapPin} label="Interactive" onDragStart={(e) => handleDragStart(e, 'interactive', 'Interactive')} />
                                <SidebarItem icon={Twitter} label="Social" onDragStart={(e) => handleDragStart(e, 'social', 'Social')} />
                                <SidebarItem icon={Table} label="Utility" onDragStart={(e) => handleDragStart(e, 'utility', 'Utility')} />
                            </div>
                        )}
                    </div>

                </div>
            </aside>

            {/* SECONDARY DRAWER (Dynamic Suggestions) */}
            {activeTab && (
                <div className="w-[320px] bg-white text-gray-900 flex flex-col h-full border-l border-gray-200 animate-in slide-in-from-left-2 duration-200">
                    {/* Drawer Header */}
                    <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                        <span className="font-semibold text-sm truncate max-w-[200px]">{searchQuery ? `Search: "${searchQuery}"` : activeTab}</span>
                        {/* Light/Dark buttons removed as per request */}
                    </div>

                    {/* Drawer Content - Dynamic Grid */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {/* SEARCH RESULTS VIEW */}
                        {searchQuery ? (
                            <div className="space-y-4">
                                {/* Mock Search Logic */}
                                {['Button', 'Input Field', 'Menu Simple', 'Hero Section', 'Star Icon']
                                    .filter(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(item => (
                                        <DraggableCard key={item} label={item} />
                                    ))}
                                {['Button', 'Input Field', 'Menu Simple', 'Hero Section', 'Star Icon']
                                    .filter(i => i.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                        <div className="text-center text-gray-400 text-sm mt-10">No results found</div>
                                    )}
                            </div>
                        ) : (
                            // NORMAL TAB VIEW
                            <>
                                {activeTab === 'Menus' && (
                                    <>
                                        <DraggableCard label="Menu Simple" />
                                        <DraggableCard label="Menu Icons" />
                                        <DraggableCard label="Menu Rows" />
                                        <DraggableCard label="Menu Subline" />
                                        <DraggableCard label="Menu Mixed" />
                                        <DraggableCard label="Menu Split" />
                                    </>
                                )}

                                {activeTab === 'Templates' && (
                                    <>
                                        <div
                                            onClick={() => onLoadTemplate && onLoadTemplate(kanLayout)}
                                            className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-all bg-gray-50 hover:shadow-md"
                                        >
                                            <div className="h-32 bg-white border border-gray-200 mb-2 rounded flex flex-col items-center justify-center gap-2 text-gray-400 overflow-hidden relative">
                                                {/* Mini Preview of KAN Layout */}
                                                <div className="absolute inset-0 bg-gray-100 flex">
                                                    <div className="w-1/2 h-full bg-gray-800"></div>
                                                    <div className="w-1/2 h-full bg-orange-100"></div>
                                                </div>
                                                <div className="z-10 bg-white/80 px-2 py-1 rounded text-[10px] font-bold">KAN Event</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">Cohort Event Page</span>
                                                <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">NEW</span>
                                            </div>
                                        </div>

                                        <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors bg-gray-50 opacity-50">
                                            <div className="h-24 bg-white border border-gray-200 mb-2 rounded flex items-center justify-center text-gray-300 text-xs">Coming Soon</div>
                                            <span className="text-sm font-medium">Webinar Sign-up</span>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'Icons' && (
                                    <div className="grid grid-cols-4 gap-2">
                                        {[Smile, Star, Heart, Cloud, Sun, Moon, Zap, Bell, Home, User, Settings, Info].map((Icon, i) => (
                                            <div key={i} draggable
                                                onDragStart={(e) => handleDragStart(e, 'icon', `Icon-${i}`)}
                                                className="aspect-square flex items-center justify-center bg-gray-50 hover:bg-white border border-transparent hover:border-blue-500 hover:shadow-sm rounded-md cursor-grab transition-all text-gray-600 hover:text-blue-600">
                                                <Icon size={20} />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'Design' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Color Palettes</label>
                                            <div className="space-y-2">
                                                <div onClick={() => onThemeSelect && onThemeSelect('Ocean Blue')} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors active:bg-blue-50">
                                                    <div className="flex gap-1"><div className="w-4 h-4 rounded-full bg-blue-500"></div><div className="w-4 h-4 rounded-full bg-blue-300"></div><div className="w-4 h-4 rounded-full bg-blue-100"></div></div>
                                                    <span className="text-sm">Ocean Blue</span>
                                                </div>
                                                <div onClick={() => onThemeSelect && onThemeSelect('Warm Sunset')} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors active:bg-orange-50">
                                                    <div className="flex gap-1"><div className="w-4 h-4 rounded-full bg-orange-500"></div><div className="w-4 h-4 rounded-full bg-yellow-400"></div><div className="w-4 h-4 rounded-full bg-red-400"></div></div>
                                                    <span className="text-sm">Warm Sunset</span>
                                                </div>
                                                <div onClick={() => onThemeSelect && onThemeSelect('Modern Minimal')} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100">
                                                    <div className="flex gap-1"><div className="w-4 h-4 rounded-full bg-gray-800"></div><div className="w-4 h-4 rounded-full bg-gray-600"></div><div className="w-4 h-4 rounded-full bg-gray-300"></div></div>
                                                    <span className="text-sm">Modern Minimal</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Typography</label>
                                            <div className="p-3 border border-gray-200 rounded font-sans text-sm mb-2 hover:border-blue-400 cursor-pointer">Inter / Sans Serif</div>
                                            <div className="p-3 border border-gray-200 rounded font-serif text-sm mb-2 hover:border-blue-400 cursor-pointer">Merriweather / Serif</div>
                                            <div className="p-3 border border-gray-200 rounded font-mono text-sm hover:border-blue-400 cursor-pointer">Roboto Mono</div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Sections' && (
                                    <>
                                        <DraggableCard label="Hero Section" />
                                        <DraggableCard label="Feature Grid" />
                                        <DraggableCard label="Testimonials" />
                                        <DraggableCard label="Footer" />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default TemplateBuilderSidebar; // Default export wrapped component

/* Sub-components */

const CategoryHeader = ({ label, isOpen, onClick }) => (
    <div
        onClick={onClick}
        className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-gray-100 rounded-md group text-gray-600 transition-colors"
    >
        <span className="text-sm font-medium">{label}</span>
        {isOpen ? <ChevronDown size={14} className="opacity-0 group-hover:opacity-100 text-gray-400" /> : <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-gray-400" />}
    </div>
);

const SidebarItem = ({ icon: Icon, label, hasSubmenu, isActive, onClick, onDragStart }) => (
    <div
        draggable={!!onDragStart}
        onDragStart={onDragStart}
        onClick={onClick}
        className={`
      flex items-center justify-between px-2 py-2 rounded-md cursor-pointer transition-all
      ${isActive ? "bg-gray-100 text-blue-600 font-medium" : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"}
    `}
    >
        <div className="flex items-center gap-3">
            {Icon && <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />}
            <span className="text-sm">{label}</span>
        </div>
        {hasSubmenu && !isActive && <ChevronRight size={14} className="text-gray-400" />}
    </div>
);

const DraggableCard = ({ label }) => {
    return (
        <div
            draggable
            className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-blue-500 rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all flex flex-col items-center gap-3 shadow-sm hover:shadow-md"
            onDragStart={(e) => {
                e.dataTransfer.setData("application/react-dnd", JSON.stringify({ type: 'component', label }));
                e.dataTransfer.effectAllowed = "copy";
            }}
        >
            <div className="w-full h-12 bg-white border border-gray-200 rounded-md flex flex-col justify-center gap-1 px-3 group-hover:border-blue-100 transition-colors">
                <div className="h-1.5 w-1/3 bg-gray-200 rounded-full group-hover:bg-blue-100"></div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full group-hover:bg-blue-50"></div>
            </div>
            <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600">{label}</span>
        </div>
    )
}
