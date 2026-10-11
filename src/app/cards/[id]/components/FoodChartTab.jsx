'use client';

import { useState } from 'react';
import { Calendar, CheckCircle, Package, Clock, ChevronRight, Sparkles } from 'lucide-react';

export default function FoodChartTab({ card }) {
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);

    // Mock weekly structured chart generator based on card products
    const weeksData = {
        1: {
            title: "Week 1: Fresh & Staple Foundation",
            focus: "High focus on fresh proteins, rice, cooking oils, and core daily vegetables.",
            days: [1, 2, 3, 4, 5, 6, 7]
        },
        2: {
            title: "Week 2: Mid-Month Replenishment",
            focus: "Secondary vegetable drop, lentils (dal), spices restock, and poultry items.",
            days: [8, 9, 10, 11, 12, 13, 14]
        },
        3: {
            title: "Week 3: Balanced Nutrition Cycle",
            focus: "Seasonal green vegetables, fish/meat rotation, and pantry essentials.",
            days: [15, 16, 17, 18, 19, 20, 21]
        },
        4: {
            title: "Week 4: Month-End Stock & Reserve",
            focus: "Remaining staples, backup dry rations, and preparation for next month's cycle.",
            days: [22, 23, 24, 25, 26, 27, 28, 29, 30]
        }
    };

    const currentWeekInfo = weeksData[selectedWeek];

    return (
        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-white p-6 sm:p-8 shadow-sm space-y-6">

            {/* Header & Week Selector */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full uppercase tracking-wider border border-emerald-200">
                        Version {card.foodChartVersion || '1.0'} Schedule
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-2">30-Day Food Chart Schedule</h3>
                    <p className="text-xs text-slate-600 mt-1">Structured weekly delivery cycles designed for maximum household freshness.</p>
                </div>

                {/* Week Tabs */}
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((wk) => (
                        <button
                            key={wk}
                            onClick={() => {
                                setSelectedWeek(wk);
                                setSelectedDay(weeksData[wk].days[0]);
                            }}
                            className={`rounded-xl px-4 py-2 text-xs font-black transition cursor-pointer shadow-xs ${selectedWeek === wk
                                    ? 'bg-emerald-600 text-white border border-emerald-600 shadow-md shadow-emerald-600/20'
                                    : 'bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50'
                                }`}
                        >
                            Week 0{wk}
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Week Focus Banner */}
            <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-xs flex items-start gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100 shrink-0">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-900">{currentWeekInfo.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{currentWeekInfo.focus}</p>
                </div>
            </div>

            {/* Day Selector Bar */}
            <div className="space-y-3">
                <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Select Day for Details:</div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {currentWeekInfo.days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-4 py-3 rounded-xl border text-center min-w-[75px] transition cursor-pointer flex flex-col items-center gap-1 ${selectedDay === day
                                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-105'
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50'
                                }`}
                        >
                            <span className="text-[10px] font-bold opacity-80 uppercase">Day</span>
                            <span className="text-sm font-black">{day < 10 ? `0${day}` : day}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Selected Day Breakdown Card */}
            <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span>Day {selectedDay < 10 ? `0${selectedDay}` : selectedDay} Drop & Consumption Plan</span>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-lg border border-emerald-200 self-start sm:self-auto">
                        Scheduled Morning Drop (8 AM - 11 AM)
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="text-xs font-bold text-slate-400 uppercase">Primary Proteins / Meat</div>
                        <div className="text-xs font-extrabold text-slate-800">
                            {selectedDay % 2 === 0 ? 'Chicken (600g) • Fresh Cleaned' : 'Local Dal & Protein Lentils'}
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="text-xs font-bold text-slate-400 uppercase">Carbohydrates & Rice</div>
                        <div className="text-xs font-extrabold text-slate-800">
                            Miniket / Nazirshail Rice Portion (750g)
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="text-xs font-bold text-slate-400 uppercase">Vegetables & Essentials</div>
                        <div className="text-xs font-extrabold text-slate-800">
                            Potato (300g), Seasonal Green Vegetables, Cooking Oil
                        </div>
                    </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" /> Need to skip or pause this day? Available after checkout.
                    </span>
                    <span className="font-bold text-emerald-600">Chart-Lock Guarantee ✓</span>
                </div>
            </div>

        </div>
    );
}