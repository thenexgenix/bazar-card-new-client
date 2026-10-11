import { Plus, AlertCircle } from 'lucide-react';
import { getAdminCards } from '@/lib/api/cards';
import CardModalWrapper from '@/components/dashboard/admin/cards/CardModalWrapper';

export const dynamic = 'force-dynamic';

export default async function AdminCardsPage() {
    const res = await getAdminCards();
    const cards = res.success ? res.data : [];

    return (

        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Card Management Dashboard</h1>
                    <p className="text-xs text-slate-500 mt-1">Manage subscription packages, multi-duration pricing, margins, and status.</p>
                </div>
            </div>

            {/* Client Component Wrapper for Modal and Interactivity */}
            <CardModalWrapper initialCards={cards} />
        </div>

    );
}