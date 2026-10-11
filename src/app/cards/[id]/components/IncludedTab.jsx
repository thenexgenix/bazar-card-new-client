import { CheckCircle2, XCircle, ShieldAlert, Sparkles, Check } from 'lucide-react';

export default function IncludedTab({ card }) {
    // If card.rules?.included or notIncluded are strings or arrays, handle them gracefully
    const includedText = card.rules?.included || 'All standard daily essential groceries, fresh chicken, Miniket/Nazirshail rice, potato, dal, and fresh seasonal vegetables.';
    const notIncludedText = card.rules?.notIncluded || 'Beef, specialized bakery items, imported dairy products, and branded snacks outside the standard plan.';

    return (
        <div className="space-y-6">
            {/* Header info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full uppercase tracking-wider border border-emerald-200">
                    Package Policy & Scope
                </span>
                <h3 className="text-base font-black text-slate-900">What’s Included & Excluded</h3>
                <p className="text-xs text-slate-600">
                    Review the exact items, provisions, and items excluded from this subscription package to avoid any confusion.
                </p>
            </div>

            {/* Split Grid for Included and Not Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Included Card */}
                <div className="bg-gradient-to-br from-emerald-50/60 to-white rounded-2xl border border-emerald-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2.5 text-emerald-800 font-black text-sm">
                            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span>What&apos;s Included in This Plan</span>
                        </div>
                        <p className="text-xs font-medium text-slate-700 leading-relaxed bg-white/80 p-4 rounded-xl border border-emerald-100 shadow-xs">
                            {includedText}
                        </p>
                    </div>

                    <div className="pt-3 border-t border-emerald-100 flex items-center gap-2 text-[11px] font-bold text-emerald-700">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Fully covered under standard 30-day delivery.
                    </div>
                </div>

                {/* Not Included Card */}
                <div className="bg-gradient-to-br from-rose-50/50 to-white rounded-2xl border border-rose-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2.5 text-rose-800 font-black text-sm">
                            <div className="p-2 bg-rose-600 text-white rounded-xl shadow-xs">
                                <XCircle className="w-4 h-4" />
                            </div>
                            <span>What&apos;s Not Included</span>
                        </div>
                        <p className="text-xs font-medium text-slate-700 leading-relaxed bg-white/80 p-4 rounded-xl border border-rose-100 shadow-xs">
                            {notIncludedText}
                        </p>
                    </div>

                    <div className="pt-3 border-t border-rose-100 flex items-center gap-2 text-[11px] font-bold text-rose-700">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> Can be added separately during checkout or custom requests.
                    </div>

                </div>

            </div>
        </div>
    );
}