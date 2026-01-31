import React from 'react';
import { useRouter } from 'next/navigation';
import { Twitter, Instagram, Facebook, Layout, Move, Image as ImageIcon } from 'lucide-react';
import InlineText from './InlineText';

const Renderer = ({ item, onUpdate, isPreview = false, isSidebarPreview = false, onRegister }) => {
    const router = useRouter();
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
                    <button
                        onClick={() => {
                            if (readOnly && ['REGISTER NOW', 'APPLY NOW'].includes(properties?.label?.toUpperCase())) {
                                if (onRegister) {
                                    onRegister();
                                } else {
                                    router.push('/create-event/forms');
                                }
                            }
                        }}
                        style={{ backgroundColor: properties?.color || '#19d7c4ff' }}
                        className="w-full h-full text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center"
                    >
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
                        {properties?.icon === 'calendar' ? <Layout size={14} /> : <Move size={14} />}
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
                        {properties?.items?.map((itemText, i) => (
                            <li key={i} className="text-xs text-gray-600 leading-relaxed">
                                <InlineText value={itemText} onChange={v => { const newItems = [...(properties.items || [])]; newItems[i] = v; onUpdate({ items: newItems }); }} readOnly={readOnly} />
                            </li>
                        ))}
                    </ul>
                </div>
            );
        default:
            return null;
    }
};

export default Renderer;
