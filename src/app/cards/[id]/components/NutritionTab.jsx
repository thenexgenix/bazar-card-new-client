import { ShieldCheck, Flame, Apple, Activity, HeartPulse } from 'lucide-react';

export default function NutritionTab() {
    const macros = [
        { label: 'Daily Protein', value: '65g - 80g', desc: 'From clean chicken, dal, and pulses', icon: Flame, color: 'text-amber-600 bg-amber-50 border-amber-200' },
        { label: 'Complex Carbs', value: '300g+', desc: 'High-quality Nazirshail/Miniket rice & potato', icon: Activity, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
        { label: 'Fresh Produce', value: 'Daily Fiber', desc: 'Vitamins & minerals from fresh seasonal veggies', icon: Apple, color: 'text-teal-600 bg-teal-50 border-teal-200' },
        { label: 'Heart Health', value: 'Balanced Oils', desc: 'Controlled healthy fats for daily cooking', icon: HeartPulse, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    ];

    return (
        <div className="space-y-6">
            {/* Main Header Banner */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full uppercase tracking-wider border border-emerald-200">
                            Expert Formulation
                        </span>
                        <h2 className="text-base font-black text-slate-900 mt-1">Nutrition & Health Information</h2>
                    </div>
                </div>

                <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    Designed by professional nutritionists to maintain a balanced diet with proper macro-nutrients, whole grains, clean protein sources, and fresh produce tailored perfectly for family health and daily energy requirements.
                </p>
            </div>

            {/* Macro-Nutrient Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {macros.map((macro, idx) => {
                    const IconComponent = macro.icon;
                    return (
                        <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-start gap-4 hover:border-emerald-300 transition group">
                            <div className={`p-3 rounded-xl border shrink-0 ${macro.color}`}>
                                <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{macro.label}</div>
                                <div className="text-sm font-black text-slate-900">{macro.value}</div>
                                <p className="text-xs text-slate-500 font-medium leading-normal">{macro.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quality Guarantee Footer */}
            <div className="bg-gradient-to-r from-emerald-700 to-slate-600 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-sm font-extrabold text-white">100% Organic & Fresh Quality Assured</h4>
                    <p className="text-xs text-emerald-200">All grocery items undergo strict quality checks prior to scheduled drop.</p>
                </div>
                <span className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl shadow-md transition cursor-default shrink-0">
                    Certified Standards ✓
                </span>
            </div>
        </div>
    );
}