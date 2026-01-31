"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TemplateBuilderSidebar from "./TemplateBuilderSidebar";
import Renderer from "./Renderer";
import {
    Search, LayoutTemplate, Type, Image as ImageIcon, MousePointer2,
    Menu, CreditCard, ChevronRight, ChevronDown, Box, Layout, Plus,
    Table, X, Move, Maximize2,
    Settings, Eye, Save, Download, HelpCircle, Palette, MousePointer, PaintBucket,
    Pencil
} from 'lucide-react';
import { useTemplates } from "@/context/TemplatesContext";
import { toast } from 'react-toastify';

// --- Sub-Components ---

const ResizeHandle = ({ position, onMouseDown }) => {
    const positions = {
        'bottom-right': 'bottom-0 right-0 cursor-se-resize',
        'bottom-left': 'bottom-0 left-0 cursor-sw-resize',
        'top-right': 'top-0 right-0 cursor-ne-resize',
        'top-left': 'top-0 left-0 cursor-nw-resize',
    };
    return (
        <div
            className={`absolute w-3 h-3 bg-indigo-500 border border-white rounded-full z-20 shadow-sm ${positions[position]}`}
            onMouseDown={(e) => {
                e.stopPropagation();
                onMouseDown(e, position);
            }}
        />
    );
};



// --- Main App Component ---

