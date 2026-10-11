'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function HeroBanner() {
    
    const bannerImages = [
        {
            id: 1,
            image: '/images/banner-1.avif',
            title: 'Family Standard Card',
            subtitle: '30-Day Complete Grocery & Meal Plan'
        },
        {
            id: 2,
            image: '/images/banner-2.webp',
            title: 'Pantry & Fresh Drops',
            subtitle: 'Delivered directly to your doorstep'
        },
        {
            id: 3,
            image: '/images/banner-3.png',
            title: 'Zero Decision Fatigue',
            subtitle: 'Choose your card, relax and enjoy'
        }
    ];

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-white py-16 lg:py-24">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-10 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Side: Text and Buttons (7 Columns) */}
                    <div className="lg:col-span-7 space-y-6 text-left">

                        {/* Badge */}
                        <div className="inline-flex items-center space-x-2 bg-emerald-100/80 border border-emerald-200 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
                            <Sparkles className="h-4 w-4 text-emerald-700 animate-pulse" />
                            <span>Smart Subscription Grocery Service</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                            Your Family’s Monthly Grocery, <span className="text-emerald-700">Planned & Delivered.</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                            Pick a card for your family size. See exactly what you’ll receive each day. We deliver to your door on a fixed schedule.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                            <Link
                                href="/quiz"
                                className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-700/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-base group"
                            >
                                <span>Explore Cards</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/cards"
                                className="bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-700 font-semibold px-8 py-4 rounded-2xl transition-all flex items-center justify-center text-base shadow-sm"
                            >
                                View Food Cards
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/80 text-sm text-slate-600 font-medium">
                            <div className="flex items-center space-x-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                <span>30-Day Food Chart</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                <span>Pantry & Fresh Drops</span>
                            </div>
                            <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                <span>Skip & Swap Flexibility</span>
                            </div>
                        </div>

                    </div>

                    {/* Right Side: Swiper Image Slider (5 Columns) */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-emerald-950 aspect-[4/5]">

                            <Swiper
                                modules={[Autoplay, Pagination]}
                                autoplay={{ delay: 3500, disableOnInteraction: false }}
                                pagination={{ clickable: true }}
                                loop={true}
                                className="w-full h-full rounded-2xl"
                            >
                                {bannerImages.map((item) => (
                                    <SwiperSlide key={item.id} className="relative w-full h-full flex items-end">
                                        {/* Placeholder image ba actual image jekono ekta use korte paren. 
                        Public folder-e image na thakleUnsplash er food delivery/grocery image fallback hisebe use kora holo */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent z-10" />

                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="absolute inset-0 object-cover object-right transform hover:scale-105 transition-transform duration-700"
                                        />

                                        {/* Slide Caption Overlay */}
                                        <div className="relative z-20 p-6 sm:p-8 text-white space-y-2">
                                            <span className="bg-emerald-600/90 backdrop-blur-md text-emerald-50 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                                                Featured Card
                                            </span>
                                            <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                                            <p className="text-emerald-200 text-sm">{item.subtitle}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        </div>

                        {/* Floating Decorative Card Tag */}
                        <div className="absolute -bottom-6 -left-6 bg-white border border-emerald-100 rounded-2xl p-4 shadow-xl z-30 hidden sm:flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                                ⭐
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">Trusted by</p>
                                <p className="text-sm font-bold text-slate-800">500+ Families Bangladesh</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}