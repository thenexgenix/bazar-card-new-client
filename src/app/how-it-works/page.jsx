'use client';

import Link from 'next/link';
import { CreditCard, FileText, ShoppingBag, Truck, ArrowRight, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export default function HowItWorksPage() {
    const steps = [
        {
            number: '01',
            title: 'Choose Your Card',
            description: 'Select a grocery card tailored to your family size and duration preferences.',
            icon: CreditCard,
            color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        },
        {
            number: '02',
            title: 'Review Your Food Chart',
            description: 'Customize item quantities, swap items, and check your locked weekly menu chart.',
            icon: FileText,
            color: 'bg-teal-50 text-teal-600 border-teal-200',
        },
        {
            number: '03',
            title: 'Purchase Your Card',
            description: 'Pick your start date, delivery zone, and complete secure payment effortlessly.',
            icon: ShoppingBag,
            color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        },
        {
            number: '04',
            title: 'Receive Scheduled Deliveries',
            description: 'Sit back while fresh grocery boxes arrive at your doorstep according to schedule.',
            icon: Truck,
            color: 'bg-teal-50 text-teal-600 border-teal-200',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-16">

            {/* Standard Header Section matching Cards Header Design */}
            <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-100 mb-12">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Breadcrumb Navigation */}
                    <nav className="flex items-center space-x-2 text-xs font-bold text-slate-500">
                        <Link href="/" className="text-emerald-700 hover:underline">
                            Home
                        </Link>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                        <span className="text-slate-600">How It Works</span>
                    </nav>

                    {/* Center Content */}
                    <div className="text-center space-y-3 max-w-3xl mx-auto">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>GROCERY SUBSCRIPTION ENGINE</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
                            HOW BAZAAR CARD WORKS
                        </h1>

                        {/* Subtitle / Description */}
                        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
                            Get your family’s daily and monthly grocery needs organized in just 4 simple steps with locked-in chart transparency.
                        </p>
                    </div>

                </div>
            </section>

            <div className="max-w-5xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8">

                {/* 4 Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {steps.map((step, idx) => {
                        const IconComponent = step.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition duration-300 flex flex-col justify-between relative group"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${step.color}`}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <span className="text-2xl font-black text-slate-300 group-hover:text-emerald-600 transition">
                                            {step.number}
                                        </span>
                                    </div>

                                    <div className="space-y-1.5">
                                        <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition">
                                            {step.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[11px] font-bold text-emerald-600">
                                    <span>Step {idx + 1} of 4</span>
                                    <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-emerald-500" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Call To Action Banner */}
                <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="space-y-2 text-center sm:text-left relative z-10">
                        <h2 className="text-xl sm:text-2xl font-black">Ready to simplify your grocery shopping?</h2>
                        <p className="text-xs text-emerald-200/80 font-medium">Explore our curated cards or find the ideal plan for your household.</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
                        <Link
                            href="/cards"
                            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold transition shadow-md shadow-emerald-600/30 flex items-center gap-2"
                        >
                            Browse Subscription Cards <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}