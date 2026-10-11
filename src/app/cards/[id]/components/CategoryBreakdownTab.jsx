export default function CategoryBreakdownTab({ duration }) {
    const categories = [
        { category: 'Rice & Grains', amount: '22 kg', serving: 'Everyday Staple', type: 'Pantry Drop (1x)' },
        { category: 'Edible Oils & Spices', amount: '5.5 kg', serving: 'Monthly Supply', type: 'Pantry Drop (1x)' },
        { category: 'Fresh Proteins (Fish/Chicken)', amount: '18 kg', serving: 'Portion-wise', type: 'Fresh Drops (4x)' },
        { category: 'Vegetables & Roots', amount: '35 kg', serving: 'Fresh Weekly', type: 'Fresh Drops (4x)' },
        { category: 'Lentils & Essentials', amount: '7.5 kg', serving: 'Balanced Mix', type: 'Pantry Drop (1x)' },
    ];

    return (
        <div className="rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">What You Get (Category Breakdown)</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 text-xs font-extrabold uppercase text-slate-400">
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">Total Amount ({duration}d)</th>
                            <th className="py-3 px-4">Serving Type</th>
                            <th className="py-3 px-4">Delivery Frequency</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                        {categories.map((cat, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                                <td className="py-4 px-4 font-bold text-slate-900">{cat.category}</td>
                                <td className="py-4 px-4 font-black text-emerald-700">{cat.amount}</td>
                                <td className="py-4 px-4 font-bold text-slate-600">{cat.serving}</td>
                                <td className="py-4 px-4 font-bold text-slate-500">{cat.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}