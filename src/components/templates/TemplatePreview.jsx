import React from 'react';
import Renderer from './Renderer';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TemplatePreview = ({ items, properties, onRegister, onBack }) => {
    const bgColor = properties?.backgroundColor || '#ffffff';
    // Use useRouter if onBack is not provided
    const router = useRouter();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: bgColor }}>
            {/* Back Button Overlay */}
            <div className="fixed top-4 left-4 z-50">
                <button
                    onClick={handleBack}
                    className="p-2 bg-white/20 backdrop-blur-md border border-white/50 rounded-full text-gray-800 hover:bg-white/40 transition-all shadow-sm"
                >
                    <ArrowLeft size={20} />
                </button>
            </div>

            {/* Render Canvas Items absolutely positioned */}
            <div className="relative w-full min-h-screen max-w-[1920px] mx-auto">
                {items && items.map(item => (
                    <div
                        key={item.id}
                        style={{
                            position: 'absolute',
                            left: item.x,
                            top: item.y,
                            width: item.w,
                            height: item.h,
                            zIndex: item.type === 'image' ? 0 : 10
                        }}
                    >
                        <Renderer
                            item={item}
                            isPreview={true}
                            onUpdate={() => { }}
                            onRegister={onRegister}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplatePreview;
