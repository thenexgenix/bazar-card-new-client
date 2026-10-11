'use client';

import { useState, useEffect } from 'react';
import { getUserSubscriptionsApi } from '@/lib/api/cardSubscription';
import { updateSubscriptionDate, updateSubscriptionStatus, paySubscription } from '@/lib/action/cardSubscriptions';
import { authClient } from '@/lib/auth-client';
import { Calendar, Users, FileText, RefreshCw, ArrowUpRight, UserPlus, Gift, PauseCircle, CheckCircle, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function MySubscriptionsPage() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingDateId, setEditingDateId] = useState(null);
    const [newStartDate, setNewStartDate] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        async function fetchSubs() {
            if (user?.id) {
                const res = await getUserSubscriptionsApi(user.id);
                if (res?.success) {
                    setSubscriptions(res.data);
                }
            }
            setLoading(false);
        }
        fetchSubs();
    }, [user]);

    const handleDateUpdate = async (subId) => {
        if (!newStartDate) return;
        setActionLoading(true);
        const res = await updateSubscriptionDate(subId, newStartDate);
        if (res?.success) {
            setSubscriptions(subs => subs.map(s => s._id === subId ? { ...s, startDate: newStartDate } : s));
            setEditingDateId(null);
        }
        setActionLoading(false);
    };

    const handleStatusChange = async (subId, status) => {
        setActionLoading(true);
        const res = await updateSubscriptionStatus(subId, status);
        if (res?.success) {
            setSubscriptions(subs => subs.map(s => s._id === subId ? { ...s, status } : s));
        }
        setActionLoading(false);
    };

    const handlePayment = async (subId) => {
        setActionLoading(true);
        const res = await paySubscription(subId);
        if (res?.success) {
            setSubscriptions(subs => subs.map(s => s._id === subId ? { ...s, paymentStatus: 'paid' } : s));
        }
        setActionLoading(false);
    };

    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center text-xs font-bold text-slate-500">Loading your subscriptions...</div>;
    }

    const activeSubscriptions = subscriptions.filter(s => s.status === 'active' || s.status === 'paused');
    const pastSubscriptions = subscriptions.filter(s => s.status === 'completed' || s.status === 'expired' || s.status === 'cancelled');

    return (
        <div className="max-w-7xl mx-auto space-y-8 py-6 px-4 sm:px-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900">My Subscriptions</h1>
                <p className="text-xs text-slate-500 mt-1">Manage your active family meal plans, delivery dates, and subscription preferences.</p>
            </div>

            {/* Active Subscriptions Section */}
            <div className="space-y-4">
                <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Active Package</h2>

                {activeSubscriptions.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                        <p className="text-xs font-semibold text-slate-500">You do not have any active subscriptions right now.</p>
                        <Link href="/cards" className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition">
                            Browse Subscription Cards
                        </Link>
                    </div>
                ) : (
                    activeSubscriptions.map((sub, idx) => (
                        <div key={sub._id || idx} className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-xs space-y-6">

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                                <div>
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold rounded-full border border-emerald-200 uppercase tracking-wider">
                                        {sub.status === 'paused' ? 'Paused Plan' : 'Active Subscription'}
                                    </span>
                                    <h3 className="text-xl font-black text-slate-900 mt-2">{sub.cardName}</h3>
                                </div>
                                <div className="text-right flex items-center gap-4">
                                    <div>
                                        <div className="text-lg font-black text-emerald-700">৳{sub.price}</div>
                                        <div className="text-xs text-slate-500 font-medium">{sub.durationDays} Days Package</div>
                                    </div>
                                    {/* Payment status badge or Pay button on top right */}
                                    {sub.paymentStatus === 'paid' ? (
                                        <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-extrabold flex items-center gap-1">
                                            <CheckCircle className="w-3.5 h-3.5" /> Paid
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => handlePayment(sub._id)}
                                            disabled={actionLoading}
                                            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-extrabold hover:bg-emerald-700 transition shadow-sm flex items-center gap-1.5"
                                        >
                                            <CreditCard className="w-3.5 h-3.5" /> Pay Now
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">

                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                                    <span className="font-bold text-slate-400 uppercase text-[10px]">Payment Status</span>
                                    {sub.paymentStatus === 'paid' ? (
                                        <div className="flex items-center gap-1.5 font-extrabold text-emerald-700">
                                            <CheckCircle className="w-4 h-4" /> Paid & Secured
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between font-extrabold text-amber-600">
                                            <span>Payment Pending</span>
                                            <button
                                                onClick={() => handlePayment(sub._id)}
                                                className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold hover:bg-emerald-700"
                                            >
                                                Pay ৳{sub.price}
                                            </button>
                                        </div>
                                    )}
                                    <div className="text-slate-600 font-medium pt-1">Zone: {sub.deliveryZone}</div>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                                    <span className="font-bold text-slate-400 uppercase text-[10px]">Start Date (Editable)</span>
                                    <div className="flex items-center justify-between font-bold text-slate-800">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald-600" /> {sub.startDate}</span>
                                        {editingDateId !== sub._id ? (
                                            <button onClick={() => setEditingDateId(sub._id)} className="text-[11px] font-extrabold text-emerald-600 hover:underline">
                                                Change
                                            </button>
                                        ) : null}
                                    </div>
                                    {editingDateId === sub._id && (
                                        <div className="flex items-center gap-2 pt-2">
                                            <input
                                                type="date"
                                                value={newStartDate}
                                                onChange={(e) => setNewStartDate(e.target.value)}
                                                className="px-2 py-1 rounded-lg border border-slate-300 bg-white text-xs font-medium"
                                            />
                                            <button
                                                onClick={() => handleDateUpdate(sub._id)}
                                                disabled={actionLoading}
                                                className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                                    <span className="font-bold text-slate-400 uppercase text-[10px]">Family & Diet</span>
                                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                                        <Users className="w-3.5 h-3.5 text-emerald-600" /> Standard Household Pack
                                    </div>
                                    <div className="text-[11px] text-slate-500 font-medium">Standard Dietary Customizations Applied</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-emerald-600" />
                                    <span className="text-xs font-bold text-slate-800">Assigned Food Chart & Item Allocations</span>
                                </div>
                                <Link href={`/cards/${sub.cardId}`} className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                                    View my chart <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                                <button className="px-3 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition flex items-center gap-1.5">
                                    <RefreshCw className="w-3.5 h-3.5" /> Renew / Extend
                                </button>
                                <button className="px-3 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition flex items-center gap-1.5">
                                    <ArrowUpRight className="w-3.5 h-3.5" /> Upgrade Plan
                                </button>
                                <button className="px-3 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition flex items-center gap-1.5">
                                    <UserPlus className="w-3.5 h-3.5" /> Add Member
                                </button>
                                <button className="px-3 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition flex items-center gap-1.5">
                                    <Gift className="w-3.5 h-3.5" /> Gift a Card
                                </button>
                                {sub.status === 'paused' ? (
                                    <button
                                        onClick={() => handleStatusChange(sub._id, 'active')}
                                        className="px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition flex items-center gap-1.5 ml-auto"
                                    >
                                        Resume Plan
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleStatusChange(sub._id, 'paused')}
                                        className="px-3 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl text-xs font-bold hover:bg-amber-100 transition flex items-center gap-1.5 ml-auto"
                                    >
                                        <PauseCircle className="w-3.5 h-3.5" /> Pause Plan
                                    </button>
                                )}
                            </div>

                        </div>
                    ))
                )}
            </div>

            {/* Past Subscriptions History Section */}
            <div className="space-y-4 pt-6">
                <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Past Subscriptions History</h2>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                    {pastSubscriptions.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-400 font-medium">No past subscription history found.</div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {pastSubscriptions.map((past, i) => (
                                <div key={i} className="p-4 sm:p-5 flex items-center justify-between text-xs hover:bg-slate-50 transition">
                                    <div>
                                        <div className="font-bold text-slate-900">{past.cardName}</div>
                                        <div className="text-slate-500 mt-0.5">Duration: {past.durationDays} Days | ৳{past.price}</div>
                                    </div>
                                    <div>
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${past.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                                past.status === 'expired' ? 'bg-slate-100 text-slate-600 border border-slate-200' :
                                                    'bg-rose-50 text-rose-700 border border-rose-200'
                                            }`}>
                                            {past.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}