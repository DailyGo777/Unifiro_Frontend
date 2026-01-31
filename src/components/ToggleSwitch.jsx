"use client";
import React from "react";

const ToggleSwitch = ({ isOn, onToggle }) => (
    <div
        onClick={onToggle}
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors relative ${isOn ? 'bg-teal-500' : 'bg-red-700'}`}
    >
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? 'translate-x-6' : 'translate-x-0'}`}></div>
        <span className={`absolute text-[10px] font-bold text-white left-1 transition-opacity duration-300 ${isOn ? 'opacity-0' : 'opacity-100'}`}>OFF</span>
        <span className={`absolute text-[10px] font-bold text-white right-1.5 transition-opacity duration-300 ${isOn ? 'opacity-100' : 'opacity-0'}`}>ON</span>
    </div>
);

export default ToggleSwitch;
