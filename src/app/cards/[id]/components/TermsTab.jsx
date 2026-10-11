import { ShieldCheck, RefreshCw, Clock, Truck, FileText, CheckCircle2 } from 'lucide-react';

export default function TermsTab({ card }) {
    const defaultTerms = card.rules?.terms || 'Skip days anytime with 24-hour notice. Item substitution allowed based on seasonal availability. Easy refund and scheduled door-step delivery policy applies.';

    const policies = [
        {
            title: 'Skip & Reschedule Policy',
            desc: 'Skip any delivery day hassle-free with a minimum of 24-hour advance notice through your dashboard.',
            icon: Clock,
            badge: '24-Hour Notice'
        },
        {
            title: 'Seasonal Item Substitution',
            desc: 'In case of seasonal unavailability, equivalent high-quality alternative items are substituted with prior notice.',
            icon: RefreshCw,
            badge: 'Quality Assured'
        },
        {
            title: 'Scheduled Doorstep Drop',
            desc: 'Reliable scheduled morning/afternoon drops directly to your doorstep with zero hidden delivery charges.',
            icon: Truck,
            badge: 'Free Delivery'
        },
        {
            title: 'Easy Refund & Pause',
            desc: 'Flexible cancellation and prorated refund policies apply if you wish to discontinue your plan.',
            icon: ShieldCheck,
            badge: 'Secure Guarantee'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full uppercase tracking-wider border border-emerald-200">
                            Subscriber Guidelines
                        </span>
                        <h3 className="text-base font-black text-slate-900 mt-1">Terms & Service Policies</h3>
                    </div>
                </div>

                <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {defaultTerms}
                </p>
            </div>

            {/* Grid of Policies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {policies.map((policy, idx) => {
                    const IconComponent = policy.icon;
                    return (
                        <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 hover:border-emerald-300 transition group">
                            <div className="flex items-center justify-between">
                                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition">
                                    <IconComponent className="w-4 h-4" />
                                </div>
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-extrabold rounded-lg border border-slate-200">
                                    {policy.badge}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-black text-slate-900">{policy.title}</h4>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">{policy.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Note */}
            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> By subscribing, you agree to our standard household delivery terms and user agreement.
            </div>
        </div>
    );
}