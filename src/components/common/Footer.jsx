'use client'
import Link from 'next/link';
import Image from 'next/image';
import { Utensils, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation'

export default function Footer() {
    const pathName = usePathname();

    if (pathName.startsWith('/dashboard')) {
        return null;
    }
    return (
        <footer className="bg-emerald-950 text-emerald-100 pt-16 pb-12 border-t border-emerald-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

                    {/* Brand Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-full bg-white/10 border border-emerald-800">
                                <Image
                                    src="/logo.jpeg"
                                    alt="Bazaar Card Logo"
                                    fill
                                    className="object-cover w-10 h-10 rounded-full p-1"
                                />
                            </div>
                            <span className="font-bold text-xl tracking-wide text-white">
                                Bazaar <span className="text-emerald-400">Card</span>
                            </span>
                        </div>
                        <p className="text-emerald-200/80 text-sm text-justify w-full leading-relaxed">
                            To eliminate the decision fatigue of your family&apos;s daily meals, we have introduced a smart subscription grocery service. You choose the card, and we will handle the rest.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white text-base mb-4 tracking-wider">Quick Links</h4>
                        <ul className="space-y-2.5 text-sm text-emerald-200/80">
                            <li><Link href="/cards" className="hover:text-emerald-400 transition">Browse Packages</Link></li>
                            <li><Link href="/quiz" className="hover:text-emerald-400 transition">Find Your Card Quiz</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-emerald-400 transition">Pantry & Fresh Drops</Link></li>
                            <li><Link href="/faq" className="hover:text-emerald-400 transition">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Legal & Support */}
                    <div>
                        <h4 className="font-semibold text-white text-base mb-4 tracking-wider">Support & Legal</h4>
                        <ul className="space-y-2.5 text-sm text-emerald-200/80">
                            <li><Link href="/privacy" className="hover:text-emerald-400 transition">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-emerald-400 transition">Terms & Conditions</Link></li>
                            <li><Link href="/refund" className="hover:text-emerald-400 transition">Refund & Return Policy</Link></li>
                            <li><Link href="/contact" className="hover:text-emerald-400 transition">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-white text-base mb-4 tracking-wider">Get in Touch</h4>
                        <ul className="space-y-3 text-sm text-emerald-200/80">
                            <li className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                <span>Chattogram, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>+880 1700-000000</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>support@bazaarcard.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/60 gap-4">
                    <p>© {new Date().getFullYear()} BazaarCard. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Built with <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" /> for Bangladeshi Families
                    </p>
                </div>
            </div>
        </footer>
    );
}