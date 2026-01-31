import React, { useState, useEffect } from 'react';

const InlineText = ({ value, onChange, className, style, tagName = 'span', readOnly, placeholder }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);

    useEffect(() => { setText(value); }, [value]);

    if (readOnly) {
        return React.createElement(tagName, { className, style }, value || placeholder);
    }

    if (isEditing) {
        return (
            <input
                autoFocus
                className="bg-white/50 outline-blue-500 outline outline-2 rounded min-w-[20px] px-1"
                style={{ ...style, width: 'auto', minWidth: '100%', height: 'auto', display: 'inline-block', color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', textAlign: 'inherit' }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={() => { setIsEditing(false); onChange(text); }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') { setIsEditing(false); onChange(text); }
                }}
                onClick={(e) => e.stopPropagation()}
            />
        );
    }

    return React.createElement(tagName, {
        className: `${className} hover:outline hover:outline-1 hover:outline-blue-200 cursor-text transition-all rounded px-1 -mx-1`,
        style: style,
        onDoubleClick: (e) => {
            e.stopPropagation();
            setIsEditing(true);
        }
    }, text || placeholder || 'Double click to edit');
};

export default InlineText;
