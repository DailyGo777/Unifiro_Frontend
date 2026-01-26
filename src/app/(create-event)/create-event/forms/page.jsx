"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
  Plus, Trash2, Layout, Share2,
  GripVertical, Type, CheckSquare, CircleDot, Calendar,
  Mail, Hash, FileText, Upload, MoreHorizontal,
  ArrowLeft, ArrowRight, Search, Check, PanelLeft, Save,
  Palette, Image as ImageIcon, Heading1, Heading2,
  List, ListOrdered, Quote, Smile, Code, Phone, Link as LinkIcon,
  MousePointer2, Star, BarChart, Layers, Table, Sliders,
  Fingerprint, Video, Music, MapPin, Minus, Columns,
  Calculator, Eye, Globe, ShieldCheck, FileCheck,
  CreditCard, User, HelpCircle, AlignLeft,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

// --- Extensive Block Library ---
const BLOCK_TYPES = [
  // --- Text & Headings ---
  { id: 'text', label: 'Text', icon: Type, group: 'Basic', description: 'Write plain text or instructions' },
  { id: 'heading_1', label: 'Heading 1', icon: Heading1, group: 'Basic', description: 'Large section heading' },
  { id: 'heading_2', label: 'Heading 2', icon: Heading2, group: 'Basic', description: 'Medium section heading' },
  { id: 'heading_3', label: 'Heading 3', icon: AlignLeft, group: 'Basic', description: 'Small section heading' },
  { id: 'bullet_list', label: 'Bullet List', icon: List, group: 'Basic', description: 'Simple bulleted list' },
  { id: 'numbered_list', label: 'Numbered List', icon: ListOrdered, group: 'Basic', description: 'Sequential numbered list' },
  { id: 'quote', label: 'Quote', icon: Quote, group: 'Basic', description: 'Capture a testimonial or quote' },
  { id: 'callout', label: 'Callout', icon: Smile, group: 'Basic', description: 'Highlight important info' },
  { id: 'code_block', label: 'Code', icon: Code, group: 'Basic', description: 'Share code snippets' },

  // --- Standard Inputs ---
  { id: 'short_answer', label: 'Short Answer', icon: Type, group: 'Input', description: 'Small text input' },
  { id: 'long_answer', label: 'Long Answer', icon: FileText, group: 'Input', description: 'Large text area' },
  { id: 'multiple_choice', label: 'Multiple Choice', icon: CircleDot, group: 'Input', description: 'Pick one option' },
  { id: 'checkboxes', label: 'Checkboxes', icon: CheckSquare, group: 'Input', description: 'Pick multiple options' },
  { id: 'dropdown', label: 'Dropdown', icon: List, group: 'Input', description: 'Select from a list' },
  { id: 'email', label: 'Email', icon: Mail, group: 'Input', description: 'Email address validation' },
  { id: 'phone', label: 'Phone Number', icon: Phone, group: 'Input', description: 'Contact number input' },
  { id: 'number', label: 'Number', icon: Hash, group: 'Input', description: 'Only numeric input' },
  { id: 'url', label: 'URL', icon: LinkIcon, group: 'Input', description: 'Website link validation' },
  { id: 'date', label: 'Date', icon: Calendar, group: 'Input', description: 'Date picker' },
  { id: 'time', icon: MousePointer2, label: 'Time', group: 'Input', description: 'Specific time selection' },

  // --- Advanced Inputs ---
  { id: 'rating', label: 'Rating', icon: Star, group: 'Advanced', description: 'Star or number rating' },
  { id: 'opinion_scale', label: 'Opinion Scale', icon: BarChart, group: 'Advanced', description: 'Scale from 0 to 10' },
  { id: 'ranking', label: 'Ranking', icon: Layers, group: 'Advanced', description: 'Order items by preference' },
  { id: 'matrix', label: 'Matrix', icon: Table, group: 'Advanced', description: 'Multiple choice grid' },
  { id: 'slider', label: 'Slider', icon: Sliders, group: 'Advanced', description: 'Range selection slider' },
  { id: 'signature', label: 'Signature', icon: Fingerprint, group: 'Advanced', description: 'Collect e-signatures' },
  { id: 'file', label: 'File Upload', icon: Upload, group: 'Advanced', description: 'Accept files from users' },

  // --- Media & Embeds ---
  { id: 'image', label: 'Image', icon: ImageIcon, group: 'Media', description: 'Upload or link an image' },
  { id: 'video', label: 'Video', icon: Video, group: 'Media', description: 'Embed YouTube/Vimeo' },
  { id: 'audio', label: 'Audio', icon: Music, group: 'Media', description: 'Embed Spotify/Soundcloud' },
  { id: 'google_maps', label: 'Google Maps', icon: MapPin, group: 'Media', description: 'Embed a location' },

  // --- Layout & Logic ---
  { id: 'divider', label: 'Divider', icon: Minus, group: 'Layout', description: 'Visual horizontal line' },
  { id: 'spacer', label: 'Spacer', icon: Layout, group: 'Layout', description: 'Empty vertical space' },
  { id: 'columns_2', label: '2 Columns', icon: Columns, group: 'Layout', description: 'Side-by-side blocks' },
  { id: 'calculator', label: 'Calculator', icon: Calculator, group: 'Logic', description: 'Perform math on inputs' },
  { id: 'hidden_field', label: 'Hidden Field', icon: Eye, group: 'Logic', description: 'Store invisible metadata' },

  // --- Specialized & Legal ---
  { id: 'address', label: 'Address', icon: MapPin, group: 'Special', description: 'Structured address input' },
  { id: 'country', label: 'Country', icon: Globe, group: 'Special', description: 'Country selector' },
  { id: 'gdpr', label: 'GDPR Consent', icon: ShieldCheck, group: 'Special', description: 'Legal compliance checkbox' },
  { id: 'terms', label: 'Terms & Conditions', icon: FileCheck, group: 'Special', description: 'Link and accept terms' },
  { id: 'payment', label: 'Stripe Payment', icon: CreditCard, group: 'Special', description: 'Collect payments' },
  { id: 'captcha', label: 'CAPTCHA', icon: User, group: 'Special', description: 'Prevent spam bots' },
  { id: 'help_text', label: 'Help Text', icon: HelpCircle, group: 'Special', description: 'Tooltips and guides' },
];

