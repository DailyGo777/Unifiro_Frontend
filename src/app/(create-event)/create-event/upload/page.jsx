"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import DropZone from "@/components/create-event/UploadSection/DropZone";
import FilesList from "@/components/create-event/UploadSection/FilesList";

export default function UploadPage() {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    // Load uploaded files from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('uploadedFiles');
        if (saved) {
            try {
                setUploadedFiles(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load uploaded files", e);
            }
        }
    }, []);

    // Save uploaded files to localStorage
    const saveFiles = (files) => {
        setUploadedFiles(files);
        localStorage.setItem('uploadedFiles', JSON.stringify(files));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const items = e.dataTransfer.items;
        if (items) {
            handleFiles(items);
        }
    };

    const handleFiles = (items) => {
        const newFiles = [];
        let processedCount = 0;

        // Process each item (file or folder)
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.kind === 'file') {
                const file = item.getAsFile();
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        newFiles.push({
                            id: Math.random().toString(36).substr(2, 9),
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            createdAt: new Date().toISOString(),
                            isFolder: false
                        });
                        processedCount++;
                        if (processedCount === items.length) {
                            saveFiles([...uploadedFiles, ...newFiles]);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            }
        }

        // If no files were found, save the empty array
        if (processedCount === 0 && items.length > 0) {
            saveFiles([...uploadedFiles, ...newFiles]);
        }
    };

    const handleFileUpload = (e) => {
        const files = e.target.files;
        if (files) {
            const newFiles = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                newFiles.push({
                    id: Math.random().toString(36).substr(2, 9),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    createdAt: new Date().toISOString(),
                    isFolder: false
                });
            }
            saveFiles([...uploadedFiles, ...newFiles]);
        }
    };

    const handleFolderUpload = (e) => {
        const files = e.target.files;
        if (files) {
            const newFiles = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const folderPath = file.webkitRelativePath || file.name;
                const folderName = folderPath.split('/')[0];
                
                newFiles.push({
                    id: Math.random().toString(36).substr(2, 9),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    folderPath: folderPath,
                    createdAt: new Date().toISOString(),
                    isFolder: false
                });
            }
            saveFiles([...uploadedFiles, ...newFiles]);
        }
    };

    const deleteFile = (id) => {
        const updated = uploadedFiles.filter(f => f.id !== id);
        saveFiles(updated);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="h-full flex flex-col justify-centerp-8 ml-25 animate-fade-in relative py-12 px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Content</h1>

            {/* Drop Zone Component */}
            <DropZone
                isDragging={isDragging}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onFileUpload={handleFileUpload}
                onFolderUpload={handleFolderUpload}
            />

            {/* Files List Component */}
            <FilesList
                uploadedFiles={uploadedFiles}
                onDelete={deleteFile}
                onClearAll={() => saveFiles([])}
                formatFileSize={formatFileSize}
            />

            {/* Navigation */}
            <div className="mt-auto w-full max-w-4xl flex justify-end pt-8">
                <Link href="/create-event/settings">
                    <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                        Continue to Settings
                        <ArrowRight size={20} />
                    </button>
                </Link>
            </div>
        </div>
    );
}
