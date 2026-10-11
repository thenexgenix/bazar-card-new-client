import { Package, CheckCircle2, Truck, Layers, ShoppingBag } from 'lucide-react';

export default function OverviewTab({ card }) {
    return (
        <div className="space-y-6">
            {/* A Typical Day Banner */}
            <div className="bg-gradient-to-r from-emerald-700 to-slate-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute right-4 bottom-4 opacity-10">
                    <ShoppingBag className="w-28 h-28 text-white" />
                </div>
                <div className="relative z-10 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                            Daily Consumption Preview
                        </span>
                    </div>
                    <h2 className="text-base font-extrabold tracking-wide text-white">A Typical Day&apos;s Kitchen Supply</h2>
                    <p className="text-xs sm:text-sm font-medium text-emerald-100 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10 inline-block">
                        🌾 Rice 750g • 🍗 Chicken 600g • 🥔 Potato 300g • 🥣 Dal • 🥦 Fresh Vegetables
                    </p>
                </div>
            </div>

            {/* What You Get / Products Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Package Items & Categories</h2>
                        <p className="text-xs text-slate-500 mt-0.5">Complete list of groceries and supplies included in this plan.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-extrabold self-start sm:self-auto">
                        <Package className="w-4 h-4 text-emerald-600" />
                        <span>{card.products?.length || 0} Total Items</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                                <th className="pb-3 pl-2">Item / Category</th>
                                <th className="pb-3">Quantity</th>
                                <th className="pb-3">Approx. Servings</th>
                                <th className="pb-3 pr-2">Delivery Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {card.products && card.products.length > 0 ? (
                                card.products.map((prod, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/80 transition group">
                                        <td className="py-3.5 pl-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition">
                                                    {idx + 1}
                                                </div>
                                                <span className="font-bold text-slate-900">{prod.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5">
                                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg font-extrabold border border-emerald-200">
                                                {prod.quantity} {prod.unit}
                                            </span>
                                        </td>
                                        <td className="py-3.5 text-slate-600 font-semibold">30 Days Standard</td>
                                        <td className="py-3.5 pr-2">
                                            <span className="inline-flex items-center gap-1 text-slate-600 font-semibold bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                                                <Truck className="w-3.5 h-3.5 text-emerald-600" /> Scheduled Drop
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-slate-400 font-medium">
                                        Standard grocery package items included.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}