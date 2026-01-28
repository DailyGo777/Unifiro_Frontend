"use client";

import FileItem from "./FileItem";

export default function FilesList({ uploadedFiles, onDelete, onClearAll, formatFileSize }) {
    if (uploadedFiles.length === 0) return null;

    return (
        <div className="w-full max-w-4xl mt-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Files ({uploadedFiles.length})</h2>
                <button
                    onClick={onClearAll}
                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                    Clear all
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {uploadedFiles.map((file) => (
                        <FileItem
                            key={file.id}
                            file={file}
                            onDelete={onDelete}
                            formatFileSize={formatFileSize}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
