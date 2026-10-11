'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag, Sparkles, User, LogOut, LayoutDashboard, ShieldAlert } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const isAdmin = user?.role === 'admin';
    const dashboardPath = isAdmin ? '/dashboard/admin' : '/dashboard/user';

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => { router.push('/auth/login'); }
            }
        });
    };

    const pathName = usePathname();

    if (pathName.startsWith('/dashboard')) {
        return null;
    }

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

                {/* Logo Section */}
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden rounded-full bg-emerald-50 border border-emerald-200">
                        <Image
                            src="/logo.jpeg"
                            alt="Bazaar Card Logo"
                            fill
                            className="object-cover w-12 h-12 p-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-xl tracking-wide text-emerald-900 group-hover:text-emerald-700 transition">
                            Bazaar <span className="text-emerald-600">Card</span>
                        </span>
                        <span className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold">Grocery Subscription</span>
                    </div>
                </Link>

                {/* Desktop Nav Links (Visible on Large Screens & above) */}
                <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-700">
                    <Link href="/cards" className="hover:text-emerald-600 transition">Browse Cards</Link>
                    <Link href="/quiz" className="hover:text-emerald-600 transition flex items-center gap-1 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>Find Your Card</span>
                    </Link>
                    <Link href="/how-it-works" className="hover:text-emerald-600 transition">How It Works</Link>
                    <Link href="/about" className="hover:text-emerald-600 transition">About Us</Link>
                </nav>

                {/* Auth-based Desktop Actions */}
                <div className="hidden lg:flex items-center space-x-4">
                    {session ? (
                        <div className="flex items-center gap-3">
                            <Link
                                href={dashboardPath}
                                className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-xs font-extrabold text-emerald-800 hover:bg-emerald-100 transition"
                            >
                                {isAdmin ? <ShieldAlert className="h-4 w-4 text-emerald-600" /> : <LayoutDashboard className="h-4 w-4 text-emerald-600" />}
                                {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
                            </Link>
                            {user?.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || 'User'}
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover border border-emerald-300 w-8 h-8"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs uppercase">
                                    {user?.name ? user.name.charAt(0) : <User className="w-4 h-4" />}
                                </div>
                            )}
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 transition"
                                title="Sign Out"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/auth/login" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 px-3 py-2 transition">
                                Login
                            </Link>
                            <Link href="/auth/register" className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-md shadow-emerald-700/20 transition flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4" />
                                <span>Get Started</span>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile & Tablet Menu Button */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg text-slate-700 hover:bg-emerald-50 focus:outline-none transition"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-6 h-6 text-emerald-800" /> : <Menu className="w-6 h-6 text-emerald-800" />}
                    </button>
                </div>
            </div>

            {/* Mobile & Tablet Navigation Drawer */}
            {isOpen && (
                <div className="lg:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
                    <Link
                        href="/cards"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                        Browse Cards
                    </Link>
                    <Link
                        href="/quiz"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-emerald-700 bg-emerald-50 border border-emerald-200"
                    >
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>Find Your Card</span>
                    </Link>
                    <Link
                        href="/how-it-works"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                        How It Works
                    </Link>
                    <Link
                        href="/about"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                        About Us
                    </Link>

                    {/* Auth-based Mobile & Tablet Actions */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                        {session ? (
                            <>
                                <Link
                                    href={dashboardPath}
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center justify-center gap-2"
                                >
                                    {isAdmin ? <ShieldAlert className="h-4 w-4 text-emerald-600" /> : <LayoutDashboard className="h-4 w-4 text-emerald-600" />}
                                    {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
                                </Link>

                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        handleSignOut();
                                    }}
                                    className="w-full text-center py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 font-bold flex items-center justify-center gap-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-2.5 rounded-xl border border-emerald-700 text-emerald-700 font-medium hover:bg-emerald-50"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-2.5 rounded-xl bg-emerald-700 text-white font-medium shadow-md shadow-emerald-700/20"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}