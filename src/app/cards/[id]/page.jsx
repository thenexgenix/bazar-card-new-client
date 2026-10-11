import { getAdminCards } from '@/lib/api/cards';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import CardDetailsTabs from './components/CardDetailsTabs';
import CardActionBox from './components/CardActionBox'; 

export async function generateStaticParams() {
    const response = await getAdminCards();
    const cards = response?.success ? response.data : [];
    return cards.map((card) => ({
        id: card._id?.toString() || card.id?.toString(),
    }));
}

export default async function CardDetailPage({ params }) {
    const { id } = await params;
    const response = await getAdminCards();
    const cards = response?.success ? response.data : [];

    const card = cards.find((c) => (c._id?.toString() === id) || (c.id?.toString() === id));

    if (!card) {
        notFound();
    }

    const monthPlan = card.plans?.find(p => p.durationDays === 30) || card.plans?.[0];
    const perPersonDay = card.perPersonAmount > 0 ? card.perPersonAmount : (monthPlan && card.familySize ? (monthPlan.price / (card.familySize * monthPlan.durationDays)).toFixed(1) : 0);

    const cardImage = card.image || card.thumbnail || card.imageUrl;

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <Link href="/cards" className="hover:text-emerald-600 transition">Cards</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-slate-900 font-bold">{card.name}</span>
                </div>

                {/* Card Art / Main Action Box */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">

                        {cardImage ? (
                            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                                <img
                                    src={cardImage}
                                    alt={card.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="px-3 py-1 bg-emerald-900/80 backdrop-blur-md text-white text-[10px] font-extrabold rounded-full border border-emerald-700 uppercase tracking-wider">
                                        Verified Subscription Card
                                    </span>
                                </div>
                            </div>
                        ) : null}

                        <div>
                            {!cardImage && (
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold rounded-full border border-emerald-200 uppercase tracking-wider">
                                    Family Plus Card
                                </span>
                            )}
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{card.name}</h1>
                            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">{card.description}</p>
                        </div>

                        {/* Stats Info */}
                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-700 pt-2">
                            <div className="bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                                <span className="text-sm">👥</span>
                                <span><strong className="text-slate-900">{card.familySize} members</strong> family</span>
                            </div>
                            <div className="bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                                <span className="text-sm">💳</span>
                                <span><strong className="text-slate-900">৳{perPersonDay}</strong>/person/day</span>
                            </div>
                            <div className="bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                                <span className="text-sm">🛒</span>
                                <span><strong className="text-slate-900">{card.products?.length || 0} items</strong> included</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Interactive Action Box (Client Component) */}
                    <CardActionBox card={card} />
                </div>

                {/* Client Component for Interactive Tab Switching */}
                <CardDetailsTabs card={card} />

            </div>
        </div>
    );
}