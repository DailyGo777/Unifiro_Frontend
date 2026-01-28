"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function TemplateCard({ template, onDelete, isPersonal }) {
  return (
    <div className="relative">
      <Link href="/create-event/forms" className="group block">
        <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-96 flex flex-col">
          <div className="h-5/6 overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-50">
            {template.image ? (
              <>
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <svg className="w-16 h-16 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium text-gray-500">No cover image</span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-gray-600 uppercase">
                {template.category}
              </span>
            </div>
          </div>
          <div className="h-1/6 flex flex-col items-center justify-center px-6 bg-white z-10">
            <h3 className="text-base font-bold text-gray-800 group-hover:text-orange-500 transition-colors text-center">
              {template.title}
            </h3>
          </div>
        </div>
      </Link>
      {isPersonal && (
        <button
          onClick={() => onDelete(template.id)}
          className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
          title="Delete template"
        >
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );
}
