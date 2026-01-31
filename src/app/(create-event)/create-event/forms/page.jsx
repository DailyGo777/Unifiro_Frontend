"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  ChevronDown, ChevronUp
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import ToggleSwitch from '@/components/ToggleSwitch';

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
      <div className="overflow-y-auto bg-white p-1 custom-scrollbar flex-1">
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
  const router = useRouter();
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

    // Load from template if we just came from gallery
    const selectedTemplate = localStorage.getItem('selectedTemplateForEvent');
    if (selectedTemplate) {
      try {
        const templateData = JSON.parse(selectedTemplate);
        if (templateData.title) {
          setBlocks(prev => prev.map(b => b.isTitle ? { ...b, content: templateData.title } : b));
        }
        if (templateData.image) setCoverImage(templateData.image);
        // We could also try to map templateData.items to form blocks here if they exist
        // For now, at least we keep the context
      } catch (e) {
        console.error("Failed to load selected template", e);
      }
    }
  }, []);

  // Autosave to localStorage so SettingsPage can pick it up
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(blocks));
  }, [blocks]);

  useEffect(() => {
    if (logo) localStorage.setItem('logo', logo);
  }, [logo]);

  useEffect(() => {
    if (coverImage) localStorage.setItem('coverImage', coverImage);
  }, [coverImage]);

  const saveDraft = () => {
    // Save to localStorage as a personal template
    const personalTemplates = JSON.parse(localStorage.getItem('personalTemplates') || '[]');

    const formName = prompt('Enter a name for this template:');
    if (!formName) return;

    const newTemplate = {
      id: Math.random().toString(36).substr(2, 9),
      title: formName,
      category: 'Personal',
      blocks: blocks,
      createdAt: new Date().toISOString(),
      image: coverImage || null,
      logo: logo || null
    };

    personalTemplates.push(newTemplate);
    localStorage.setItem('personalTemplates', JSON.stringify(personalTemplates));

    if (toast) {
      toast.success("Template saved successfully! Redirecting...");
    } else {
      alert("Template saved successfully!");
    }

    // Navigate to templates page after a short delay
    setTimeout(() => {
      router.push('/templates');
    }, 1000);
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

  const moveBlockUp = (index) => {
    if (index <= 0 || blocks[index]?.isTitle) return;
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const moveBlockDown = (index) => {
    if (index >= blocks.length - 1 || blocks[index]?.isTitle) return;
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const canMoveUp = (index) => index > 0 && !blocks[index]?.isTitle;
  const canMoveDown = (index) => index < blocks.length - 1 && !blocks[index]?.isTitle;

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
      case 'short_answer': return <input type="text" disabled placeholder={block.placeholder || "Short answer text"} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-400 text-sm font-normal focus:ring-2 focus:ring-offset-0 focus:border-gray-300 transition-shadow" />;
      case 'long_answer': return <textarea disabled placeholder={block.placeholder || "Long answer text"} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-400 text-sm font-normal h-20 resize-none focus:ring-2 focus:ring-offset-0 focus:border-gray-300 transition-shadow" />;
      case 'multiple_choice': return <div className="space-y-3">{block.options.map((opt, i) => <div key={i} className="flex items-center gap-3"><div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0"></div><span className="text-sm text-gray-700">{opt}</span></div>)}</div>;
      case 'checkboxes': return <div className="space-y-3">{block.options.map((opt, i) => <div key={i} className="flex items-center gap-3"><div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0"></div><span className="text-sm text-gray-700">{opt}</span></div>)}</div>;
      case 'dropdown': return <div className="px-3.5 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-400 text-sm font-normal flex justify-between items-center"><span>Select an option</span><ChevronDown size={18} className="text-gray-400" /></div>;
      case 'date': return <div className="px-3.5 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-400 text-sm font-normal flex items-center gap-3"><Calendar size={18} className="text-gray-400" /><span>MM/DD/YYYY</span></div>;
      case 'time': return <div className="px-3.5 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-400 text-sm font-normal flex items-center gap-3"><MousePointer2 size={18} className="text-gray-400" /><span>00:00 AM</span></div>;
      case 'email': return <div className="px-3.5 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-400 text-sm font-normal flex items-center gap-3"><Mail size={18} className="text-gray-400" /><span>email@example.com</span></div>;
      case 'phone': return <div className="px-3.5 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-400 text-sm font-normal flex items-center gap-3"><Phone size={18} className="text-gray-400" /><span>(555) 000-0000</span></div>;
      case 'url': return <div className="px-3.5 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-400 text-sm font-normal flex items-center gap-3"><LinkIcon size={18} className="text-gray-400" /><span>https://example.com</span></div>;
      case 'number': return <div className="px-3.5 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-400 text-sm font-normal flex items-center gap-3"><Hash size={18} className="text-gray-400" /><span>Number</span></div>;
      case 'rating': return <div className="flex gap-2 text-gray-300"><Star fill="currentColor" size={28} className="hover:text-yellow-400 transition-colors cursor-not-allowed" /><Star fill="currentColor" size={28} className="hover:text-yellow-400 transition-colors cursor-not-allowed" /><Star fill="currentColor" size={28} className="hover:text-yellow-400 transition-colors cursor-not-allowed" /><Star fill="currentColor" size={28} className="hover:text-yellow-400 transition-colors cursor-not-allowed" /><Star fill="currentColor" size={28} className="hover:text-yellow-400 transition-colors cursor-not-allowed" /></div>;
      case 'opinion_scale': return <div className="flex justify-between border border-gray-200 rounded-lg overflow-hidden">{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <div key={n} className="flex-1 py-2 text-center text-xs font-semibold border-r border-gray-100 last:border-0 bg-white text-gray-400">{n}</div>)}</div>;
      case 'ranking': return <div className="space-y-2">{[1, 2, 3].map(n => <div key={n} className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg bg-white"><GripVertical size={14} className="text-gray-300" /><div className="w-full h-2 bg-gray-100 rounded-full"></div></div>)}</div>;
      case 'matrix': return <div className="border border-gray-200 rounded-lg overflow-hidden"><div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200"><div className="p-2"></div>{[1, 2, 3].map(n => <div key={n} className="p-2 text-[10px] font-bold text-center text-gray-400">Col {n}</div>)}</div>{[1, 2].map(r => <div key={r} className="grid grid-cols-4 border-b border-gray-100 last:border-0"><div className="p-2 text-[10px] text-gray-400">Row {r}</div>{[1, 2, 3].map(c => <div key={c} className="p-2 flex justify-center"><div className="w-3 h-3 border border-gray-300 rounded-full"></div></div>)}</div>)}</div>;
      case 'slider': return <div className="flex items-center gap-4 py-2"><span className="text-xs text-gray-500">0</span><div className="h-2 bg-gray-200 rounded-full flex-1 relative"><div className="absolute left-1/3 w-5 h-5 bg-white border-2 border-gray-300 rounded-full -top-1.5 shadow-sm"></div></div><span className="text-xs text-gray-500">100</span></div>;
      case 'signature': return <div className="border border-gray-200 rounded-lg h-24 bg-gray-50/50 flex items-center justify-center text-gray-300 italic text-xs">Sign here...</div>;
      case 'file': return <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-400 bg-gray-50/30"><Upload size={24} className="mb-2" /><span className="text-sm font-medium">Click to upload or drag and drop</span><span className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</span></div>;
      case 'image': return <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-gray-200"><ImageIcon size={32} /></div>;
      case 'video': return <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white/50 border border-gray-200"><Video size={32} /></div>;
      case 'audio': return <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4 border border-gray-200"><Music size={24} className="text-gray-400" /><div className="flex-1 h-1 bg-gray-300 rounded-full"></div></div>;
      case 'google_maps': return <div className="aspect-video bg-blue-50 rounded-lg flex items-center justify-center text-blue-300 border border-gray-200"><MapPin size={32} /></div>;
      case 'spacer': return <div className="h-12 border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest font-bold">Spacer</div>;
      case 'columns_2': return <div className="grid grid-cols-2 gap-4"><div className="border border-dashed border-gray-200 rounded-lg h-20"></div><div className="border border-dashed border-gray-200 rounded-lg h-20"></div></div>;
      case 'calculator': return <div className="bg-teal-50 p-4 rounded-lg flex items-center gap-3 border border-teal-100"><Calculator size={20} className="text-teal-500" /><div className="text-xs font-bold text-teal-700">Calculation Logic Applied</div></div>;
      case 'hidden_field': return <div className="bg-gray-100 p-3 rounded-lg border border-gray-200 flex items-center gap-3 opacity-60"><Eye size={16} className="text-gray-400" /><span className="text-xs font-medium text-gray-500 italic">Invisible to user</span></div>;
      case 'address': return <div className="space-y-3"><input type="text" disabled placeholder="Street Address" className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-xs" /><div className="grid grid-cols-2 gap-3"><input type="text" disabled placeholder="City" className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-xs" /><input type="text" disabled placeholder="Zip Code" className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-xs" /></div></div>;
      case 'country': return <div className="px-3.5 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-400 text-sm font-normal flex items-center gap-3"><Globe size={18} className="text-gray-400" /><span>Select Country</span></div>;
      case 'gdpr': return <div className="flex items-start gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-lg"><div className="w-5 h-5 border-2 border-blue-300 rounded flex-shrink-0"></div><span className="text-[11px] text-gray-600 font-medium">I agree to the processing of my personal data according to the GDPR guidelines.</span></div>;
      case 'terms': return <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"><div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0"></div><span className="text-[11px] text-gray-600 font-medium">I accept the <span className="text-blue-600 underline">Terms and Conditions</span>.</span></div>;
      case 'payment': return <div className="p-4 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm flex items-center justify-between"><div className="flex items-center gap-3"><CreditCard size={20} className="text-gray-400" /><span className="text-sm font-bold text-gray-700">Stripe Payment Module</span></div><div className="px-3 py-1 bg-teal-50 text-teal-600 font-bold text-[10px] rounded-full uppercase">Secure</div></div>;
      case 'captcha': return <div className="p-4 border border-gray-200 rounded-lg bg-white flex items-center justify-between mx-auto max-w-xs shrink-0"><div className="flex items-center gap-3"><div className="w-6 h-6 border-2 border-gray-200 rounded"></div><span className="text-sm font-medium">I'm not a robot</span></div><User size={24} className="text-blue-500" /></div>;
      case 'help_text': return <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-100 rounded-xl"><HelpCircle size={18} className="text-yellow-600 shrink-0 mt-0.5" /><span className="text-xs text-yellow-800 leading-relaxed font-medium">Click the info icon to see how we use this data throughout the registration process.</span></div>;
      case 'divider': return <div className="my-6 border-t border-gray-200"></div>;
      default: return <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm font-medium italic">Configurable {block.type.replace('_', ' ')} block</div>;
    }
  };

  const renderBlockEditor = (block, index) => {
    const isEditing = activeMenu === block.id;
    const isBasicText = ['text', 'heading_1', 'heading_2', 'heading_3', 'quote', 'callout'].includes(block.type);
    const blockTypeInfo = BLOCK_TYPES.find(bt => bt.id === block.type);
    const BlockIcon = blockTypeInfo?.icon;

    return (
      <>
        {!block.isTitle && (
          <div className="flex justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity mb-2">
            <button onClick={() => setActiveMenu(isEditing ? null : block.id)} className={`p-2 text-gray-800 hover:text-${themeColor.value}-600 hover:bg-${themeColor.value}-50 rounded-md transition-colors`} title="Add block below"><Plus size={18} /></button>
            {canMoveUp(index) && (
              <button onClick={() => moveBlockUp(index)} className="p-2 text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Move up"><ChevronUp size={18} /></button>
            )}
            {canMoveDown(index) && (
              <button onClick={() => moveBlockDown(index)} className="p-2 text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Move down"><ChevronDown size={18} /></button>
            )}
            <button onClick={() => deleteBlock(block.id)} className="p-2 text-gray-800 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Delete block"><Trash2 size={18} /></button>
          </div>
        )}

        <div
          key={block.id}
          className="group relative mb-3 animate-in slide-in-from-top-2 duration-200"
          draggable={!block.isTitle}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => e.preventDefault()}
        >
          {activeMenu === block.id && <BlockMenu onSelect={(type) => addBlock(type, index)} onClose={() => setActiveMenu(null)} />}

          <div className="w-full mb-2">
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
                  onKeyDown={(e) => { if (e.key === '?') { e.stopPropagation(); } }}
                />
                {!block.isTitle && (
                  <div className="absolute right-0 top-0 opacity-0 group-hover/text:opacity-100 transition-opacity bg-white shadow-sm border border-gray-200 rounded p-1">
                    <button onClick={() => deleteBlock(block.id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete Block"><Trash2 size={16} /></button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    {BlockIcon && (
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-600 flex-shrink-0">
                        <BlockIcon size={18} />
                      </div>
                    )}
                    <div className="flex items-center gap-4 flex-1">
                      <input className="flex-1 text-base font-semibold text-gray-900 border-none focus:ring-0 p-0 bg-transparent placeholder-gray-400" value={block.content} onChange={(e) => updateBlock(block.id, { content: e.target.value })} onKeyDown={(e) => { if (e.key === '?') { e.stopPropagation(); } }} placeholder="Question label..." />
                      {!isBasicText && (
                        <div className="flex items-center gap-2 pr-2">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Required</span>
                          <ToggleSwitch isOn={block.required} onToggle={() => updateBlock(block.id, { required: !block.required })} />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* {block.system && <span className="text-[11px] uppercase font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md ml-2 whitespace-nowrap border border-teal-200">Required</span>} */}
                </div>

                <div className="flex flex-col gap-4 mr-6">
                  {renderGenericInput(block, themeColor.value)}

                  {/* Specific Editor Controls for Multiple Choice/Checkboxes to add options */}
                  {(block.type === 'multiple_choice' || block.type === 'checkboxes' || block.type === 'dropdown') && (
                    <button onClick={() => updateBlock(block.id, { options: [...block.options, `Option ${block.options.length + 1}`] })} className={`text-xs text-${themeColor.value}-600 font-semibold hover:text-${themeColor.value}-700 flex items-center gap-2 mt-2 transition-colors`}><Plus size={14} /> Add option</button>
                  )}

                  {/* Placeholder/Helper Text Editor - Always visible for input and special blocks */}
                  {(block.group === 'Input' || block.group === 'Special') && !['divider', 'spacer', 'columns_2'].includes(block.type) && (
                    <div className="mt-2 pt-3 border-t border-gray-100">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block">Placeholder Text</label>
                      <input
                        className="w-full px-3 py-2.5 text-sm text-gray-700 border border-gray-200 rounded-lg focus:ring-2 focus:ring-offset-0 focus:border-gray-200 bg-white transition-all placeholder-gray-400"
                        value={block.placeholder || ''}
                        onChange={(e) => updateBlock(block.id, { placeholder: e.target.value })}
                        onKeyDown={(e) => { if (e.key === '?') { e.stopPropagation(); } }}
                        placeholder="e.g. Enter your answer here..."
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderPreview = () => (
    <div className={`max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl min-h-[600px] border border-gray-200 animate-in fade-in duration-300 overflow-hidden ${themeFont.value}`}>
      <div className="h-48 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 w-full relative">
        {coverImage ? <img src={coverImage} alt="Cover" className="w-full h-full object-cover" /> : <div className={`w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700`}></div>}
        {logo && <div className="absolute -bottom-10 left-8 w-24 h-24 bg-white rounded-2xl shadow-xl p-1.5 border border-gray-100"><img src={logo} alt="Logo" className="w-full h-full object-contain rounded-xl" /></div>}
      </div>

      <div className="p-12 mt-6">
        {blocks.map((block) => {
          const isBasicText = ['text', 'heading_1', 'heading_2', 'heading_3', 'quote', 'callout'].includes(block.type);
          return (
            <div key={block.id} className="mb-8">
              {isBasicText || block.isTitle ? (
                <div className={`
                        ${block.type === 'heading_1' || block.isTitle ? 'text-4xl font-bold text-gray-900 mb-4 leading-tight' : ''}
                        ${block.type === 'heading_2' ? 'text-2xl font-bold text-gray-800 mb-3 leading-snug' : ''}
                        ${block.type === 'heading_3' ? 'text-lg font-semibold text-gray-800 mb-2' : ''}
                        ${block.type === 'quote' ? 'text-lg italic border-l-4 border-gray-400 pl-6 py-2 text-gray-700 my-6 font-normal' : ''}
                        ${block.type === 'callout' ? 'bg-blue-50 border border-blue-200 p-5 rounded-xl text-gray-800 my-6 font-medium' : ''}
                        ${block.type === 'text' && !block.isTitle ? 'text-base text-gray-700 leading-relaxed' : ''}
                    `}>
                  {block.content}
                </div>
              ) : (
                <div>
                  {block.type !== 'divider' && block.type !== 'spacer' && (
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      {block.content} {block.required && <span className="text-red-500 font-bold">*</span>}
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
                      case 'rating': return <div className="flex gap-2 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors"><Star size={32} /><Star size={32} /><Star size={32} /><Star size={32} /><Star size={32} /></div>;
                      case 'opinion_scale': return <div className="flex flex-col gap-4"><div className="flex justify-between border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm">{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <button key={n} className="flex-1 py-4 text-sm font-bold border-r border-gray-100 last:border-0 hover:bg-gray-50 transition-colors text-gray-600">{n}</button>)}</div><div className="flex justify-between px-2 text-[10px] font-black uppercase tracking-widest text-gray-400"><span>Not likely at all</span><span>Extremely likely</span></div></div>;
                      case 'ranking': return <div className="space-y-3">{block.options.map((opt, i) => <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm cursor-grab active:cursor-grabbing hover:border-gray-300 transition-all"><div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center font-bold text-gray-400">{i + 1}</div><span className="flex-1 font-semibold text-gray-700">{opt}</span><GripVertical size={18} className="text-gray-300" /></div>)}</div>;
                      case 'matrix': return <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm"><table className="w-full text-sm"><thead><tr className="bg-gray-50 border-b border-gray-100"><th className="p-4"></th>{['Column 1', 'Column 2', 'Column 3'].map(c => <th key={c} className="p-4 font-bold text-gray-600 uppercase tracking-widest text-[10px]">{c}</th>)}</tr></thead><tbody>{['Row 1', 'Row 2'].map(r => <tr key={r} className="border-b border-gray-100 last:border-0"><td className="p-4 font-semibold text-gray-700">{r}</td>{[1, 2, 3].map(c => <td key={c} className="p-4 text-center"><input type="radio" name={`${block.id}-${r}`} className="w-5 h-5 text-teal-600 border-gray-300 focus:ring-teal-500" /></td>)}</tr>)}</tbody></table></div>;
                      case 'slider': return <div className="space-y-4 py-4"><input type="range" className={`w-full h-2.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-teal-500`} /><div className="flex justify-between text-xs font-bold text-gray-400"><span>0</span><span>100</span></div></div>;
                      case 'signature': return <div className="w-full rounded-2xl border-2 border-dashed border-gray-200 h-40 bg-gray-50 flex flex-col items-center justify-center gap-3 group hover:border-teal-400 transition-colors cursor-crosshair"><Fingerprint size={32} className="text-gray-300 group-hover:text-teal-400 transition-colors" /><span className="text-sm font-semibold text-gray-400 group-hover:text-teal-600">Click to add signature</span></div>;
                      case 'file': return <div className={`border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-gray-500 hover:bg-teal-50 hover:border-teal-300 cursor-pointer transition-all shadow-sm active:scale-[0.99]`}><Upload size={40} className="mb-4 text-teal-500 opacity-60" /><span className="text-base font-bold text-teal-900">Upload documents or images</span><span className="text-sm text-gray-400 mt-1 uppercase font-black tracking-widest">Max file size 25MB</span></div>;
                      case 'image': return <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50 aspect-video flex items-center justify-center"><ImageIcon size={48} className="text-gray-200" /></div>;
                      case 'video': return <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black aspect-video flex items-center justify-center relative"><div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 text-white"><Video size={32} /></div></div>;
                      case 'audio': return <div className="rounded-2xl p-6 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl border border-gray-700 flex items-center gap-6"><div className="p-4 bg-teal-500 text-white rounded-full group-hover:scale-110 transition-transform"><Music size={24} /></div><div className="flex-1 space-y-2"><div className="h-1.5 bg-gray-700 rounded-full overflow-hidden"><div className="w-1/3 h-full bg-teal-400"></div></div><div className="flex justify-between text-[10px] font-black text-gray-500 tracking-tighter"><span>00:45</span><span>03:20</span></div></div></div>;
                      case 'google_maps': return <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 aspect-video bg-blue-50 relative"><div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-100"></div><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"><MapPin size={48} className="text-red-500 drop-shadow-lg" /><div className="mt-4 bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 text-xs font-bold text-gray-700">Event Location</div></div></div>;
                      case 'divider': return <hr className="border-gray-200 my-10" />;
                      case 'spacer': return <div className="h-16"></div>;
                      case 'columns_2': return <div className="grid grid-cols-2 gap-8"><div className="p-6 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-[10px]">Column 1</div><div className="p-6 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-[10px]">Column 2</div></div>;
                      case 'calculator': return <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 shadow-sm flex items-center justify-between"><div className="flex items-center gap-4 text-teal-700"><Calculator size={28} /><div className="flex flex-col"><span className="text-sm font-black uppercase tracking-widest">Smart Calculator</span><span className="text-xs font-medium opacity-60">Logic applied based on previous answers</span></div></div><div className="text-2xl font-black text-teal-600 tracking-tighter">$149.00</div></div>;
                      case 'hidden_field': return <div className="hidden">Hidden Field - only visible in admin</div>;
                      case 'address': return <div className="grid gap-4"><input type="text" placeholder="Street Address" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-teal-400 outline-none transition-all shadow-sm" /><div className="grid grid-cols-2 gap-4"><input type="text" placeholder="City" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-teal-400 outline-none transition-all shadow-sm" /><input type="text" placeholder="Zip Code" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-teal-400 outline-none transition-all shadow-sm" /></div></div>;
                      case 'country': return <div className="relative"><Globe size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><select className="w-full border-2 border-gray-100 rounded-2xl p-4 pl-12 focus:border-teal-400 outline-none transition-all shadow-sm bg-white appearance-none"><option>Select a country...</option><option>United States</option><option>India</option><option>United Kingdom</option></select><ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /></div>;
                      case 'gdpr': return <label className="flex items-start gap-4 p-5 bg-blue-50/30 border border-blue-100 rounded-2xl cursor-pointer hover:bg-blue-50 transition-colors"><input type="checkbox" className="w-5 h-5 mt-0.5 rounded text-blue-600 focus:ring-blue-500" /><div className="flex-1"><span className="text-sm font-semibold text-gray-800 block mb-1">GDPR Compliance</span><span className="text-xs text-gray-600 leading-relaxed font-medium">I agree to the storage and processing of my personal data for event management purposes.</span></div></label>;
                      case 'terms': return <label className="flex items-center gap-4 p-5 bg-gray-50 border border-gray-200 rounded-2xl cursor-pointer hover:bg-white transition-all"><input type="checkbox" className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500" /><span className="text-sm font-bold text-gray-700">I have read and agree to the <span className="text-teal-600 underline">Terms and Conditions</span></span></label>;
                      case 'payment': return <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl"><div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6 flex justify-between items-center"><div className="flex items-center gap-4 text-white"><CreditCard size={32} className="opacity-60" /><div className="flex flex-col"><span className="text-xs font-black uppercase tracking-[0.2em] opacity-50">Secure Payment</span><span className="text-lg font-black tracking-tighter">Debit / Credit Card</span></div></div><div className="flex gap-2"><div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center"><div className="w-4 h-4 bg-orange-400 rounded-full opacity-60 translate-x-1"></div><div className="w-4 h-4 bg-red-400 rounded-full opacity-60 -translate-x-1"></div></div></div></div><div className="p-6 bg-white space-y-4"><div className="flex flex-col gap-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Card Number</label><div className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center px-4 font-mono text-gray-400 tracking-widest">•••• •••• •••• ••••</div></div></div></div>;
                      case 'captcha': return <div className="p-6 rounded-2xl border border-gray-200 bg-white flex items-center justify-between shadow-lg max-w-sm mx-auto"><div className="flex items-center gap-4"><div className="w-8 h-8 border-2 border-gray-300 rounded hover:border-teal-500 transition-colors"></div><span className="text-sm font-black uppercase tracking-wide text-gray-600">I'm not a robot</span></div><div className="flex flex-col items-center"><User size={32} className="text-blue-500" /><span className="text-[6px] font-black uppercase mt-1 text-gray-400 tracking-tighter">reCAPTCHA</span></div></div>;
                      case 'help_text': return <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 shadow-sm flex items-start gap-4"><HelpCircle size={24} className="text-blue-500 shrink-0 mt-0.5" /><div className="space-y-1"><span className="text-sm font-black text-blue-900 uppercase tracking-widest">Important Information</span><p className="text-xs text-blue-700 leading-loose font-medium opacity-80">This section contains details about accessibility, security, and the registration timeline. Ensure all fields are filled accurately to avoid delays.</p></div></div>;
                      default: return <div className="p-3 bg-gray-50 border border-gray-100 rounded text-gray-400 text-sm italic">Preview for {block.type}</div>;
                    }
                  })()}
                </div>
              )}
            </div>
          )
        })}
        <button className={`w-full submit-btn bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-3.5 rounded-xl mt-8 hover:shadow-lg hover:opacity-95 transition-all border border-teal-600 text-base`}>
          Submit Registration
        </button>
      </div>
    </div>
  );

  return (
    <div className={`forms-ui h-full flex flex-col animate-fade-in  backdrop-blur-sm relative ${themeFont.value}`} onKeyDown={(e) => { if (e.key === '?' || (e.shiftKey && e.key === '/')) { e.preventDefault(); } }}>
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8 shadow-sm z-20">
        <div className="flex items-center gap-4">
          <Link href="/events" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Untitled form</h1>
            {/* <p className="description muted">This Registration Form Description</p> */}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex p-1.5 bg-gray-100 rounded-xl border border-gray-200">
            <button onClick={() => setView('build')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'build' ? 'bg-white shadow-sm text-gray-900 border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Build</button>
            <button onClick={() => setView('preview')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'preview' ? 'bg-white shadow-sm text-gray-900 border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Preview</button>
          </div>
          <button onClick={() => setShowDesignPanel(!showDesignPanel)} className={`p-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all ${showDesignPanel ? 'bg-gray-100 border-gray-400' : ''}`} title="Design & Branding"><Palette size={18} /></button>
          <button onClick={saveDraft} className={`px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 text-sm`}><Save size={16} /> Save</button>
          <Link href="/create-event/upload">
            <button
              onClick={() => {
                localStorage.setItem('formBlocks', JSON.stringify(blocks));
                localStorage.setItem('coverImage', coverImage || '');
                localStorage.setItem('logo', logo || '');
              }}
              className={`px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold shadow-lg hover:shadow-xl hover:opacity-90 transition-all flex items-center gap-2 text-sm border border-teal-600`}
            >
              Next <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative flex">
        <div className={`flex-1 overflow-y-auto custom-scrollbar p-0 transition-all ${showDesignPanel ? 'mr-0' : ''}`}>
          {view === 'build' ? (
            <div className="w-full mx-auto py-4 px-6 min-h-full pb-40 flex justify-center">
              <div className="w-full max-w-3xl">
                <div className="mb-6 group relative rounded-2xl border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all bg-gradient-to-br from-gray-50 to-white p-6 flex flex-col items-center justify-center min-h-[160px]">
                  {coverImage ? <div className="absolute inset-0 w-full h-full"><img src={coverImage} alt="Cover" className="w-full h-full object-cover rounded-xl opacity-75 group-hover:opacity-60 transition-opacity" /><div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="bg-white/95 px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg">Change Cover Image</span></div></div> : <div className="flex flex-col items-center text-gray-400"><ImageIcon size={36} className="mb-3" /><span className="font-semibold text-gray-600">Add Cover Image</span><span className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</span></div>}
                  <input type="file" accept="image/*" onChange={handleCoverUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="absolute -bottom-8 left-8 w-24 h-24 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center overflow-hidden z-10 group/logo cursor-pointer hover:shadow-xl transition-shadow">{logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain" /> : <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-300"><Upload size={18} /></div>}<input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /></div>
                </div>

                {blocks.map((block, idx) => (
                  <React.Fragment key={block.id}>
                    {renderBlockEditor(block, idx)}
                  </React.Fragment>
                ))}

                <div className="mt-8 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity justify-center py-8">
                  <div className="relative">
                    <button onClick={() => setActiveMenu(activeMenu === 'bottom' ? null : 'bottom')} className={`flex items-center gap-2.5 px-5 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 border border-teal-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200`}><Plus size={18} /> Add Block</button>
                    {activeMenu === 'bottom' && <BlockMenu onSelect={(type) => addBlock(type, blocks.length - 1)} onClose={() => setActiveMenu(null)} />}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50/50 min-h-full py-6 px-4 flex justify-center">{renderPreview()}</div>
          )}
        </div>

        {/* Design Sidebar - now absolutely positioned on the right */}
        <div className={`w-80 border-l border-gray-200 bg-white shadow-2xl transform transition-transform duration-300 absolute right-0 top-0 bottom-0 z-30 ${showDesignPanel ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
            <h3 className="font-bold text-gray-900 text-lg">Design & Branding</h3>
            <button onClick={() => setShowDesignPanel(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><ArrowRight size={18} /></button>
          </div>
          <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-120px)]">

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4 block">Typography</label>
              <div className="space-y-2">{FONTS.map(f => <button key={f.value} onClick={() => setThemeFont(f)} className={`w-full p-3.5 rounded-xl border text-left text-sm font-medium transition-all ${themeFont.value === f.value ? `border-teal-500 bg-teal-50 text-teal-700` : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}><span className={f.value}>{f.name}</span></button>)}</div>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `.custom-scrollbar::-webkit-scrollbar { width: 8px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }` }} />
    </div>
  );
}
