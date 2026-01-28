"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import TemplateBuilderSidebar from "@/components/create-event/TemplateSection/TemplateBuilderSidebar";
import {
    Search, LayoutTemplate, Type, Image as ImageIcon, MousePointer2,
    Menu, CreditCard, ChevronRight, ChevronDown, Box, Layout,
    Twitter, Instagram, Facebook, Table, X, Move, Maximize2,
    Settings, Eye, Save, Download, HelpCircle, Palette, MousePointer, PaintBucket
} from 'lucide-react';

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

// --- Inline Text Editor ---
const InlineText = ({ value, onChange, className, style, tagName = 'span', readOnly, placeholder }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);

    useEffect(() => { setText(value); }, [value]);

    if (readOnly) {
        return React.createElement(tagName, { className, style }, value || placeholder);
    }

    if (isEditing) {
        return (
            <input
                autoFocus
                className="bg-white/50 outline-blue-500 outline outline-2 rounded min-w-[20px] px-1"
                style={{ ...style, width: 'auto', minWidth: '100%', height: 'auto', display: 'inline-block', color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', textAlign: 'inherit' }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={() => { setIsEditing(false); onChange(text); }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') { setIsEditing(false); onChange(text); }
                }}
                onClick={(e) => e.stopPropagation()}
            />
        );
    }

    return React.createElement(tagName, {
        className: `${className} hover:outline hover:outline-1 hover:outline-blue-200 cursor-text transition-all rounded px-1 -mx-1`,
        style: style,
        onDoubleClick: (e) => {
            e.stopPropagation();
            setIsEditing(true);
        }
    }, text || placeholder || 'Double click to edit');
};

// --- Main App Component ---

