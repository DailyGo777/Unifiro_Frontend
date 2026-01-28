"use client";

export default function CategoryFilter({ categories, activeCategory, onCategoryChange, gradientClass }) {
  return (
    <div className="flex justify-center flex-wrap gap-3 mb-6">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`rounded-full transition-all duration-300 focus:outline-none ${
              isActive
                ? `p-[1.5px] ${gradientClass} shadow-md scale-105`
                : "p-[1.5px] bg-transparent hover:scale-105"
            }`}
          >
            <span
              className={`block px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive
                  ? "bg-white text-gray-900"
                  : "bg-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {cat}
            </span>
          </button>
        );
      })}
    </div>
  );
}
