export default function FaqTab() {
    return (
        <div className="rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Terms & Frequently Asked Questions</h3>
            <div className="space-y-4 text-xs">
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <h4 className="font-black text-slate-900 mb-1">Can I pause my delivery if I go out of town?</h4>
                    <p className="text-slate-600">Yes! You can pause any upcoming fresh drop at least 24 hours in advance through your dashboard.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <h4 className="font-black text-slate-900 mb-1">Are the vegetables fresh upon arrival?</h4>
                    <p className="text-slate-600">All fresh vegetables and proteins are sourced directly on the morning of delivery, ensuring farm-fresh quality.</p>
                </div>
            </div>
        </div>
    );
}