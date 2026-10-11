'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Construction, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs">

                {/* Visual Icon / Illustration */}
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200">
                    <ShoppingBag className="w-10 h-10 text-emerald-600 opacity-40" />
                    <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                        404
                    </span>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                        Page Not Found
                    </h1>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Sorry, the page you are looking for doesn&apos;t exist or has been moved to another URL.
                    </p>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
                    >
                        <Home className="w-4 h-4" />
                        <span>Back to Home</span>
                    </Link>
                </div>

                {/* Sub-note as requested */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400">
                    <Construction className="w-3.5 h-3.5 text-amber-500" />
                    <span>Will be designed soon</span>
                </div>

            </div>
        </div>
    );
}