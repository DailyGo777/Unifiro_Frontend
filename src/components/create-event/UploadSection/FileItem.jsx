"use client";

import { File, Trash2 } from "lucide-react";

export default function FileItem({ file, onDelete, formatFileSize }) {
    return (
        <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-4 flex-1">
                <div className="p-2.5 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                    <File size={20} className="text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                        {formatFileSize(file.size)} • {new Date(file.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <button
                onClick={() => onDelete(file.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all ml-4"
                title="Delete file"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}