export default function TemplateBuilder({ onBack, initialItems, initialName, initialId }) {
    const router = useRouter();
    const { isComponentLibraryOpen, setIsComponentLibraryOpen } = useTemplates();
    const [canvasItems, setCanvasItems] = useState(Array.isArray(initialItems) ? initialItems : []);
    const [templateName, setTemplateName] = useState(initialName || "Untitled Template");

    // Sync state with props when switching templates
    useEffect(() => {
        if (Array.isArray(initialItems)) {
            setCanvasItems(initialItems);
        }
        if (initialName) {
            setTemplateName(initialName);
        }
    }, [initialItems, initialName, initialId]);

    // Ensure isSidebarOpen is synced with context
    const isSidebarOpen = isComponentLibraryOpen;
    const setIsSidebarOpen = setIsComponentLibraryOpen;

    const [pageProperties, setPageProperties] = useState({
        backgroundColor: '#ffffff',
        gridVisible: true
    });

    const [selectedId, setSelectedId] = useState(null);
    const selectedItem = useMemo(() => {
        if (!Array.isArray(canvasItems)) return null;
        return canvasItems.find(i => i.id === selectedId);
    }, [canvasItems, selectedId]);

    const [viewMode, setViewMode] = useState('edit');
    const [isPageSettingsOpen, setIsPageSettingsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isPublished, setIsPublished] = useState(false);

    const canvasRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();

        let data = e.dataTransfer.getData("template-item");
        let template;

        if (data) {
            template = JSON.parse(data);
        } else {
            const oldData = e.dataTransfer.getData("application/react-dnd");
            if (oldData) {
                const parsed = JSON.parse(oldData);
                template = {
                    label: parsed.label,
                    type: parsed.type,
                    content: getDefaultContent(parsed.type, parsed.label)
                }
            } else {
                return;
            }
        }

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let rendererType = template.type;
        if (template.type === 'media') rendererType = 'image';
        if (template.type === 'forms') rendererType = 'form-group';
        if (template.type === 'interactive') rendererType = 'icon-card';
        if (template.type === 'utility') rendererType = 'list';

        const newItem = {
            id: Date.now().toString(),
            label: template.label,
            type: rendererType,
            x: Math.max(0, x - 150),
            y: Math.max(0, y - 40),
            w: (rendererType === 'hero' || rendererType === 'section') ? 800 : (rendererType === 'textarea' || rendererType === 'form-group' ? 350 : 300),
            h: (rendererType === 'hero') ? 400 : (rendererType === 'textarea' || rendererType === 'form-group' ? 200 : 100),
            zIndex: canvasItems.length + 1,
            properties: { ...template.content }
        };

        setCanvasItems([...canvasItems, newItem]);
        setSelectedId(newItem.id);
    };

    const getDefaultContent = (type, label) => {
        const defaults = { color: '#ffffff' };
        if (type === 'button') return { label: 'Click Me', color: '#46e55bff' };
        if (type === 'input') return { label: 'Label', placeholder: 'Placeholder...', color: '#ffffff' };
        if (type === 'checkbox') return { label: 'Option', color: '#ffffff' };
        if (type === 'textarea') return { label: 'Message', placeholder: 'Type here...', color: '#ffffff' };
        if (type === 'header') return { title: 'Header', subtitle: 'Subtitle', color: 'transparent' };
        if (type === 'navigation') return { title: 'Brand', links: ['Home', 'Link'], color: '#ffffff' };
        if (label === 'Hero Section' || type === 'hero') return { title: 'Hero Title', subtitle: 'Hero subtitle description.', color: '#ffffff' };
        if (type === 'media' || label === 'Media') return { src: '' };
        if (type === 'forms' || label === 'Forms') return { title: 'Newsletter', label: 'Email', color: '#ffffff' };
        if (type === 'interactive' || label === 'Interactive') return { icon: 'map', label: 'Feature', text: 'Details here' };
        if (type === 'social' || label === 'Social') return { platforms: ['twitter', 'instagram', 'facebook'] };
        if (type === 'utility' || label === 'Utility') return { items: ['Item 1', 'Item 2', 'Item 3'] };
        return defaults;
    }

    const updateItem = (id, updates) => {
        setCanvasItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    };

    const deleteItem = (id) => {
        const item = canvasItems.find(i => i.id === id);
        if (item?.isLocked) return; // Prevent deletion of locked items
        setCanvasItems(prev => prev.filter(item => item.id !== id));
        if (selectedId === id) setSelectedId(null);
    };

    const startResizing = (e, id, position) => {
        e.preventDefault();
        const item = canvasItems.find(i => i.id === id);
        const startX = e.clientX, startY = e.clientY;
        const startW = item.w, startH = item.h, startPosX = item.x, startPosY = item.y;

        const onMouseMove = (moveEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;
            let newW = startW, newH = startH, newX = startPosX, newY = startPosY;

            if (position.includes('right')) newW = Math.max(80, startW + dx);
            if (position.includes('bottom')) newH = Math.max(40, startH + dy);
            if (position.includes('left')) { newW = Math.max(80, startW - dx); newX = startPosX + (startW - newW); }
            if (position.includes('top')) { newH = Math.max(40, startH - dy); newY = startPosY + (startH - newH); }
            updateItem(id, { w: newW, h: newH, x: newX, y: newY });
        };
        const onMouseUp = () => { document.removeEventListener('mousemove', onMouseMove); document.removeEventListener('mouseup', onMouseUp); };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const startMoving = (e, id) => {
        if (e.target.closest('.resize-handle')) return;
        const item = canvasItems.find(i => i.id === id);
        const startX = e.clientX - item.x, startY = e.clientY - item.y;
        const onMouseMove = (moveEvent) => updateItem(id, { x: moveEvent.clientX - startX, y: moveEvent.clientY - startY });
        const onMouseUp = () => { document.removeEventListener('mousemove', onMouseMove); document.removeEventListener('mouseup', onMouseUp); };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const applyTheme = (themeName) => {
        const theme = {
            default: { bg: '#ffffff', primary: '#4f46e5' },
            dark: { bg: '#1a202c', primary: '#667eea' },
            light: { bg: '#f7fafc', primary: '#4299e1' },
        }[themeName];
        if (!theme) return;
        setPageProperties(prev => ({ ...prev, backgroundColor: theme.bg }));
        setCanvasItems(prevItems => prevItems.map(item => {
            const newProps = { ...item.properties };
            if (item.type === 'button') newProps.color = theme.primary;
            return { ...item, properties: newProps };
        }));
    };

    const loadTemplate = (items) => {
        if (window.confirm("Load new template? This will replace your current work.")) {
            setCanvasItems(items.map(i => ({ ...i, id: Date.now() + Math.random().toString() })));
        }
    };



    const handlePublish = () => {
        setIsSaving(true);
        try {
            const saved = localStorage.getItem('personalTemplates');
            const personalTemplates = saved ? JSON.parse(saved) : [];

            let templateToSave;
            let updatedTemplates;
            if (initialId) {
                // Update existing
                const existing = personalTemplates.find(t => t.id === initialId) || {};
                templateToSave = {
                    ...existing,
                    title: templateName,
                    items: canvasItems,
                    updatedAt: new Date().toISOString()
                };
                updatedTemplates = personalTemplates.map(t => t.id === initialId ? templateToSave : t);
            } else {
                // Create new
                templateToSave = {
                    id: Date.now().toString(),
                    title: templateName,
                    category: "Personal",
                    color: "bg-white",
                    image: canvasItems.find(i => i.type === 'image')?.properties?.src || null,
                    items: canvasItems,
                    createdAt: new Date().toISOString()
                };
                updatedTemplates = [templateToSave, ...personalTemplates];
            }

            localStorage.setItem('personalTemplates', JSON.stringify(updatedTemplates));

            // Also set as current template for event in case they want to register now
            localStorage.setItem('selectedTemplateForEvent', JSON.stringify(templateToSave));

            toast.success("Template published successfully!");

            setTimeout(() => {
                setIsSaving(false);
                setIsPublished(true);
                router.push('/create-event/forms');
            }, 1000);
        } catch (e) {
            console.error("Failed to save template", e);
            if (e.name === 'QuotaExceededError' || e.code === 22) {
                toast.error("Storage full! Please delete some old templates or images.");
            } else {
                toast.error("Failed to publish template");
            }
            setIsSaving(false);
        }
    };

    if (viewMode === 'preview') {
        return (
            <div className="fixed inset-0 bg-white z-[100] overflow-auto flex flex-col items-center">
                <button
                    onClick={() => setViewMode('edit')}
                    className="fixed top-8 right-8 p-3 bg-black text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-[110]"
                >
                    <X size={24} />
                </button>
                <div
                    className="w-full h-full relative flex justify-center overflow-auto"
                    style={{ backgroundColor: pageProperties.backgroundColor }}
                >
                    <div className="relative w-[1000px] h-full shadow-2xl bg-white shrink-0 origin-top scale-90 mt-10" style={{ backgroundColor: pageProperties.backgroundColor }}>
                        {canvasItems.map(item => (
                            <div key={item.id} style={{ position: 'absolute', left: item.x, top: item.y, width: item.w, height: item.h }}>
                                <Renderer item={item} isPreview />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-white overflow-hidden font-sans text-slate-900">
            <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-fit' : 'w-0 overflow-hidden opacity-0'}`}>
                <TemplateBuilderSidebar
                    onThemeSelect={applyTheme}
                    onLoadTemplate={loadTemplate}
                    onClose={() => setIsSidebarOpen(false)}
                />
            </div>

            <main className="flex-1 flex flex-col relative overflow-hidden">
                <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-20">
                    <div className="flex items-center gap-5">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={`p-2 rounded-lg transition-colors border border-transparent ${isSidebarOpen ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}`}
                            title="Toggle Sidebar"
                        >
                            <LayoutTemplate size={20} />
                        </button>
                        {onBack && (
                            <button onClick={onBack} className="text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
                                <span className="text-lg">←</span> <span className="text-sm font-medium">Back</span>
                            </button>
                        )}
                        <input
                            type="text"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            className="text-sm font-bold text-gray-900 bg-transparent border-none outline-none hover:bg-gray-50 px-2 py-1 rounded transition-colors focus:bg-white focus:ring-1 focus:ring-indigo-100"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsPageSettingsOpen(!isPageSettingsOpen)}
                            className={`p-2 rounded-lg transition-colors border border-transparent ${isPageSettingsOpen ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}`}
                            title="Page Settings"
                        >
                            <Settings size={20} />
                        </button>
                        <div className="h-6 w-px bg-gray-200 mx-2"></div>
                        <button onClick={() => setViewMode('preview')} className="px-4 py-1.5 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition-all">
                            <Eye size={16} /> Preview
                        </button>
                        {isPublished ? (
                            <Link
                                href="/create-event/forms"
                                className="px-6 py-1.5 flex items-center gap-2 text-sm font-bold text-white rounded-lg bg-green-600 shadow-lg shadow-green-200 transition-all hover:bg-green-700 hover:-translate-y-0.5"
                            >
                                <Plus size={16} /> CREATE FORMS
                            </Link>
                        ) : (
                            <button onClick={handlePublish} className={`px-6 py-1.5 flex items-center gap-2 text-sm font-bold text-white rounded-lg shadow-lg shadow-indigo-200 transition-all ${isSaving ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5'}`}>
                                {isSaving ? 'PUBLISHING...' : 'PUBLISH FORM'}
                            </button>
                        )}
                    </div>
                </header>

                <div
                    className="flex-1 overflow-auto relative bg-white scroll-smooth"
                    onClick={() => setSelectedId(null)}
                >
                    <div
                        ref={canvasRef}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className="w-full min-w-[1024px] min-h-[768px] relative transition-all"
                        style={{
                            backgroundColor: pageProperties.backgroundColor,
                            backgroundImage: pageProperties.gridVisible ? 'radial-gradient(#e5e7eb 1px, transparent 1px)' : 'none',
                            backgroundSize: '24px 24px'
                        }}
                    >
                        {Array.isArray(canvasItems) && canvasItems.length === 0 && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 pointer-events-none">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <Box size={40} className="opacity-20" />
                                </div>
                                <p className="text-xl font-bold text-gray-400">Drag components here</p>
                            </div>
                        )}

                        {Array.isArray(canvasItems) && canvasItems.map(item => (
                            <div
                                key={item.id}
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    setSelectedId(item.id);
                                    startMoving(e, item.id);
                                }}
                                className={`absolute cursor-move transition-shadow ${selectedId === item.id ? 'ring-[2.5px] ring-indigo-500 z-50' : 'hover:ring-1 hover:ring-indigo-300 z-10'}`}
                                style={{ left: item.x, top: item.y, width: item.w, height: item.h, zIndex: item.zIndex }}
                            >
                                {selectedId === item.id && (
                                    <>
                                        <div className="absolute -top-12 left-0 flex items-center bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-50 p-1">
                                            <div className="px-3 py-1 text-[10px] font-black text-indigo-600 uppercase tracking-widest">{item.label}</div>
                                            <div className="flex items-center gap-1 border-l border-indigo-100 pl-2">
                                                {!item.isLocked && (
                                                    <button onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }} className="p-1.5 hover:bg-red-50 text-red-500 transition-colors rounded-lg">
                                                        <X size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <ResizeHandle position="top-left" onMouseDown={(e) => startResizing(e, item.id, 'top-left')} />
                                        <ResizeHandle position="top-right" onMouseDown={(e) => startResizing(e, item.id, 'top-right')} />
                                        <ResizeHandle position="bottom-left" onMouseDown={(e) => startResizing(e, item.id, 'bottom-left')} />
                                        <ResizeHandle position="bottom-right" onMouseDown={(e) => startResizing(e, item.id, 'bottom-right')} />
                                    </>
                                )}
                                <Renderer item={item} onUpdate={(props) => updateItem(item.id, { properties: { ...item.properties, ...props } })} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <aside className={`bg-white border-l border-gray-200 flex flex-col z-30 shrink-0 shadow-xl transition-all duration-300 ease-in-out ${(selectedItem || isPageSettingsOpen) ? 'w-[320px] translate-x-0' : 'w-0 translate-x-10 overflow-hidden opacity-0'}`}>
                {selectedItem ? (
                    <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400">Properties</h3>
                            <button onClick={() => setSelectedId(null)} className="p-2 hover:bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 transition-all"><X size={16} /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Layout</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {[{ l: 'W', k: 'w' }, { l: 'H', k: 'h' }, { l: 'X', k: 'x' }, { l: 'Y', k: 'y' }].map(f => (
                                        <div key={f.k} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2">
                                            <span className="text-[10px] font-bold text-gray-400">{f.l}</span>
                                            <input type="number" value={Math.round(selectedItem[f.k] || 0)} onChange={(e) => updateItem(selectedItem.id, { [f.k]: parseInt(e.target.value) || 0 })} className="w-full bg-transparent text-xs font-bold outline-none" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Style & Content</label>
                                <div className="space-y-4">
                                    {selectedItem.properties && Object.entries(selectedItem.properties).map(([key, value]) => {
                                        if (key === 'color') return (
                                            <div key={key} className="space-y-2">
                                                <span className="text-[10px] font-bold text-gray-500 ml-1">Color</span>
                                                <div className="flex items-center gap-3 bg-white border border-gray-200 p-2 rounded-xl shadow-sm">
                                                    <input type="color" value={value || '#ffffff'} onChange={(e) => updateItem(selectedItem.id, { properties: { ...selectedItem.properties, [key]: e.target.value } })} className="w-8 h-8 rounded cursor-pointer" />
                                                    <span className="text-xs font-mono font-bold text-gray-400 uppercase">{value}</span>
                                                </div>
                                            </div>
                                        );
                                        if (Array.isArray(value)) return null;
                                        return (
                                            <div key={key} className="space-y-1">
                                                <span className="text-[10px] font-bold text-gray-500 ml-1 capitalize">{key}</span>
                                                <input type="text" value={value || ''} onChange={(e) => updateItem(selectedItem.id, { properties: { ...selectedItem.properties, [key]: e.target.value } })} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all shadow-sm" />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100">
                            <button onClick={() => deleteItem(selectedItem.id)} className="w-full py-3 bg-red-50 text-red-600 text-xs font-black rounded-xl hover:bg-red-100 transition-all uppercase tracking-widest">Delete Component</button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400">Page Settings</h3>
                            <button onClick={() => setIsPageSettingsOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
                        </div>
                        <div className="flex-1 p-6 space-y-8">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Canvas Background</label>
                                <div className="flex items-center gap-3 bg-white border border-gray-200 p-2 rounded-xl shadow-sm">
                                    <input type="color" value={pageProperties.backgroundColor} onChange={(e) => setPageProperties(prev => ({ ...prev, backgroundColor: e.target.value }))} className="w-8 h-8 rounded cursor-pointer" />
                                    <span className="text-xs font-mono font-bold text-gray-400 uppercase flex-1">{pageProperties.backgroundColor}</span>
                                </div>
                            </div>
                            <label className="flex items-center justify-between p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                <span className="text-xs font-bold text-gray-600">Show Grid</span>
                                <input type="checkbox" checked={pageProperties.gridVisible} onChange={(e) => setPageProperties(prev => ({ ...prev, gridVisible: e.target.checked }))} className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
                            </label>
                        </div>
                    </div>
                )}
            </aside>
        </div>
    );
}


