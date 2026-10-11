'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Package, Calendar, Clock, ShoppingCart, Truck, Bell,
    ArrowRight, RefreshCw, AlertTriangle, CheckCircle,
    Phone, ChevronRight, Repeat, ShieldAlert, Sparkles
} from 'lucide-react';

export default function DashboardOverviewPage() {
    // Demo data representing various states (Active card, alerts, deliveries, etc.)
    const [dashboardState, setDashboardState] = useState({
        hasActiveCard: true,
        isPaused: false,
        paymentPending: false,
        daysRemaining: 18,
        totalDays: 30,
        currentDay: 12,
        activeCardName: "Standard Family Pack",
        familySize: "4 members (2 Adults + 2 Kids)",
        endDate: "28 Oct 2026",
        nextDelivery: {
            date: "Tomorrow, 12 Oct",
            slot: "Morning (8:00 AM - 10:00 AM)",
            visitType: "Pantry + Fresh Items",
            countdown: "In 16 hours",
            status: "Preparing" // Scheduled / Preparing / Out for delivery / Delivered
        },
        todayItems: [
            { name: "Fresh Milk", quantity: "2 Litres", swapped: false },
            { name: "Organic Eggs", quantity: "1 Dozen", swapped: false },
            { name: "Local Rice (Miniket)", quantity: "5 kg", swapped: false },
            { name: "Fresh Potatoes", quantity: "2 kg", swapped: false }
        ],
        alerts: [
            { id: 1, type: "substitution", message: "Tomatoes replaced with local organic variety due to quality check.", actionText: "View Details" },
            { id: 2, type: "warning", message: "Your subscription card is ending soon (18 days left).", actionText: "Renew Now" }
        ],
        totalOrdersCount: 4,
        deliveriesReceived: 12
    });

    const handleSwapItem = (index) => {
        const updated = [...dashboardState.todayItems];
        updated[index].swapped = !updated[index].swapped;
        setDashboardState({ ...dashboardState, todayItems: updated });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 py-6 px-4 sm:px-6">

            {/* Top Welcome & Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div>
                    <h1 className="text-2xl font-black text-slate-900">Dashboard Overview</h1>
                    <p className="text-xs text-slate-500 mt-1">Welcome back! Here is your daily grocery subscription summary and live delivery status.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/cards" className="px-4 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-extrabold hover:bg-emerald-100 transition flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" /> Browse More Cards
                    </Link>
                </div>
            </div>

            {/* Edge State / Alert Banners */}
            {dashboardState.paymentPending && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between text-xs text-rose-800">
                    <div className="flex items-center gap-2 font-bold">
                        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>Payment pending for your current billing cycle.</span>
                    </div>
                    <button className="px-4 py-2 bg-rose-600 text-white rounded-xl font-extrabold hover:bg-rose-700 transition">
                        Complete payment
                    </button>
                </div>
            )}

            {dashboardState.isPaused && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between text-xs text-amber-900">
                    <div className="flex items-center gap-2 font-bold">
                        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>Your subscription card is currently paused. Deliveries are on hold.</span>
                    </div>
                    <button
                        onClick={() => setDashboardState(prev => ({ ...prev, isPaused: false }))}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-extrabold hover:bg-emerald-700 transition"
                    >
                        Resume Button
                    </button>
                </div>
            )}

            {/* Main Grid Content */}
            {!dashboardState.hasActiveCard ? (
                // Empty State
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                    <Package className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h2 className="text-lg font-bold text-slate-900">No active card found</h2>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">You haven&apos;t subscribed to any grocery cards yet. Choose your first card to get fresh daily essentials delivered to your doorstep.</p>
                    <Link href="/cards" className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-extrabold hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20">
                        Choose your first card
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column (Main Active Card & Widgets) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. Active Card Banner */}
                        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-6 text-white shadow-lg space-y-6 relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10">
                                <Package className="w-64 h-64 text-white" />
                            </div>
                            <div className="flex items-start justify-between relative z-10">
                                <div>
                                    <span className="px-3 py-1 bg-emerald-600/50 backdrop-blur-md text-emerald-100 text-[10px] font-extrabold rounded-full border border-emerald-500/30 uppercase tracking-wider">
                                        Active Plan
                                    </span>
                                    <h2 className="text-2xl font-black mt-2">{dashboardState.activeCardName}</h2>
                                    <p className="text-xs text-emerald-200/80 mt-1">{dashboardState.familySize}</p>
                                </div>
                                <Link href="/dashboard/user/my-card" className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold transition flex items-center gap-1.5">
                                    View card <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            {/* Progress bar */}
                            <div className="space-y-2 relative z-10 pt-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-emerald-300">Day {dashboardState.currentDay} of {dashboardState.totalDays}</span>
                                    <span className="text-emerald-200">{Math.round((dashboardState.currentDay / dashboardState.totalDays) * 100)}% Completed</span>
                                </div>
                                <div className="w-full h-2.5 bg-emerald-950/60 rounded-full overflow-hidden p-0.5 border border-emerald-700/30">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full transition-all duration-500"
                                        style={{ width: `${(dashboardState.currentDay / dashboardState.totalDays) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Next Delivery Widget */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-2">
                                    <Truck className="w-5 h-5 text-emerald-600" />
                                    <h3 className="text-sm font-extrabold text-slate-900 uppercase">Next Delivery</h3>
                                </div>
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                                    {dashboardState.nextDelivery.countdown}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                                    <span className="font-bold text-slate-400 uppercase text-[10px]">Date & Slot</span>
                                    <div className="font-extrabold text-slate-900 mt-1">{dashboardState.nextDelivery.date}</div>
                                    <div className="text-slate-500">{dashboardState.nextDelivery.slot}</div>
                                </div>
                                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                                    <span className="font-bold text-slate-400 uppercase text-[10px]">Visit Type</span>
                                    <div className="font-extrabold text-slate-900 mt-1">{dashboardState.nextDelivery.visitType}</div>
                                    <div className="text-emerald-700 font-medium">Scheduled & Packed</div>
                                </div>
                                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                                    <span className="font-bold text-slate-400 uppercase text-[10px]">Status</span>
                                    <div className="font-extrabold text-amber-600 flex items-center gap-1 mt-1">
                                        <Clock className="w-3.5 h-3.5" /> {dashboardState.nextDelivery.status}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <button className="px-3.5 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition">
                                    Reschedule
                                </button>
                                <button className="px-3.5 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition">
                                    Skip this slot
                                </button>
                                <button className="px-3.5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition ml-auto">
                                    Track Delivery
                                </button>
                            </div>
                        </div>

                        {/* 3. Today's Food/Grocery List */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5 text-emerald-600" />
                                    <h3 className="text-sm font-extrabold text-slate-900 uppercase">Today’s Food & Grocery List</h3>
                                </div>
                                <Link href="/dashboard/subscriptions" className="text-xs font-extrabold text-emerald-700 hover:underline">
                                    View full chart
                                </Link>
                            </div>
                            <div className="space-y-2">
                                {dashboardState.todayItems.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
                                        <div className="flex items-center gap-2.5">
                                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                                            <div>
                                                <span className="font-bold text-slate-900">{item.name}</span>
                                                <span className="text-slate-500 ml-2 font-medium">({item.quantity})</span>
                                                {item.swapped && <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">Swapped</span>}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleSwapItem(idx)}
                                            className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition flex items-center gap-1"
                                        >
                                            <Repeat className="w-3 h-3 text-emerald-600" /> Swap item
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Sidebar Widgets: Remaining Days, Delivery Status, Total Orders, Alerts) */}
                    <div className="space-y-6">

                        {/* Remaining Days Widget */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                                <Calendar className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-sm font-extrabold text-slate-900 uppercase">Remaining Days</h3>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-slate-900">{dashboardState.daysRemaining} days left</div>
                                <p className="text-xs text-slate-500 mt-1">Package expires on <strong className="text-slate-700">{dashboardState.endDate}</strong></p>
                            </div>
                            {dashboardState.daysRemaining <= 7 && (
                                <button className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-extrabold hover:bg-emerald-700 transition shadow-sm">
                                    Renew Package
                                </button>
                            )}
                        </div>

                        {/* Delivery Status & Rider Widget */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                                <Truck className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-sm font-extrabold text-slate-900 uppercase">Live Delivery Status</h3>
                            </div>
                            <div className="space-y-3 text-xs">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-slate-600">Current Status:</span>
                                    <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-extrabold uppercase">
                                        Preparing
                                    </span>
                                </div>
                                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-slate-800">Assigned Rider:</span>
                                        <span className="text-slate-600 font-medium">Rahim Uddin</span>
                                    </div>
                                    <button className="w-full py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-bold hover:bg-emerald-100 transition flex items-center justify-center gap-1.5">
                                        <Phone className="w-3.5 h-3.5 text-emerald-600" /> Call Rider
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Total Orders Widget */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                                <Package className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-sm font-extrabold text-slate-900 uppercase">Total Orders & Deliveries</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                                    <span className="text-2xl font-black text-slate-900">{dashboardState.totalOrdersCount}</span>
                                    <span className="block text-[11px] text-slate-500 font-bold uppercase mt-1">Active Cards</span>
                                </div>
                                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                                    <span className="text-2xl font-black text-emerald-700">{dashboardState.deliveriesReceived}</span>
                                    <span className="block text-[11px] text-slate-500 font-bold uppercase mt-1">Deliveries Done</span>
                                </div>
                            </div>
                        </div>

                        {/* Alerts & Notifications Widget */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                                <Bell className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-sm font-extrabold text-slate-900 uppercase">Alerts & Notices</h3>
                            </div>
                            <div className="space-y-3">
                                {dashboardState.alerts.map((alert) => (
                                    <div key={alert.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                                        <p className="font-semibold text-slate-700 leading-relaxed">{alert.message}</p>
                                        <button className="text-[11px] font-extrabold text-emerald-700 hover:underline flex items-center gap-1">
                                            {alert.actionText} <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            )}
        </div>
    );
}