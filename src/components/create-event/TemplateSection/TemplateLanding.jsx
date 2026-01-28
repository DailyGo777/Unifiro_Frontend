"use client";

import Link from "next/link";

export default function TemplateLanding({ onNavigateGallery, defaultTemplates }) {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-12 md:mb-16">
        <p className="text-gray-600 tracking-widest text-xs font-bold uppercase mb-4">
          Choose your perfect template
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-6">
          Explore form templates
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover ready-to-use templates to create engaging forms and surveys. Pick one, customize, and start collecting responses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-24">
        {/* Template Cards */}
        {defaultTemplates.slice(0, 3).map((template, idx) => (
          <div
            key={idx}
            onClick={onNavigateGallery}
            className="group cursor-pointer"
          >
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
          </div>
        ))}
      </div>
    </div>
  );
}
