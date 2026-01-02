import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="relative w-full overflow-hidden">
            {/* Green Gradient Section with Links */}
            <div className="relative w-full">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <Image
                        src="/Footer.webp"
                        alt="Footer Background"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Logo and Tagline */}
                        <div>
                            <h3 className="text-5xl font-bold text-white mb-2">Unifiro</h3>
                            <p className="text-white/90 text-sm">Where moments spark memories</p>
                        </div>

                        {/* Platform Links */}
                        <div>
                            <h4 className="text-white font-bold text-lg mb-4">Platform</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="#" className="text-white/90 hover:text-white transition-colors">
                                        Discover Events
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white/90 hover:text-white transition-colors">
                                        Host an Event
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white/90 hover:text-white transition-colors">
                                        Sponsorships
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h4 className="text-white font-bold text-lg mb-4">Company</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="#" className="text-white/90 hover:text-white transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white/90 hover:text-white transition-colors">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white/90 hover:text-white transition-colors">
                                        Careers
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div>
                            <h4 className="text-white font-bold text-lg mb-4">Support</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="#" className="text-white/90 hover:text-white transition-colors">
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white/90 hover:text-white transition-colors">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white/90 hover:text-white transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* White Rounded Bottom Section */}
            <div className="relative -mt-16 w-full">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <Image
                        src="/footer 2.o .webp"
                        alt="Footer Bottom Background"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-800 text-sm font-medium">
                            © 2025 Ayojan. All rights reserved.
                        </p>
                        <p className="text-gray-800 text-sm font-medium">
                            Designed and Built by BrandAndBrandz
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
