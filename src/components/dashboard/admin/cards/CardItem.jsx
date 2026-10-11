'use client';

import { Users, Layers, Power, Edit3, Trash2 } from 'lucide-react';

export default function CardItem({ card, onEdit, onToggleStatus, onDelete }) {
    const monthPlan = card.plans?.find(p => p.durationDays === 30) || card.plans?.[0];
    const cardMargin = monthPlan ? monthPlan.price - (card.estimatedBasketCost || 0) : 0;
    const perPersonDay = monthPlan ? (monthPlan.price / (card.familySize * monthPlan.durationDays)).toFixed(1) : 0;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition">
            <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-extrabold text-lg text-slate-900">{card.name}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${card.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                        {card.isActive ? 'Active' : 'Deactivated'}
                    </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4">{card.description || 'No description provided.'}</p>

                <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-slate-100 text-xs mb-4">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Users className="w-4 h-4 text-emerald-600" />
                        <span>Family: {card.familySize}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Layers className="w-4 h-4 text-emerald-600" />
                        <span>Chart: {card.foodChartVersion || 'Default'}</span>
                    </div>
                </div>

                {/* Plans pricing */}
                <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Available Plans</span>
                    <div className="flex items-center gap-2 flex-wrap">
                        {card.plans?.map((p, idx) => (
                            <span key={idx} className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-700">
                                {p.durationDays}D: <span className="text-emerald-600">৳{p.price}</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Margin Panel Mini */}
                <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Margin (30D)</span>
                        <span className="font-extrabold text-emerald-700">৳{cardMargin}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Per Person/Day</span>
                        <span className="font-bold text-slate-700">৳{perPersonDay}</span>
                    </div>
                </div>
            </div>

            {/* Actions Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between">
                <button
                    onClick={() => onToggleStatus(card._id)}
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg border transition ${card.isActive ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'}`}
                >
                    <Power className="w-3.5 h-3.5" />
                    <span>{card.isActive ? 'Deactivate' : 'Activate'}</span>
                </button>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onEdit(card)}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                        title="Edit"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(card._id)}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition"
                        title="Soft Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}