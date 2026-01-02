'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="w-full border-b-2 border-[#FE9A0D]/40 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <nav className="flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto w-full">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href="/" className="block hover:opacity-80 transition-opacity">
                        <Image
                            src="/Logo.webp"
                            alt="Unifiro Logo"
                            width={140}
                            height={45}
                            className="h-auto w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-10">
                    <Link
                        href="#"
                        className="relative text-gray-800 hover:text-[#20B3BC] transition-colors font-semibold text-base group"
                    >
                        Discover Events
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#20B3BC] to-[#13C998] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link
                        href="#"
                        className="relative text-gray-800 hover:text-[#20B3BC] transition-colors font-semibold text-base group"
                    >
                        Host an Event
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#20B3BC] to-[#13C998] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link
                        href="#"
                        className="relative text-gray-800 hover:text-[#20B3BC] transition-colors font-semibold text-base group"
                    >
                        About
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#20B3BC] to-[#13C998] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link
                        href="#"
                        className="relative text-gray-800 hover:text-[#20B3BC] transition-colors font-semibold text-base group"
                    >
                        Contact
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#20B3BC] to-[#13C998] group-hover:w-full transition-all duration-300"></span>
                    </Link>

                    {/* CTA Button */}
                    <Link
                        href="#"
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#20B3BC] to-[#13C998] text-white font-bold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-gray-800 hover:text-[#20B3BC] transition-colors p-2"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-[#FE9A0D]/20 bg-white">
                    <div className="px-6 py-4 space-y-4">
                        <Link
                            href="#"
                            className="block text-gray-800 hover:text-[#20B3BC] transition-colors font-semibold text-base py-2"
                        >
                            Discover Events
                        </Link>
                        <Link
                            href="#"
                            className="block text-gray-800 hover:text-[#20B3BC] transition-colors font-semibold text-base py-2"
                        >
                            Host an Event
                        </Link>
                        <Link
                            href="#"
                            className="block text-gray-800 hover:text-[#20B3BC] transition-colors font-semibold text-base py-2"
                        >
                            About
                        </Link>
                        <Link
                            href="#"
                            className="block text-gray-800 hover:text-[#20B3BC] transition-colors font-semibold text-base py-2"
                        >
                            Contact
                        </Link>
                        <Link
                            href="#"
                            className="block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-[#20B3BC] to-[#13C998] text-white font-bold text-sm hover:shadow-lg transition-all"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
