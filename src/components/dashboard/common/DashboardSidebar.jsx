'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    CreditCard,
    UtensilsCrossed,
    Package,
    ShoppingCart,
    Users,
    Truck,
    Wallet,
    Ticket,
    Bell,
    BarChart3,
    X,
    LogOut,
    ChevronRight,
    Calendar,
    Heart,
    DollarSign
} from 'lucide-react';

const adminMenu = [
    { name: 'Overview', href: '/dashboard/admin/overview', icon: LayoutDashboard },
    { name: 'Card Management', href: '/dashboard/admin/card-management', icon: CreditCard },
    { name: 'Food Chart', href: '/dashboard/admin/food-chart', icon: UtensilsCrossed },
    { name: 'Products', href: '/dashboard/admin/products', icon: Package },
    { name: 'Orders', href: '/dashboard/admin/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/dashboard/admin/customers', icon: Users },
    { name: 'Delivery', href: '/dashboard/admin/delivery', icon: Truck },
    { name: 'Payments', href: '/dashboard/admin/payments', icon: Wallet },
    { name: 'Coupons', href: '/dashboard/admin/coupons', icon: Ticket },
    { name: 'Notifications', href: '/dashboard/admin/notifications', icon: Bell },
    { name: 'Reports', href: '/dashboard/admin/reports', icon: BarChart3 },
];

const userMenu = [
    { name: 'Overview', href: '/dashboard/user', icon: LayoutDashboard },
    { name: 'My Subscriptions', href: '/dashboard/user/my-card', icon: CreditCard },
    { name: 'Delivery Schedule', href: '/dashboard/user/delivary-tracking', icon: Calendar },
    { name: 'Order History', href: '/dashboard/user/orders', icon: ShoppingCart },
    { name: 'Payments', href: '/dashboard/user/payments', icon: DollarSign },

];

export default function DashboardSidebar({ isOpen, setIsOpen, role }) {
    const pathname = usePathname();
    const isAdmin = role === 'admin' || pathname.startsWith('/dashboard/admin');
    const menuItems = isAdmin ? adminMenu : userMenu;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Header */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-600/20">
                            BC
                        </div>
                        <div>
                            <span className="font-extrabold text-lg text-slate-900 tracking-tight">Bazaar Card</span>
                            <span className="block text-[10px] font-bold tracking-wider uppercase text-emerald-600">
                                {isAdmin ? 'Admin Control' : 'User Portal'}
                            </span>
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
                    <p className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-3">
                        {isAdmin ? 'Management Modules' : 'My Account'}
                    </p>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all group
                                    ${isActive
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                                        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'}
                                `}
                            >
                                <div className="flex items-center space-x-3">
                                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-emerald-600'}`} />
                                    <span>{item.name}</span>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4 text-white/80" />}
                            </Link>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-100">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Exit</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}