const INITIAL_BLOCKS = [
  { id: 'b1', type: 'text', content: 'Event Registration', isTitle: true },
  { id: 'b2', type: 'text', content: 'Please fill out the details below to register for the event.' },
  { id: 'b3_1', type: 'short_answer', content: 'First Name', placeholder: 'Your first name', required: true, system: true },
  { id: 'b3_2', type: 'short_answer', content: 'Last Name', placeholder: 'Your last name', required: true, system: true },
  { id: 'b4', type: 'email', content: 'Email Address', placeholder: 'Your email', required: true, system: true },
];

const FONTS = [
  { name: 'Sans Serif', value: 'font-sans' },
  { name: 'Serif', value: 'font-serif' },
  { name: 'Mono', value: 'font-mono' },
];

const COLORS = [
  { name: 'Teal', value: 'teal', hex: '#14b8a6' },
  { name: 'Blue', value: 'blue', hex: '#3b82f6' },
  { name: 'Purple', value: 'purple', hex: '#a855f7' },
  { name: 'Rose', value: 'rose', hex: '#f43f5e' },
  { name: 'Orange', value: 'orange', hex: '#f97316' },
];

// --- Components ---

const BlockMenu = ({ onSelect, onClose }) => {
  const [search, setSearch] = useState('');
  const filteredBlocks = BLOCK_TYPES.filter(b =>
    b.label.toLowerCase().includes(search.toLowerCase())
  );

  // Group blocks by 'group' property
  const groupedBlocks = filteredBlocks.reduce((acc, block) => {
    const group = block.group || 'Other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(block);
    return acc;
  }, {});

  const groups = ['Basic', 'Input', 'Advanced', 'Media', 'Layout', 'Logic', 'Special', 'Other'];

  return (
    <div className="absolute z-50 mt-2  border border-gray-200 rounded-xl shadow-xl w-72 overflow-hidden animate-in fade-in zoom-in duration-100 flex flex-col h-96">            <div className="p-2 border-b border-gray-100">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 text-gray-400" size={14} />
        <input
          autoFocus
          className="w-full pl-8 pr-4 py-2 text-sm bg-gray-50 rounded-md outline-none border-none focus:ring-0"
          placeholder="Search blocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
      <div className="overflow-y-auto p-1 custom-scrollbar flex-1">
        {groups.map(groupName => {
          const blocks = groupedBlocks[groupName];
          if (!blocks || blocks.length === 0) return null;

          return (
            <div key={groupName} className="mb-2">
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">{groupName}</div>
              {blocks.map((block) => (
                <button
                  key={block.id}
                  onClick={() => onSelect(block.id)}
                  className="flex items-start gap-3 w-full p-2 hover:bg-teal-50 rounded-lg text-left transition-colors group"
                >
                  <div className="p-2 bg-gray-100 group-hover:bg-white group-hover:text-teal-600 rounded text-gray-600 transition-colors">
                    <block.icon size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{block.label}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{block.description}</div>
                  </div>
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function FormsPage() {
  const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
  const [view, setView] = useState('build');
  const [activeMenu, setActiveMenu] = useState(null);
  const [showDesignPanel, setShowDesignPanel] = useState(false);
  const [themeColor, setThemeColor] = useState(COLORS[0]);
  const [themeFont, setThemeFont] = useState(FONTS[0]);
  const [logo, setLogo] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const DRAFT_KEY = 'unifiro_form_draft_advanced';

  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBlocks(parsed);
        }
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  const saveDraft = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(blocks));
    if (toast) {
      toast.success("Draft saved successfully");
    } else {
      alert("Draft saved successfully");
    }
  };

  const addBlock = (type, index) => {
    const blockType = BLOCK_TYPES.find(b => b.id === type);
    const newBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: blockType.group === 'Basic' ? `New ${blockType.label}` : 'Question label',
      placeholder: 'Type something...',
      options: ['Option 1', 'Option 2', 'Option 3'],
      required: false,
    };
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    setBlocks(newBlocks);
    setActiveMenu(null);
  };

  const updateBlock = (id, updates) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBlock = (id) => {
    if (blocks.find(b => b.id === id)?.isTitle) return;
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handleDragStart = (e, position) => {
    dragItem.current = position;
    e.dataTransfer.effectAllowed = "move";
    e.target.classList.add('opacity-50');
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
    e.preventDefault();
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50');
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newBlocks = [...blocks];
      const draggedItemContent = newBlocks[dragItem.current];
      newBlocks.splice(dragItem.current, 1);
      newBlocks.splice(dragOverItem.current, 0, draggedItemContent);
      setBlocks(newBlocks);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const renderGenericInput = (block, themeColorVal) => {
    switch (block.type) {
      case 'short_answer': return <input type="text" disabled placeholder={block.placeholder || "Short answer text"} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm" />;
      case 'long_answer': return <textarea disabled placeholder={block.placeholder || "Long answer text"} className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm h-20 resize-none" />;
      case 'multiple_choice': return <div className="space-y-2">{block.options.map((opt, i) => <div key={i} className="flex items-center gap-2"><CircleDot size={16} className="text-gray-400" /><span className="text-sm text-gray-500">{opt}</span></div>)}</div>;
      case 'checkboxes': return <div className="space-y-2">{block.options.map((opt, i) => <div key={i} className="flex items-center gap-2"><CheckSquare size={16} className="text-gray-400" /><span className="text-sm text-gray-500">{opt}</span></div>)}</div>;
      case 'dropdown': return <div className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm flex justify-between items-center"><span>Select an option</span><ChevronDown size={16} /></div>;
      case 'date': return <div className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm flex items-center gap-2"><Calendar size={16} /> MM/DD/YYYY</div>;
      case 'time': return <div className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm flex items-center gap-2"><MousePointer2 size={16} /> 00:00 AM</div>;
      case 'email': return <div className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm flex items-center gap-2"><Mail size={16} /> email@example.com</div>;
      case 'phone': return <div className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm flex items-center gap-2"><Phone size={16} /> (555) 000-0000</div>;
      case 'url': return <div className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm flex items-center gap-2"><LinkIcon size={16} /> https://example.com</div>;
      case 'number': return <div className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm flex items-center gap-2"><Hash size={16} /> Number</div>;
      case 'rating': return <div className="flex gap-1 text-gray-300"><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /><Star fill="currentColor" size={24} /></div>;
      case 'slider': return <div className="h-2 bg-gray-200 rounded w-full mt-2 relative"><div className="absolute left-1/3 w-4 h-4 bg-gray-400 rounded-full -top-1"></div></div>;
      case 'file': return <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400"><Upload size={20} className="mb-2" /><span className="text-sm">File Upload</span></div>;
      case 'divider': return <hr className="border-gray-200 my-4" />;
      default: return <div className="p-3 bg-gray-50 border border-gray-100 rounded text-gray-400 text-sm italic">Configurable {block.type.replace('_', ' ')} block</div>;
    }
  };

  const renderBlockEditor = (block, index) => {
    const isEditing = activeMenu === block.id;
    const isBasicText = ['text', 'heading_1', 'heading_2', 'heading_3', 'quote', 'callout'].includes(block.type);

    return (
      <div
        key={block.id}
        className="group relative py-2 animate-in slide-in-from-top-2 duration-200"
        draggable={!block.isTitle}
        onDragStart={(e) => handleDragStart(e, index)}
        onDragEnter={(e) => handleDragEnter(e, index)}
        onDragEnd={handleDragEnd}
        onDragOver={(e) => e.preventDefault()}
      >
        {!block.isTitle && (
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setActiveMenu(isEditing ? null : block.id)} className={`p-1.5 text-gray-400 hover:text-${themeColor.value}-600 hover:bg-${themeColor.value}-50 rounded transition-colors`}><Plus size={18} /></button>
            <div className="p-1.5 text-gray-300 cursor-grab active:cursor-grabbing hover:text-gray-500"><GripVertical size={18} /></div>
          </div>
        )}
        {activeMenu === block.id && <BlockMenu onSelect={(type) => addBlock(type, index)} onClose={() => setActiveMenu(null)} />}

        <div className="w-full">
          {isBasicText || block.isTitle ? (
            <div className={`relative group/text ${activeMenu === block.id ? `ring-2 ring-${themeColor.value}-400 rounded-lg p-2` : ''}`}>
              <textarea
                autoFocus={index === blocks.length - 1 && block.content === ''}
                className={`w-full bg-transparent border-none focus:ring-0 resize-none overflow-hidden 
                    ${block.type === 'heading_1' || block.isTitle ? 'text-4xl font-bold mb-4' : ''}
                    ${block.type === 'heading_2' ? 'text-2xl font-bold mb-3' : ''}
                    ${block.type === 'heading_3' ? 'text-xl font-semibold mb-2' : ''}
                    ${block.type === 'quote' ? 'text-lg italic border-l-4 border-gray-300 pl-4 py-2 text-gray-600' : ''}
                    ${block.type === 'callout' ? 'bg-gray-50 p-4 rounded-lg text-gray-700' : ''}
                    ${block.type === 'text' && !block.isTitle ? 'text-base text-gray-600' : ''}
                    ${themeFont.value} placeholder-gray-300`}
                placeholder="Type something..."
                value={block.content}
                rows={1}
                onChange={(e) => { updateBlock(block.id, { content: e.target.value }); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
              />
              {!block.isTitle && (
                <div className="absolute right-0 top-0 opacity-0 group-hover/text:opacity-100 transition-opacity bg-white shadow-sm border border-gray-200 rounded p-1">
                  <button onClick={() => deleteBlock(block.id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete Block"><Trash2 size={16} /></button>
                </div>
              )}
            </div>
          ) : (
            <div className={`bg-white border-l-4 border-transparent pl-4 py-4 transition-all rounded-r-lg hover:shadow-sm ${activeMenu === block.id ? `border-${themeColor.value}-400 shadow-md` : 'hover:border-gray-300'}`}>
              <div className="flex justify-between items-start mb-2">
                <input className="w-full text-base font-semibold text-gray-800 border-none focus:ring-0 p-0 bg-transparent placeholder-gray-400" value={block.content} onChange={(e) => updateBlock(block.id, { content: e.target.value })} placeholder="Question label..." />
                {block.system && <span className="text-[10px] uppercase font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded ml-2 whitespace-nowrap">Required</span>}
              </div>

              <div className="flex flex-col gap-3">
                {renderGenericInput(block, themeColor.value)}

                {/* Specific Editor Controls for Multiple Choice/Checkboxes to add options */}
                {(block.type === 'multiple_choice' || block.type === 'checkboxes' || block.type === 'dropdown') && (
                  <button onClick={() => updateBlock(block.id, { options: [...block.options, `Option ${block.options.length + 1}`] })} className={`text-xs text-${themeColor.value}-600 font-medium hover:underline flex items-center gap-1 mt-2`}><Plus size={12} /> Add option</button>
                )}
              </div>

              {/* Helper Text / Placeholder Editor */}
              {activeMenu === block.id && block.group === 'Input' && (
                <input className="w-full mt-2 text-xs text-gray-500 border-none focus:ring-0 p-0 bg-transparent placeholder-gray-300 italic" value={block.placeholder || ''} onChange={(e) => updateBlock(block.id, { placeholder: e.target.value })} placeholder="Add placeholder text..." />
              )}

              <div className="mt-4 flex items-center justify-end opacity-0 group-hover:opacity-100 gap-2 transition-opacity">
                {!isBasicText && block.group !== 'Layout' && (
                  <div className="flex items-center gap-2 mr-4 border-r border-gray-100 pr-4">
                    <label className="text-xs flex items-center gap-2 text-gray-500 cursor-pointer select-none">
                      <input type="checkbox" checked={block.required} onChange={(e) => updateBlock(block.id, { required: e.target.checked })} disabled={block.system} className={`rounded border-gray-300 text-${themeColor.value}-600 focus:ring-${themeColor.value}-500`} />
                      Required
                    </label>
                  </div>
                )}
                <button onClick={() => deleteBlock(block.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete Block"><Trash2 size={16} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPreview = () => (
    <div className={`max-w-2xl mx-auto bg-white rounded-2xl shadow-xl min-h-[600px] border border-gray-100 animate-in fade-in duration-300 overflow-hidden ${themeFont.value}`}>
      <div className="h-40 bg-gray-100 w-full relative">
        {coverImage ? <img src={coverImage} alt="Cover" className="w-full h-full object-cover" /> : <div className={`w-full h-full bg-gradient-to-r from-${themeColor.value}-500/20 to-gray-100`}></div>}
        {logo && <div className="absolute -bottom-8 left-8 w-20 h-20 bg-white rounded-xl shadow-md p-1"><img src={logo} alt="Logo" className="w-full h-full object-contain rounded-lg" /></div>}
      </div>

      <div className="p-8 mt-4">
        {blocks.map((block) => {
          const isBasicText = ['text', 'heading_1', 'heading_2', 'heading_3', 'quote', 'callout'].includes(block.type);
          return (
            <div key={block.id} className="mb-6">
              {isBasicText || block.isTitle ? (
                <div className={`
                        ${block.type === 'heading_1' || block.isTitle ? 'text-3xl font-bold text-gray-900 mb-4' : ''}
                        ${block.type === 'heading_2' ? 'text-xl font-bold text-gray-800 mb-3' : ''}
                        ${block.type === 'heading_3' ? 'text-lg font-semibold text-gray-800 mb-2' : ''}
                        ${block.type === 'quote' ? 'text-lg italic border-l-4 border-gray-300 pl-4 py-2 text-gray-600 my-4' : ''}
                        ${block.type === 'callout' ? 'bg-gray-50 p-4 rounded-lg text-gray-700 my-4' : ''}
                        ${block.type === 'text' && !block.isTitle ? 'text-base text-gray-600' : ''}
                    `}>
                  {block.content}
                </div>
              ) : (
                <div>
                  {block.type !== 'divider' && block.type !== 'spacer' && (
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      {block.content} {block.required && <span className="text-red-500">*</span>}
                    </label>
                  )}

                  {/* Render Preview Inputs */}
                  {(() => {
                    switch (block.type) {
                      case 'short_answer': return <input type="text" placeholder={block.placeholder} className={`w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-${themeColor.value}-500/20 focus:border-${themeColor.value}-500 outline-none transition-all`} />;
                      case 'long_answer': return <textarea placeholder={block.placeholder} className={`w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-${themeColor.value}-500/20 focus:border-${themeColor.value}-500 outline-none transition-all`} rows={3} />;
                      case 'multiple_choice': return <div className="space-y-2">{block.options.map((opt, i) => <label key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"><input type="radio" name={block.id} className={`w-4 h-4 text-${themeColor.value}-600 focus:ring-${themeColor.value}-500`} /><span className="text-sm text-gray-700">{opt}</span></label>)}</div>;
                      case 'checkboxes': return <div className="space-y-2">{block.options.map((opt, i) => <label key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"><input type="checkbox" className={`w-4 h-4 rounded text-${themeColor.value}-600 focus:ring-${themeColor.value}-500`} /><span className="text-sm text-gray-700">{opt}</span></label>)}</div>;
                      case 'dropdown': return <select className={`w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-${themeColor.value}-500/20 focus:border-${themeColor.value}-500 outline-none transition-all bg-white`}><option>Select an option...</option>{block.options.map((opt, i) => <option key={i}>{opt}</option>)}</select>;
                      case 'email': return <input type="email" placeholder={block.placeholder} className={`w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-${themeColor.value}-500/20 focus:border-${themeColor.value}-500 outline-none transition-all`} />;
                      case 'phone': return <input type="tel" placeholder="(555) 000-0000" className={`w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-${themeColor.value}-500/20 focus:border-${themeColor.value}-500 outline-none transition-all`} />;
                      case 'url': return <input type="url" placeholder="https://" className={`w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-${themeColor.value}-500/20 focus:border-${themeColor.value}-500 outline-none transition-all`} />;
                      case 'number': return <input type="number" placeholder={block.placeholder} className={`w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-${themeColor.value}-500/20 focus:border-${themeColor.value}-500 outline-none transition-all`} />;
                      case 'date': return <input type="date" className={`w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-${themeColor.value}-500/20 focus:border-${themeColor.value}-500 outline-none transition-all`} />;
                      case 'time': return <input type="time" className={`w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-${themeColor.value}-500/20 focus:border-${themeColor.value}-500 outline-none transition-all`} />;
                      case 'rating': return <div className="flex gap-1 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors"><Star size={28} /><Star size={28} /><Star size={28} /><Star size={28} /><Star size={28} /></div>;
                      case 'slider': return <input type="range" className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-${themeColor.value}-500`} />;
                      case 'file': return <div className={`border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-${themeColor.value}-300 cursor-pointer transition-colors`}><Upload size={24} className="mb-2 text-gray-400" /><span className="text-sm">Upload File</span></div>;
                      case 'divider': return <hr className="border-gray-200 my-6" />;
                      default: return <div className="p-3 bg-gray-50 border border-gray-100 rounded text-gray-400 text-sm italic">Preview for {block.type}</div>;
                    }
                  })()}
                </div>
              )}
            </div>
          )
        })}
        <button className={`w-full bg-gradient-to-r from-teal-400 to-emerald-400 text-white font-bold py-3 rounded-xl mt-4 hover:shadow-lg hover:opacity-95 transition-all`}>
          Submit Registration
        </button>
      </div>
    </div>
  );

  return (
    <div className={`h-full flex flex-col animate-fade-in  backdrop-blur-sm relative ${themeFont.value}`}>
      <header className="h-16 border-b border-gray-100 flex items-center justify-between px-6  z-20">
        <div className="flex items-center gap-4">
          <Link href="/events" className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Registration Form</h1>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <p>Create your registration form</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-gray-100 rounded-lg mr-2">
            <button onClick={() => setView('build')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${view === 'build' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Build</button>
            <button onClick={() => setView('preview')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${view === 'preview' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Preview</button>
          </div>
          <button onClick={() => setShowDesignPanel(!showDesignPanel)} className={`p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors ${showDesignPanel ? 'bg-gray-50 border-gray-300 ring-2 ring-gray-100' : ''}`} title="Design & Branding"><Palette size={18} /></button>
          <button onClick={saveDraft} className={`px-4 py-2 rounded-xl border border-${themeColor.value}-200 text-${themeColor.value}-700 font-medium hover:bg-${themeColor.value}-50 transition-colors flex items-center gap-2 text-sm`}><Save size={16} /> Save Draft</button>
          <Link href="/create-event/upload">
            <button className={`px-6 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition-all flex items-center gap-2 text-sm`}>Next Step <ArrowRight size={16} /></button>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative flex">
        <div className={`flex-1 overflow-y-auto custom-scrollbar p-0 transition-all ${showDesignPanel ? 'mr-0' : ''}`}>
          {view === 'build' ? (
            <div className="max-w-3xl mx-auto py-12 px-12 min-h-full cursor-text pb-40">
              <div className="mb-10 group relative rounded-2xl border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors bg-gray-50/50 p-6 flex flex-col items-center justify-center min-h-[160px]">
                {coverImage ? <div className="absolute inset-0 w-full h-full"><img src={coverImage} alt="Cover" className="w-full h-full object-cover rounded-2xl opacity-80 group-hover:opacity-60 transition-opacity" /><div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="bg-white/90 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">Change Cover Image</span></div></div> : <div className="flex flex-col items-center text-gray-400"><ImageIcon size={32} className="mb-2" /><span className="font-medium">Add Cover Image</span></div>}
                <input type="file" accept="image/*" onChange={handleCoverUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="absolute -bottom-6 left-8 w-20 h-20 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center overflow-hidden z-10 group/logo cursor-pointer">{logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain" /> : <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-300"><Upload size={16} /></div>}<input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /></div>
              </div>

              {blocks.map((block, idx) => renderBlockEditor(block, idx))}

              <div className="mt-8 flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity justify-center py-8">
                <div className="relative">
                  <button onClick={() => setActiveMenu(activeMenu === 'bottom' ? null : 'bottom')} className={`flex items-center gap-2 px-4 py-2 text-black rounded-full bg-cyan-300 border border-gray-200 shadow-sm hover:text-black hover:border-gray-600 transition-all`}><Plus size={16} /> Add Block</button>
                  {activeMenu === 'bottom' && <BlockMenu onSelect={(type) => addBlock(type, blocks.length - 1)} onClose={() => setActiveMenu(null)} />}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50/50 min-h-full py-12 px-4">{renderPreview()}</div>
          )}
        </div>

        {/* Design Sidebar - now absolutely positioned on the right */}
        <div className={`w-80 border-l border-gray-100 bg-white shadow-xl transform transition-transform duration-300 absolute right-0 top-0 bottom-0 z-30 ${showDesignPanel ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Design & Branding</h3>
            <button onClick={() => setShowDesignPanel(false)} className="text-gray-400 hover:text-gray-600"><ArrowRight size={18} /></button>
          </div>
          <div className="p-6 space-y-8">

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 block">Typography</label>
              <div className="space-y-2">{FONTS.map(f => <button key={f.value} onClick={() => setThemeFont(f)} className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${themeFont.value === f.value ? `border-${themeColor.value}-500 bg-${themeColor.value}-50 text-${themeColor.value}-700` : 'border-gray-200 hover:border-gray-300'}`}><span className={f.value}>{f.name}</span></button>)}</div>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `.custom-scrollbar::-webkit-scrollbar { width: 8px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }` }} />
    </div>
  );
}
