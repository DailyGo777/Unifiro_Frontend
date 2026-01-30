import React from 'react';
import {
    Calendar, MousePointer2, Mail, Phone, Link as LinkIcon, Hash, Star,
    BarChart, Layers, Table, Sliders, Fingerprint, Upload, Image as ImageIcon,
    Video, Music, MapPin, Globe, CreditCard, User, HelpCircle, ChevronDown,
    GripVertical, Calculator, ArrowRight
} from 'lucide-react';

const FormPreview = ({
    blocks = [],
    themeColor = 'teal',
    themeFont = 'font-sans',
    coverImage,
    logo,
    onSubmit
}) => {
    // State to collect form data
    const [formData, setFormData] = React.useState({});

    const handleInputChange = (id, value) => {
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = () => {
        // Basic validation can be added here
        onSubmit(formData);
    };

    return (
        <div className={`max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl min-h-[600px] border border-gray-100 animate-in fade-in duration-500 overflow-hidden ${themeFont} relative`}>
            {/* Header Section */}
            <div className="h-64 w-full relative group">
                {coverImage ? (
                    <>
                        <img src={coverImage} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </>
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    </div>
                )}

                {logo && (
                    <div className="absolute -bottom-12 left-10 w-28 h-28 bg-white rounded-3xl shadow-2xl p-2 border border-gray-100 transform rotate-3 transition-transform hover:rotate-0 duration-300">
                        <img src={logo} alt="Logo" className="w-full h-full object-contain rounded-2xl" />
                    </div>
                )}
            </div>

            <div className="px-12 pt-20 pb-12">
                {blocks.map((block) => {
                    const isBasicText = ['text', 'heading_1', 'heading_2', 'heading_3', 'quote', 'callout'].includes(block.type);
                    return (
                        <div key={block.id} className="mb-8 group">
                            {isBasicText || block.isTitle ? (
                                <div className={`
                                    transition-all duration-300
                                    ${block.type === 'heading_1' || block.isTitle ? 'text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight' : ''}
                                    ${block.type === 'heading_2' ? 'text-3xl font-bold text-gray-800 mb-4 leading-snug' : ''}
                                    ${block.type === 'heading_3' ? 'text-xl font-bold text-gray-800 mb-3' : ''}
                                    ${block.type === 'quote' ? 'text-xl italic border-l-4 border-indigo-500 pl-6 py-4 text-gray-700 my-8 bg-gray-50 rounded-r-xl' : ''}
                                    ${block.type === 'callout' ? 'bg-indigo-50 border border-indigo-100 p-6 rounded-2xl text-indigo-900 my-6 font-medium flex items-start gap-4 shadow-sm' : ''}
                                    ${block.type === 'text' && !block.isTitle ? 'text-lg text-gray-600 leading-relaxed' : ''}
                                `}>
                                    {block.content}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {block.type !== 'divider' && block.type !== 'spacer' && (
                                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">
                                            {block.content} {block.required && <span className="text-pink-500">*</span>}
                                        </label>
                                    )}

                                    {/* Render Inputs */}
                                    {(() => {
                                        const inputBaseClass = `w-full bg-gray-50 border-0 ring-1 ring-gray-200 rounded-2xl p-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-${themeColor}-500 focus:bg-white outline-none transition-all shadow-sm hover:ring-gray-300`;

                                        switch (block.type) {
                                            case 'short_answer': return <input type="text" onChange={(e) => handleInputChange(block.id, e.target.value)} placeholder={block.placeholder} className={inputBaseClass} />;
                                            case 'long_answer': return <textarea onChange={(e) => handleInputChange(block.id, e.target.value)} placeholder={block.placeholder} className={inputBaseClass} rows={4} />;
                                            case 'multiple_choice': return <div className="space-y-3">{block.options.map((opt, i) => <label key={i} className={`flex items-center gap-4 p-4 border border-gray-200 rounded-2xl cursor-pointer transition-all hover:bg-gray-50 hover:border-${themeColor}-200 group/opt ${formData[block.id] === opt ? `bg-${themeColor}-50 border-${themeColor}-500 ring-1 ring-${themeColor}-500` : ''}`}><input type="radio" name={block.id} onChange={() => handleInputChange(block.id, opt)} className={`w-5 h-5 text-${themeColor}-600 focus:ring-${themeColor}-500 border-gray-300`} checked={formData[block.id] === opt} /><span className={`font-medium ${formData[block.id] === opt ? `text-${themeColor}-900` : 'text-gray-600'}`}>{opt}</span></label>)}</div>;
                                            case 'checkboxes': return <div className="space-y-3">{block.options.map((opt, i) => { const isChecked = (formData[block.id] || []).includes(opt); return <label key={i} className={`flex items-center gap-4 p-4 border border-gray-200 rounded-2xl cursor-pointer transition-all hover:bg-gray-50 hover:border-${themeColor}-200 ${isChecked ? `bg-${themeColor}-50 border-${themeColor}-500 ring-1 ring-${themeColor}-500` : ''}`}><input type="checkbox" onChange={(e) => { const current = formData[block.id] || []; if (e.target.checked) handleInputChange(block.id, [...current, opt]); else handleInputChange(block.id, current.filter(x => x !== opt)); }} className={`w-5 h-5 rounded text-${themeColor}-600 focus:ring-${themeColor}-500 border-gray-300`} checked={isChecked} /><span className={`font-medium ${isChecked ? `text-${themeColor}-900` : 'text-gray-600'}`}>{opt}</span></label> })}</div>;
                                            case 'dropdown': return <div className="relative"><select onChange={(e) => handleInputChange(block.id, e.target.value)} className={`${inputBaseClass} appearance-none`}><option>Select an option...</option>{block.options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}</select><ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} /></div>;
                                            case 'email': return <input type="email" onChange={(e) => handleInputChange(block.id, e.target.value)} placeholder={block.placeholder} className={inputBaseClass} />;
                                            case 'phone': return <input type="tel" onChange={(e) => handleInputChange(block.id, e.target.value)} placeholder="(555) 000-0000" className={inputBaseClass} />;
                                            case 'url': return <input type="url" onChange={(e) => handleInputChange(block.id, e.target.value)} placeholder="https://" className={inputBaseClass} />;
                                            case 'number': return <input type="number" onChange={(e) => handleInputChange(block.id, e.target.value)} placeholder={block.placeholder} className={inputBaseClass} />;
                                            case 'date': return <input type="date" onChange={(e) => handleInputChange(block.id, e.target.value)} className={inputBaseClass} />;
                                            case 'time': return <input type="time" onChange={(e) => handleInputChange(block.id, e.target.value)} className={inputBaseClass} />;

                                            // Richer Inputs
                                            case 'rating': return <div className="flex gap-3 p-2">{[1, 2, 3, 4, 5].map(star => <Star key={star} size={36} onClick={() => handleInputChange(block.id, star)} fill={formData[block.id] >= star ? "gold" : "currentColor"} className={`cursor-pointer transition-all hover:scale-110 ${formData[block.id] >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`} />)}</div>;

                                            case 'opinion_scale': return <div className="flex flex-col gap-6"><div className="flex justify-between bg-gray-50 p-2 rounded-2xl">{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <button key={n} onClick={() => handleInputChange(block.id, n)} className={`w-10 h-14 rounded-xl text-sm font-bold transition-all ${formData[block.id] === n ? `bg-${themeColor}-500 text-white shadow-lg scale-110` : 'text-gray-400 hover:bg-white hover:shadow-md hover:text-gray-600'}`}>{n}</button>)}</div><div className="flex justify-between px-2 text-[10px] font-black uppercase tracking-widest text-gray-400"><span>Not likely at all</span><span>Extremely likely</span></div></div>;

                                            case 'file': return <div className={`border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center text-gray-500 hover:bg-${themeColor}-50/50 hover:border-${themeColor}-300 cursor-pointer transition-all group`}><div className={`w-16 h-16 rounded-full bg-${themeColor}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}><Upload size={28} className={`text-${themeColor}-500`} /></div><span className={`text-lg font-bold text-gray-700 group-hover:text-${themeColor}-700`}>Upload documents</span><span className="text-sm text-gray-400 mt-2 font-medium">Drag & drop or click to browse</span></div>;

                                            // Default/Fallbacks
                                            default: return <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-500 text-sm italic">Preview for {block.type}</div>;
                                        }
                                    })()}
                                </div>
                            )}
                        </div>
                    )
                })}

                <div className="pt-8">
                    <button
                        onClick={handleSubmit}
                        className={`w-full group relative overflow-hidden bg-gradient-to-r from-${themeColor}-600 to-indigo-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-${themeColor}-500/20 hover:shadow-2xl hover:shadow-${themeColor}-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3 text-lg tracking-wide uppercase">
                            Submit Registration
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-6 font-medium">
                        Securely processed by Unifiro. By submitting, you agree to our terms.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FormPreview;
