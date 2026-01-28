"use client";

import { CloudUpload, FileUp, FolderUp } from "lucide-react";
import { useRef } from "react";

export default function DropZone({ isDragging, onDragOver, onDragLeave, onDrop, onFileUpload, onFolderUpload }) {
    const fileInputRef = useRef(null);
    const folderInputRef = useRef(null);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFolderClick = () => {
        folderInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        onFileUpload(e);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleFolderChange = (e) => {
        onFolderUpload(e);
        if (folderInputRef.current) folderInputRef.current.value = '';
    };

    return (
        <>
            <div
                className={`w-full max-w-4xl h-96 border-3 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all duration-300 bg-white/50 backdrop-blur-sm
            ${isDragging ? "border-teal-500 bg-teal-50/50 scale-[1.02]" : "border-gray-300 hover:border-teal-400"}`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg mb-6 animate-bounce-slow">
                    <CloudUpload className="text-white w-16 h-16" />
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Drop your content here or</h2>
                <p className="text-gray-500 mb-8">Support for images, videos, and documents</p>

                <div className="flex gap-4">
                    <button 
                        onClick={handleFileClick}
                        className="px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all flex items-center gap-2 font-medium text-gray-700"
                    >
                        <FileUp size={20} />
                        Upload files
                    </button>
                    <button 
                        onClick={handleFolderClick}
                        className="px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all flex items-center gap-2 font-medium text-gray-700"
                    >
                        <FolderUp size={20} />
                        Upload folder
                    </button>
                </div>

                {/* Hidden file inputs */}
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                />
                <input
                    ref={folderInputRef}
                    type="file"
                    webkitdirectory="true"
                    mozdirectory="true"
                    multiple
                    onChange={handleFolderChange}
                    className="hidden"
                />
            </div>
        </>
    );
}
