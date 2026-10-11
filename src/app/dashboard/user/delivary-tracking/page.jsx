'use client';

import { useState } from 'react';
import {
    Truck, Calendar, Clock, MapPin, Phone, CheckCircle2,
    AlertCircle, FileText, Star, Filter, Upload, ChevronRight,
    Package, ShieldCheck, Check, Clock3, AlertTriangle, X
} from 'lucide-react';

export default function DeliveryTrackingPage() {
    // Demo State for Tracking & History
    const [upcomingDelivery, setUpcomingDelivery] = useState({
        date: "Tomorrow, 12 Oct 2026",
        slot: "Morning (8:00 AM - 10:00 AM)",
        instructions: "Please ring the calling bell twice and leave the box at the doorstep if no response.",
        isEditingInstructions: false,
        items: [
            { name: "Fresh Milk", qty: "2 Litres" },
            { name: "Organic Brown Eggs", qty: "1 Dozen" },
            { name: "Local Rice (Miniket)", qty: "5 kg" },
            { name: "Fresh Potatoes", qty: "2 kg" }
        ]
    });

    const [liveTracking, setLiveTracking] = useState({
        status: "Out for delivery", // Confirmed -> Preparing -> Out for delivery -> Delivered
        riderName: "Rahim Uddin",
        riderPhone: "+880 1712-345678",
        eta: "25 mins away (Approx. 9:15 AM)"
    });

    const [recentDelivered, setRecentDelivered] = useState({
        date: "10 Oct 2026, 9:30 AM",
        receivedBy: "Self (User)",
        proofType: "Photo Proof & OTP Verified",
        rating: 0
    });

    // History & Filters state
    const [historyFilterMonth, setHistoryFilterMonth] = useState("all");
    const [historyFilterStatus, setHistoryFilterStatus] = useState("all");

    const [deliveryHistory, setDeliveryHistory] = useState([
        { id: "DEL-1092", date: "10 Oct 2026", card: "Standard Family Pack", status: "Delivered", slot: "Morning" },
        { id: "DEL-1085", date: "08 Oct 2026", card: "Standard Family Pack", status: "Delivered", slot: "Morning" },
        { id: "DEL-1071", date: "05 Oct 2026", card: "Standard Family Pack", status: "Delayed", slot: "Evening" },
        { id: "DEL-1060", date: "01 Oct 2026", card: "Standard Family Pack", status: "Delivered", slot: "Morning" },
    ]);

    // Issue Modal State
    const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
    const [issueType, setIssueType] = useState("Missing item");
    const [issueDescription, setIssueDescription] = useState("");
    const [issueSubmitted, setIssueSubmitted] = useState(false);

    const handleSaveInstructions = (e) => {
        e.preventDefault();
        setUpcomingDelivery(prev => ({ ...prev, isEditingInstructions: false }));
    };

    const handleRating = (stars) => {
        setRecentDelivered(prev => ({ ...prev, rating: stars }));
    };

    const handleReportIssueSubmit = (e) => {
        e.preventDefault();
        setIssueSubmitted(true);
        setTimeout(() => {
            setIssueSubmitted(false);
            setIsIssueModalOpen(false);
            setIssueDescription("");
        }, 2000);
    };

    const filteredHistory = deliveryHistory.filter(item => {
        const matchesStatus = historyFilterStatus === 'all' || item.status.toLowerCase() === historyFilterStatus.toLowerCase();
        return matchesStatus;
    });

    return (
        <div className="max-w-7xl mx-auto space-y-8 py-6 px-4 sm:px-6">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-black text-slate-900">Delivery Tracking & History</h1>
                <p className="text-xs text-slate-500 mt-1">Track your upcoming grocery drop-offs, live rider timelines, and past delivery records.</p>
            </div>

            {/* 1. Upcoming Delivery Section */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-emerald-600" />
                        <h2 className="text-sm font-extrabold text-slate-900 uppercase">Upcoming Delivery</h2>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                        {upcomingDelivery.date}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                            <span className="font-bold text-slate-400 uppercase text-[10px]">Time Slot</span>
                            <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 mt-0.5">
                                <Clock className="w-4 h-4 text-emerald-600" /> {upcomingDelivery.slot}
                            </div>
                        </div>

                        {/* Editable Delivery Instructions */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-400 uppercase text-[10px]">Delivery Instructions</span>
                                {!upcomingDelivery.isEditingInstructions && (
                                    <button
                                        onClick={() => setUpcomingDelivery(prev => ({ ...prev, isEditingInstructions: true }))}
                                        className="text-[11px] font-extrabold text-emerald-600 hover:underline"
                                    >
                                        Edit Instructions
                                    </button>
                                )}
                            </div>

                            {!upcomingDelivery.isEditingInstructions ? (
                                <p className="text-slate-700 font-medium italic">{upcomingDelivery.instructions}</p>
                            ) : (
                                <form onSubmit={handleSaveInstructions} className="space-y-2 pt-1">
                                    <textarea
                                        rows={2}
                                        value={upcomingDelivery.instructions}
                                        onChange={(e) => setUpcomingDelivery(prev => ({ ...prev, instructions: e.target.value }))}
                                        className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-emerald-600"
                                    />
                                    <div className="flex gap-2">
                                        <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold">Save</button>
                                        <button
                                            type="button"
                                            onClick={() => setUpcomingDelivery(prev => ({ ...prev, isEditingInstructions: false }))}
                                            className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg font-bold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Items List for Upcoming Delivery */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                        <span className="font-bold text-slate-400 uppercase text-[10px] block">Scheduled Box Items ({upcomingDelivery.items.length})</span>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {upcomingDelivery.items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200">
                                    <span className="font-bold text-slate-800">{item.name}</span>
                                    <span className="text-emerald-700 font-extrabold">{item.qty}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Out for Delivery & Live Status Timeline */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-emerald-600" />
                        <h2 className="text-sm font-extrabold text-slate-900 uppercase">Live Delivery Timeline</h2>
                    </div>
                    <span className="text-xs font-extrabold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        {liveTracking.status}
                    </span>
                </div>

                {/* Status Timeline Steps */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
                    <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                        <div className="font-extrabold text-emerald-900">1. Confirmed</div>
                        <div className="text-[10px] text-emerald-700">Slot booked successfully</div>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                        <div className="font-extrabold text-emerald-900">2. Preparing</div>
                        <div className="text-[10px] text-emerald-700">Pantry & fresh collection</div>
                    </div>
                    <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-md space-y-1">
                        <Truck className="w-5 h-5 text-white mx-auto animate-bounce" />
                        <div className="font-extrabold">3. Out for Delivery</div>
                        <div className="text-[10px] text-emerald-100">{liveTracking.eta}</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-slate-400">
                        <Clock3 className="w-5 h-5 mx-auto" />
                        <div className="font-extrabold">4. Delivered</div>
                        <div className="text-[10px]">Pending verification</div>
                    </div>
                </div>

                {/* Rider Info Card */}
                <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-sm">
                            RU
                        </div>
                        <div>
                            <span className="font-bold text-slate-400 uppercase text-[10px] block">Assigned Rider</span>
                            <div className="font-black text-slate-900 text-sm">{liveTracking.riderName}</div>
                            <div className="text-emerald-700 font-medium">Estimated Arrival: {liveTracking.eta}</div>
                        </div>
                    </div>
                    <a
                        href={`tel:${liveTracking.riderPhone}`}
                        className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-extrabold hover:bg-emerald-700 transition flex items-center gap-2 shadow-sm"
                    >
                        <Phone className="w-4 h-4" /> Call Rider ({liveTracking.riderPhone})
                    </a>
                </div>
            </div>

            {/* 3. Delivered Section & Rating Flow */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-sm font-extrabold text-slate-900 uppercase">Recent Delivered Box</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                        <span className="font-bold text-slate-400 uppercase text-[10px]">Delivery Summary</span>
                        <div className="text-slate-800 font-medium">Delivered at: <strong className="text-slate-900">{recentDelivered.date}</strong></div>
                        <div className="text-slate-800 font-medium">Received by: <strong className="text-slate-900">{recentDelivered.receivedBy}</strong></div>
                        <div className="text-emerald-700 font-bold flex items-center gap-1 pt-1">
                            <ShieldCheck className="w-4 h-4" /> Proof: {recentDelivered.proofType}
                        </div>
                    </div>

                    {/* Rate this delivery */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                        <div>
                            <span className="font-bold text-slate-400 uppercase text-[10px]">Feedback</span>
                            <h3 className="font-black text-slate-900 text-sm mt-0.5">Rate this delivery experience</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => handleRating(star)}
                                    className="p-1 focus:outline-none transition hover:scale-110"
                                >
                                    <Star className={`w-6 h-6 ${recentDelivered.rating >= star ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                                </button>
                            ))}
                            {recentDelivered.rating > 0 && (
                                <span className="ml-2 font-extrabold text-emerald-700 text-xs">Thanks for rating!</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. History & Filters */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        <h2 className="text-sm font-extrabold text-slate-900 uppercase">Delivery History</h2>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-2 text-xs">
                        <Filter className="w-3.5 h-3.5 text-slate-400" />
                        <select
                            value={historyFilterStatus}
                            onChange={(e) => setHistoryFilterStatus(e.target.value)}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 focus:outline-none"
                        >
                            <option value="all">All Status</option>
                            <option value="delivered">Delivered</option>
                            <option value="delayed">Delayed</option>
                        </select>
                        <button
                            onClick={() => setIsIssueModalOpen(true)}
                            className="px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 font-extrabold rounded-xl hover:bg-rose-100 transition ml-2"
                        >
                            Report an Issue
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {filteredHistory.map((item) => (
                        <div key={item.id} className="py-3.5 flex items-center justify-between text-xs">
                            <div>
                                <div className="font-black text-slate-900">{item.card} <span className="text-slate-400 font-normal">({item.id})</span></div>
                                <div className="text-slate-500 mt-0.5">{item.date} · Slot: {item.slot}</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${item.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                    }`}>
                                    {item.status}
                                </span>
                                <button
                                    onClick={() => setIsIssueModalOpen(true)}
                                    className="text-slate-400 hover:text-rose-600 font-bold"
                                    title="Report issue for this order"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. Issue Flow Modal (Missing item, Quality issue with photo, Late, Wrong item) */}
            {isIssueModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-rose-600" /> Report Delivery Issue
                            </h3>
                            <button onClick={() => setIsIssueModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {issueSubmitted ? (
                            <div className="py-8 text-center space-y-2">
                                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                                <h4 className="font-extrabold text-slate-900">Issue Reported Successfully!</h4>
                                <p className="text-xs text-slate-500">Our customer support team will review and resolve this within our SLA timeframe.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleReportIssueSubmit} className="space-y-4 text-xs">
                                <div className="space-y-1.5">
                                    <label className="font-bold text-slate-700 block">Select Issue Category:</label>
                                    <select
                                        value={issueType}
                                        onChange={(e) => setIssueType(e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-800 bg-white focus:outline-none focus:border-emerald-600"
                                    >
                                        <option value="Missing item">Missing item</option>
                                        <option value="Quality issue">Quality issue (Damaged / Spoiled)</option>
                                        <option value="Late">Late Delivery</option>
                                        <option value="Wrong item">Wrong item delivered</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="font-bold text-slate-700 block">Describe the Issue:</label>
                                    <textarea
                                        rows={3}
                                        required
                                        placeholder="Please provide details about the problem..."
                                        value={issueDescription}
                                        onChange={(e) => setIssueDescription(e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-800 focus:outline-none focus:border-emerald-600 resize-none"
                                    />
                                </div>

                                {issueType === 'Quality issue' && (
                                    <div className="space-y-1.5">
                                        <label className="font-bold text-slate-700 block">Upload Photo Proof:</label>
                                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition cursor-pointer">
                                            <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                                            <span className="text-[11px] text-slate-500 font-semibold">Click to upload or drag & drop item photo</span>
                                        </div>
                                    </div>
                                )}

                                {/* SLA Notice */}
                                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-medium flex items-start gap-2">
                                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                    <span><strong>SLA Notice:</strong> All reported delivery issues are investigated and resolved with replacement or refund within <strong>24 hours</strong>.</span>
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsIssueModalOpen(false)}
                                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
                                    >
                                        Submit Report
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}