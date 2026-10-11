'use client';

import DashboardSidebar from "@/components/dashboard/common/DashboardSidebar";
import Navbar from "@/components/dashboard/common/Navbar";
import { useState } from "react";


export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex-1 flex flex-col lg:pl-72">
                <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

                <main className="flex-1 p-4 sm:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}