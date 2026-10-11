import Link from 'next/link';
import { getAdminCards } from '@/lib/api/cards';
import { Users, Layers, Sparkles, PackageCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PublicCardsPage() {
    const response = await getAdminCards();
    const cards = response?.success ? response.data : [];

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            {/* Modern Enhanced Header Section */}
            <div className="bg-white border-b border-slate-200 shadow-2xs mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-3">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span>&gt;</span>
                        <span className="text-slate-500">Cards</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-center text-center gap-4">
                        <div>
                            <div className="flex justify-center items-center text-center gap-2 mb-1">
                                <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-200">
                                    <Sparkles className="w-4 h-4" />
                                </span>
                                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">Grocery Subscription Engine</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                                ALL BAZAAR CARDS & PACKAGES
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl leading-relaxed">
                                Choose a grocery package tailored for your family size, duration, and nutritional needs with locked-in chart transparency.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {cards.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-sm font-bold text-slate-400">No active subscription cards found at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.map((card) => {
                            const monthPlan = card.plans?.find(p => p.durationDays === 30) || card.plans?.[0];
                            const calculatedPerPersonDay = monthPlan && card.familySize ? (monthPlan.price / (card.familySize * monthPlan.durationDays)).toFixed(1) : 0;
                            const perPersonDay = card.perPersonAmount > 0 ? card.perPersonAmount : calculatedPerPersonDay;
                            const estimatedMargin = monthPlan ? monthPlan.price - (card.estimatedBasketCost || 0) : 0;

                            return (
                                <Link
                                    key={card?._id}
                                    href={`/cards/${card?._id}`}
                                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-500 transition duration-200 flex flex-col justify-between group"
                                >
                                    <div>
                                        {/* Card Header */}
                                        <div className="flex items-start justify-between gap-2 mb-3">
                                            <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-600 transition">
                                                {card.name}
                                            </h2>
                                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold rounded-full border border-emerald-200 shrink-0">
                                                ACTIVE
                                            </span>
                                        </div>

                                        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                                            {card.description}
                                        </p>

                                        {/* Meta info */}
                                        <div className="flex items-center gap-4 py-3 border-y border-slate-100 mb-4 text-xs font-semibold text-slate-700">
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-4 h-4 text-emerald-600" />
                                                <span>Family: {card.familySize}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Layers className="w-4 h-4 text-emerald-600" />
                                                <span>Chart: {card.foodChartVersion}</span>
                                            </div>
                                        </div>

                                        {/* Available Plans */}
                                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-4">
                                            <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-2 tracking-wider">Available Plans</span>
                                            <div className="flex flex-wrap gap-2">
                                                {card.plans?.map((plan, idx) => (
                                                    <span key={idx} className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                                                        {plan.durationDays}D: <strong className="text-emerald-600">৳{plan.price}</strong>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="flex items-end justify-between pt-3 border-t border-slate-100 text-xs">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Est. Margin (30D)</span>
                                            <span className="font-extrabold text-emerald-600">৳{estimatedMargin}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Per Person/Day</span>
                                            <span className="font-extrabold text-slate-900">৳{perPersonDay}</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}