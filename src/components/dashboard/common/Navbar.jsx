'use client';

import { Menu, Search, ShieldCheck, UserCheck } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar({ onOpenSidebar }) {
    const pathname = usePathname();
    
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const isAdmin = pathname.startsWith('/dashboard/admin');

    return (
        <header className="sticky top-0 z-30 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={onOpenSidebar}
                    className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl w-64 md:w-80 border border-slate-200/60">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder={isAdmin ? "Search admin modules..." : "Search subscriptions, items..."}
                        className="bg-transparent text-xs text-slate-700 focus:outline-none w-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    {user?.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || 'User'}
                            width={28}
                            height={28}
                            className="rounded-full object-cover border border-emerald-300 w-7 h-7"
                        />
                    ) : (
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                            {isAdmin ? <ShieldCheck className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </div>
                    )}
                    <div className="hidden md:flex flex-col text-left">
                        <span className="text-xs font-extrabold text-slate-900">
                            {user?.name || (isAdmin ? 'Admin Panel' : 'User Account')}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold capitalize">
                            {isAdmin ? 'Super Administrator' : 'Valued Customer'}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}