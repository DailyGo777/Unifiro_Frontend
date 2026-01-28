"use client";

import { ArrowLeft, X } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import TemplateCard from "./TemplateCard";

export default function TemplateGallery({
  onBack,
  activeCategory,
  onCategoryChange,
  categories,
  filteredTemplates,
  onDelete,
  personalTemplates,
  gradientClass,
}) {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between mb-0 mt-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium group"
        >
          <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100 group-hover:bg-gray-50">
            <ArrowLeft className="w-5 h-5" />
          </div>
        </button>

        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold md:text-4xl text-gray-900 tracking-tight">
          Explore form & survey templates
        </h2>
        <p className="text-gray-800 mt-3 max-w-xl mx-auto">
          Explore, pick, and customize templates to your needs. <br />
          Discover how to <span className="underline cursor-pointer">use templates</span>,{" "}
          <span className="underline cursor-pointer">create your own</span> or{" "}
          <span className="underline cursor-pointer">submit your template</span> to the gallery.
        </p>
      </div>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
        gradientClass={gradientClass}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-24">
        {filteredTemplates.map((template, idx) => (
          <TemplateCard
            key={idx}
            template={template}
            onDelete={onDelete}
            isPersonal={template.category === "Personal" && personalTemplates.some((pt) => pt.id === template.id)}
          />
        ))}
      </div>
    </div>
  );
}