export default function TemplateBuilder({ onBack }) {
    const [canvasItems, setCanvasItems] = useState([
        { id: 'init-1', label: 'Simple Navbar', type: 'navigation', x: 50, y: 40, w: 900, h: 70, zIndex: 1, properties: { title: 'EventPro', links: ['Schedule', 'Register'], color: '#ffffff' } }
    ]);
    const [pageProperties, setPageProperties] = useState({
        backgroundColor: '#ffffff',
        gridVisible: true
    });

    const [selectedId, setSelectedId] = useState(null);
    const selectedItem = useMemo(() => canvasItems.find(i => i.id === selectedId), [canvasItems, selectedId]);

    const [viewMode, setViewMode] = useState('edit');
    const [isPageSettingsOpen, setIsPageSettingsOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggle for Left Sidebar
    const [isSaving, setIsSaving] = useState(false);

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
        const x = e.clientX - rect.left; // Relative to canvas
        const y = e.clientY - rect.top;

        // Map generic sidebar types to specific renderer types
        let rendererType = template.type;
        if (template.type === 'media') rendererType = 'image';
        if (template.type === 'forms') rendererType = 'form-group';
        if (template.type === 'interactive') rendererType = 'icon-card';
        if (template.type === 'utility') rendererType = 'list'; // or 'grid'

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
        if (type === 'button') return { label: 'Click Me', color: '#4f46e5' };
        if (type === 'input') return { label: 'Label', placeholder: 'Placeholder...', color: '#ffffff' };
        if (type === 'checkbox') return { label: 'Option', color: '#ffffff' };
        if (type === 'textarea') return { label: 'Message', placeholder: 'Type here...', color: '#ffffff' };
        if (type === 'header') return { title: 'Header', subtitle: 'Subtitle', color: 'transparent' };
        if (type === 'navigation') return { title: 'Brand', links: ['Home', 'Link'], color: '#ffffff' };
        if (label === 'Hero Section' || type === 'hero') return { title: 'Hero Title', subtitle: 'Hero subtitle description.', color: '#ffffff' };

        // --- Process New Element Types ---
        if (type === 'media' || label === 'Media') return { src: '' }; // Handled by 'image' renderer if type is updated
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
        setCanvasItems(prev => prev.filter(item => item.id !== id));
        if (selectedId === id) setSelectedId(null);
    };

    // --- Interaction Logic (Resize/Move) ---
    // (Kept identical logic but ensured it references correct window handling)
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

    const themes = {
        default: { bg: '#ffffff', primary: '#4f46e5' },
        dark: { bg: '#1a202c', primary: '#667eea' },
        light: { bg: '#f7fafc', primary: '#4299e1' },
    };

    const applyTheme = (themeName) => {
        const theme = themes[themeName];
        if (!theme) return;
        setPageProperties(prev => ({ ...prev, backgroundColor: theme.bg }));
        setCanvasItems(prevItems => prevItems.map(item => {
            const newProps = { ...item.properties };
            if (['navigation', 'button', 'hero', 'section'].includes(item.type)) {
                if (item.type === 'button') newProps.color = theme.primary;
                if (item.type === 'navigation') { }
            }
            if (item.type === 'button') { newProps.color = theme.primary; }
            return { ...item, properties: newProps };
        }));
    };

    const loadTemplate = (items) => {
        // Load a fresh template, replacing current items
        if (window.confirm("Load new template? This will replace your current work.")) {
            setCanvasItems(items.map(i => ({ ...i, id: Date.now() + Math.random().toString() })));
            setPageProperties({ backgroundColor: '#ffffff', gridVisible: false });
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
                <TemplateBuilderSidebar onThemeSelect={applyTheme} onLoadTemplate={loadTemplate} />
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
                        <h1 className="text-sm font-bold text-gray-900">Event Registration v1</h1>
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
                        <button onClick={() => { setIsSaving(true); setTimeout(() => setIsSaving(false), 1000); }} className={`px-6 py-1.5 flex items-center gap-2 text-sm font-bold text-white rounded-lg shadow-lg shadow-indigo-200 transition-all ${isSaving ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5'}`}>
                            {isSaving ? 'PUBLISHED' : 'PUBLISH FORM'}
                        </button>
                    </div>
                </header>

                {/* FULL SCREEN CANVAS AREA */}
                <div
                    className="flex-1 overflow-auto relative bg-[#f8f9fa] scroll-smooth"
                    onClick={() => setSelectedId(null)}
                >
                    <div
                        ref={canvasRef}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className="w-full min-h-full relative transition-all"
                        style={{
                            backgroundColor: pageProperties.backgroundColor,
                            backgroundImage: pageProperties.gridVisible ? 'radial-gradient(#e5e7eb 1px, transparent 1px)' : 'none',
                            backgroundSize: '24px 24px'
                        }}
                    >
                        {canvasItems.length === 0 && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 pointer-events-none">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <Box size={40} className="opacity-20" />
                                </div>
                                <p className="text-xl font-bold text-gray-400">Drag components here</p>
                            </div>
                        )}

                        {canvasItems.map(item => (
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
                                            <div className="h-4 w-px bg-gray-100 mx-1"></div>
                                            <button onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }} className="p-1.5 hover:bg-red-50 text-red-500 transition-colors rounded-lg">
                                                <X size={14} />
                                            </button>
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

            {/* --- Property Sidebar (Pinned) --- */}
            <aside className={`bg-white border-l border-gray-200 flex flex-col z-30 shrink-0 shadow-xl transition-all duration-300 ease-in-out ${(selectedItem || isPageSettingsOpen) ? 'w-[320px] translate-x-0' : 'w-0 translate-x-10 overflow-hidden opacity-0'}`}>
                {selectedItem ? (
                    <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400">Properties</h3>
                            <button onClick={() => setSelectedId(null)} className="p-2 hover:bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 transition-all"><X size={16} /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* ... Component Properties (Same as before) ... */}
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Layout</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {[{ l: 'W', k: 'w' }, { l: 'H', k: 'h' }, { l: 'X', k: 'x' }, { l: 'Y', k: 'y' }].map(f => (
                                        <div key={f.k} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2">
                                            <span className="text-[10px] font-bold text-gray-400">{f.l}</span>
                                            <input type="number" value={Math.round(selectedItem[f.k])} onChange={(e) => updateItem(selectedItem.id, { [f.k]: parseInt(e.target.value) || 0 })} className="w-full bg-transparent text-xs font-bold outline-none" />
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
                                                    <input type="color" value={value} onChange={(e) => updateItem(selectedItem.id, { properties: { ...selectedItem.properties, [key]: e.target.value } })} className="w-8 h-8 rounded cursor-pointer" />
                                                    <span className="text-xs font-mono font-bold text-gray-400 uppercase">{value}</span>
                                                </div>
                                            </div>
                                        );
                                        if (Array.isArray(value)) return null;
                                        if (key === 'link' || key === 'platforms') return null;
                                        return (
                                            <div key={key} className="space-y-1">
                                                <span className="text-[10px] font-bold text-gray-500 ml-1 capitalize">{key}</span>
                                                <input type="text" value={value} onChange={(e) => updateItem(selectedItem.id, { properties: { ...selectedItem.properties, [key]: e.target.value } })} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all shadow-sm" />
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
                                    <div className="relative">
                                        <PaintBucket size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <input
                                            type="color"
                                            value={pageProperties.backgroundColor}
                                            onChange={(e) => setPageProperties(prev => ({ ...prev, backgroundColor: e.target.value }))}
                                            className="w-full h-10 pl-8 rounded cursor-pointer opacity-0 absolute inset-0 z-10"
                                        />
                                        <div className="w-8 h-8 ml-8 rounded border border-gray-100 shadow-sm" style={{ backgroundColor: pageProperties.backgroundColor }}></div>
                                    </div>
                                    <span className="text-xs font-mono font-bold text-gray-400 uppercase flex-1">{pageProperties.backgroundColor}</span>
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                    <span className="text-xs font-bold text-gray-600">Show Grid</span>
                                    <input
                                        type="checkbox"
                                        checked={pageProperties.gridVisible}
                                        onChange={(e) => setPageProperties(prev => ({ ...prev, gridVisible: e.target.checked }))}
                                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </aside>
        </div>
    );
}

// --- Renderer (Unchanged logic, just ensure export is valid) ---
const Renderer = ({ item, onUpdate, isPreview = false, isSidebarPreview = false }) => {
    // ... Copy exact renderer logic from previous implementation to ensure consistency ...
    // Using the same switch-case block we refined in Step 306
    const { type, properties, w, h } = item;
    const baseStyle = {
        backgroundColor: (type === 'button' || type === 'social' || type === 'grid') ? 'transparent' : (properties?.color || 'transparent'),
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'all 0.2s ease', overflow: 'hidden'
    };
    const scaleClass = isSidebarPreview ? "scale-[0.7] origin-center" : "";
    const readOnly = isPreview || isSidebarPreview || !onUpdate;

    switch (type) {
        case 'navigation':
            return (
                <div style={baseStyle} className={`px-8 shadow-sm border-b border-gray-100 items-center justify-between flex-row ${scaleClass}`}>
                    <div className="font-black text-lg tracking-tighter text-indigo-600">
                        <InlineText value={properties?.title || 'Brand'} onChange={v => onUpdate({ title: v })} readOnly={readOnly} />
                    </div>
                    <div className="flex gap-6">
                        {properties?.links?.map((link, i) => (
                            <InlineText key={i} value={link} tagName="span" className="text-xs font-bold text-gray-400 uppercase tracking-widest"
                                onChange={v => { const newLinks = [...(properties.links || [])]; newLinks[i] = v; onUpdate({ links: newLinks }); }}
                                readOnly={readOnly} />
                        ))}
                    </div>
                    {!isSidebarPreview && <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Sign Up</button>}
                </div>
            );
        case 'section': case 'hero':
            return (
                <div style={{ ...baseStyle, textAlign: 'center' }} className={`p-10 border border-gray-100 rounded-3xl shadow-indigo-500/5 shadow-xl ${scaleClass}`}>
                    <div className="text-4xl font-black tracking-tighter mb-4 text-gray-900 leading-tight">
                        <InlineText value={properties?.title || 'Title'} onChange={v => onUpdate({ title: v })} readOnly={readOnly} />
                    </div>
                    <div className="text-gray-400 text-sm font-medium max-w-md mx-auto leading-relaxed">
                        <InlineText value={properties?.subtitle || 'Subtitle'} onChange={v => onUpdate({ subtitle: v })} readOnly={readOnly} />
                    </div>
                </div>
            );
        case 'input':
            return (
                <div className={`p-4 w-full h-full flex flex-col justify-center ${scaleClass}`}>
                    <div className="text-[10px] font-black text-gray-400 mb-2 ml-1 uppercase tracking-widest">
                        <InlineText value={properties?.label || 'Label'} onChange={v => onUpdate({ label: v })} readOnly={readOnly} />
                    </div>
                    <div className="relative">
                        <input type="text" placeholder={properties?.placeholder} disabled={!isPreview} className="w-full py-3 px-4 border border-gray-200 rounded-2xl text-sm bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm" />
                    </div>
                </div>
            );
        case 'textarea':
            return (
                <div className={`p-4 w-full h-full flex flex-col ${scaleClass}`}>
                    <div className="text-[10px] font-black text-gray-400 mb-2 ml-1 uppercase tracking-widest">
                        <InlineText value={properties?.label || 'Label'} onChange={v => onUpdate({ label: v })} readOnly={readOnly} />
                    </div>
                    <textarea placeholder={properties?.placeholder} disabled={!isPreview} rows={Math.floor((h || 100) / 35)} className="w-full flex-1 p-4 border border-gray-200 rounded-2xl text-sm bg-white resize-none focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"></textarea>
                </div>
            );
        case 'button':
            return (
                <div className={`p-4 w-full h-full flex items-center ${scaleClass}`}>
                    <button style={{ backgroundColor: properties?.color || '#2563eb' }} className="w-full h-full text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center">
                        <InlineText value={properties?.label || 'BUTTON'} onChange={v => onUpdate({ label: v })} readOnly={readOnly} />
                    </button>
                </div>
            );
        case 'social':
            return (
                <div className={`flex items-center justify-center gap-6 w-full h-full bg-gray-50/50 rounded-3xl border border-gray-100 ${scaleClass}`}>
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-400 hover:text-blue-500 transition-colors cursor-pointer"><Twitter size={20} /></div>
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-pink-500 hover:text-pink-600 transition-colors cursor-pointer"><Instagram size={20} /></div>
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"><Facebook size={20} /></div>
                </div>
            );
        case 'grid':
            return (
                <div className={`grid grid-cols-2 gap-3 p-4 w-full h-full ${scaleClass}`}>
                    {properties?.items?.map((itemText, i) => (
                        <div key={i} className="bg-white rounded-2xl flex items-center justify-center text-[10px] font-black text-indigo-400 uppercase tracking-widest border border-indigo-100 shadow-sm">
                            <InlineText value={itemText} onChange={v => { const newItems = [...(properties.items || [])]; newItems[i] = v; onUpdate({ items: newItems }); }} readOnly={readOnly} />
                        </div>
                    ))}
                    {!properties?.items && (<div className="bg-white rounded-2xl shadow-sm border border-indigo-50"></div>)}
                </div>
            );
        case 'form-group':
            return (
                <div style={baseStyle} className={`p-6 border border-indigo-100 rounded-3xl shadow-xl shadow-indigo-500/5 ${scaleClass}`}>
                    <div className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 text-center">
                        <InlineText value={properties?.title || 'Newsletter'} onChange={v => onUpdate({ title: v })} readOnly={readOnly} />
                    </div>
                    <div className="flex gap-2">
                        <input type="email" placeholder="email@example.com" disabled className="flex-1 p-2 bg-gray-50 border border-gray-100 rounded-xl text-[10px] outline-none" />
                        <button className="bg-indigo-600 text-white px-3 py-2 rounded-xl text-[8px] font-black uppercase">Join</button>
                    </div>
                </div>
            );

        case 'image':
            return (
                <div className={`w-full h-full rounded-2xl overflow-hidden bg-gray-100 relative group ${scaleClass}`}>
                    {properties?.src ? (
                        <img src={properties.src} alt="content" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                            <ImageIcon size={32} />
                            <span className="text-[10px] font-bold uppercase mt-2">Image</span>
                        </div>
                    )}
                </div>
            );

        case 'icon-card':
            return (
                <div className={`w-full h-full bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-2 shadow-sm ${scaleClass}`}>
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        {properties?.icon === 'calendar' ? <Layout size={14} /> : <Move size={14} />} {/* Placeholder icons logic */}
                    </div>
                    <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                        <InlineText value={properties?.label || 'Label'} onChange={v => onUpdate({ label: v })} readOnly={readOnly} />
                    </div>
                    <div className="text-xs font-semibold text-gray-800">
                        <InlineText value={properties?.text || 'Value'} onChange={v => onUpdate({ text: v })} readOnly={readOnly} />
                    </div>
                </div>
            );

        case 'list':
            return (
                <div className={`w-full h-full p-4 ${scaleClass}`}>
                    <ul className="list-disc pl-4 space-y-2">
                        {properties?.items?.map((item, i) => (
                            <li key={i} className="text-xs text-gray-600 leading-relaxed">
                                <InlineText
                                    value={item}
                                    onChange={v => {
                                        const newItems = [...(properties.items || [])];
                                        newItems[i] = v;
                                        onUpdate({ items: newItems });
                                    }}
                                    readOnly={readOnly}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            );
        default:
            return (
                <div className="bg-gray-50 w-full h-full rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    <InlineText value={item.label} onChange={v => onUpdate({ label: v })} readOnly={readOnly} />
                </div>
            );
    }
};
