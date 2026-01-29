"use client";

import Link from "next/link";
import { Trash2, Pencil, Plus } from "lucide-react";

export default function TemplateCard({ template, onEdit, onDelete, isPersonal }) {
  const handleClick = () => {
    if (onEdit) onEdit(template);
  };

  return (
    <div className="relative group">
      <div
        onClick={handleClick}
        className="bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-[450px] flex flex-col cursor-pointer bg-white"
      >
        <div className="h-3/5 overflow-hidden relative bg-gradient-to-br from-gray-50 to-white border-b border-gray-50">
          {template.image ? (
            <>
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <svg className="w-16 h-16 mb-2 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs font-medium text-gray-400">No cover image</span>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest border border-gray-100 shadow-sm">
              {template.category}
            </span>
          </div>

          {/* Hover Overlay for Edit Action */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/40 backdrop-blur-[2px]">
            <div className="bg-white p-4 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform">
              <Pencil className="text-indigo-600" size={24} />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-6 bg-white">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-4 line-clamp-1">
            {template.title}
          </h3>

          <div className="mt-auto flex flex-col sm:flex-row gap-2">
            <Link
              href="/create-event/forms"
              onClick={(e) => {
                e.stopPropagation();
                localStorage.setItem('selectedTemplateForEvent', JSON.stringify(template));
              }}
              className="flex-1 py-3 bg-gradient-to-r from-[#14b8a6] via-[#22c55e] to-[#84cc16] hover:opacity-90 text-white text-[10px] font-black uppercase tracking-widest rounded-[14px] shadow-lg shadow-green-100 text-center transition-all active:scale-95 flex items-center justify-center border border-green-500/20"
            >
              Register Event
            </Link>

            {isPersonal ? (
              <button
                onClick={(e) => { e.stopPropagation(); handleClick(); }}
                className="flex-1 py-3 bg-white hover:bg-gray-50 text-gray-600 text-[8px] font-bold uppercase tracking-widest rounded-[14px] transition-all flex items-center justify-center gap-2 border border-gray-200 shadow-sm"
              >
                <Pencil size={12} className="text-gray-400" /> Edit Design
              </button>
            ) : (
              <div className="flex-1 py-3 bg-gray-50/50 text-gray-400 text-[8px] font-bold uppercase tracking-widest rounded-[14px] flex items-center justify-center gap-2 border border-gray-100 border-dashed">
                Standard Design
              </div>
            )}
          </div>
        </div>
      </div>

      {isPersonal && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(template.id); }}
          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur hover:bg-red-50 text-red-500 rounded-full shadow-lg border border-red-100 transition-all opacity-0 group-hover:opacity-100 z-20"
          title="Delete template"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
