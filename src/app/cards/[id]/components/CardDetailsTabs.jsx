'use client';

import { useState } from 'react';
import OverviewTab from './OverviewTab';
import FoodChartTab from './FoodChartTab';
import NutritionTab from './NutritionTab';
import IncludedTab from './IncludedTab';
import TermsTab from './TermsTab';

export default function CardDetailsTabs({ card }) {
    const [activeTab, setActiveTab] = useState('Overview');

    const tabs = ['Overview', 'Food Chart', 'Nutrition', 'Included', 'Terms'];

    return (
        <div className="space-y-6">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex gap-4 overflow-x-auto text-xs font-bold text-slate-600">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-1 transition cursor-pointer whitespace-nowrap ${activeTab === tab
                                ? 'text-emerald-600 border-b-2 border-emerald-600'
                                : 'hover:text-emerald-600'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Conditional Tab Rendering */}
            <div>
                {activeTab === 'Overview' && <OverviewTab card={card} />}
                {activeTab === 'Food Chart' && <FoodChartTab card={card} />}
                {/* {activeTab === 'Delivery Schedule' && <DeliveryScheduleTab />} */}
                {activeTab === 'Nutrition' && <NutritionTab />}
                {activeTab === 'Included' && <IncludedTab card={card} />}
                {activeTab === 'Terms' && <TermsTab card={card} />}
            </div>
        </div>
    );
}