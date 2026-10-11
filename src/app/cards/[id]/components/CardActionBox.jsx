'use client';

import { useState } from 'react';
import { ShieldCheck, Calendar as CalendarIcon, CheckCircle2, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { cardSubscription } from '@/lib/action/cardSubscriptions';

export default function CardActionBox({ card }) {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const defaultPlan = card.plans?.find(p => p.durationDays === 30) || card.plans?.[0];

    const [selectedDuration, setSelectedDuration] = useState(defaultPlan?.durationDays || 30);
    const [startDate, setStartDate] = useState('');
    const [deliveryZone, setDeliveryZone] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const activePlan = card.plans?.find(p => p.durationDays === Number(selectedDuration)) || defaultPlan;

    const handleSelectCard = async () => {
        setError('');
        setSuccessMessage('');

        if (!user) {
            setError('Please login first to subscribe to this card.');
            return;
        }

        if (!startDate) {
            setError('Please select a start date.');
            return;
        }
        if (!deliveryZone.trim()) {
            setError('Please enter your delivery zone/area.');
            return;
        }

        try {
            setLoading(true);
            const subscriptionPayload = {
                cardId: card._id || card.id,
                cardName: card.name,
                durationDays: activePlan.durationDays,
                price: activePlan.price,
                startDate,
                deliveryZone,
                userId: user.id,
                userEmail: user.email,
                userName: user.name
            };

            const result = await cardSubscription(subscriptionPayload);

            if (result && (result.success || result.ok)) {
                setSuccessMessage('Card successfully selected and added to your Dashboard (My Cards)!');
            } else {
                throw new Error(result?.message || 'Failed to subscribe card.');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 via-emerald-50/20 to-white rounded-2xl p-5 border border-emerald-200/60 shadow-xs flex flex-col justify-between space-y-5">
            <div className="space-y-4">
                <div className="flex items-baseline justify-between border-b border-slate-200 pb-3">
                    <span className="text-xs font-extrabold text-slate-400 uppercase">Total Package Price</span>
                    <div className="text-2xl font-black text-emerald-700">
                        ৳{activePlan?.price || 0} <span className="text-[11px] font-medium text-slate-500">/{activePlan?.durationDays || 30} days</span>
                    </div>
                </div>

                {/* Duration Radio Options */}
                <div className="space-y-2">
                    <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Select Duration Plan:</span>
                    <div className="flex flex-wrap gap-2">
                        {card.plans?.map((plan, idx) => (
                            <label key={idx} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition ${Number(selectedDuration) === plan.durationDays
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-500'
                                }`}>
                                <input
                                    type="radio"
                                    name="durationPlan"
                                    value={plan.durationDays}
                                    checked={Number(selectedDuration) === plan.durationDays}
                                    onChange={(e) => setSelectedDuration(Number(e.target.value))}
                                    className="accent-emerald-600 hidden"
                                />
                                <span>{plan.durationDays} Days (৳{plan.price})</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-3 text-xs">
                    {/* Calendar Date Field */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 font-bold text-slate-700">
                            <CalendarIcon className="w-3.5 h-3.5 text-emerald-600" /> Start Date:
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition shadow-xs cursor-pointer"
                        />
                    </div>

                    {/* Delivery Zone Field */}
                    <div className="space-y-1.5">
                        <label className="block font-bold text-slate-700">Delivery Zone / Area:</label>
                        <input
                            type="text"
                            value={deliveryZone}
                            onChange={(e) => setDeliveryZone(e.target.value)}
                            placeholder="e.g. Gulshan, Dhanmondi..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 bg-white font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition shadow-xs"
                        />
                    </div>
                </div>

                {/* Error & Success Alerts */}
                {error && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
                        {error}
                    </div>
                )}
                {successMessage && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{successMessage}</span>
                    </div>
                )}
            </div>

            <div className="space-y-2 pt-2">
                <button
                    onClick={handleSelectCard}
                    disabled={loading}
                    className="w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-extrabold hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{loading ? 'Processing...' : 'Select This Card'}</span>
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-700 font-bold pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Chart-Lock Guarantee ✓
                </div>
            </div>
        </div>
    );
}