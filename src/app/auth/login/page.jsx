'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {

            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: '/'
            });
            if (error) {
                setError('Email or Password Invalid')
            };

            await new Promise((res) => setTimeout(res, 1000));
            router.push('/');
        } catch (err) {
            setError(err.message || 'Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            // Example with BetterAuth Social Sign-In:
            // await authClient.signIn.social({
            //     provider: 'google',
            //     callbackURL: '/dashboard'
            // });
            alert('Google Sign-In integration ready.');
        } catch (err) {
            setError(err.message || 'Google sign-in failed.');
        }
    };

    return (
        <div className="min-h-screen bg-[#f4fcf7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-700 shadow-sm">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        Member Portal
                    </span>
                </div>
                <h2 className="mt-4 text-center text-3xl font-black tracking-tight text-slate-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-xs font-bold text-slate-500">
                    Don&apos;t have an account?{' '}
                    <Link href="/sign-up" className="text-emerald-700 hover:underline">
                        Create one
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
                <div className="rounded-3xl border border-emerald-200 bg-white py-8 px-6 shadow-xl sm:px-10">
                    {error && (
                        <div className="mb-4 rounded-2xl bg-rose-50 border border-rose-200 p-3 text-xs font-bold text-rose-700 text-center">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSignIn}>
                        <div>
                            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="h-4 w-4" />
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-xs font-bold text-slate-800 focus:border-emerald-600 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="h-4 w-4" />
                                </span>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-xs font-bold text-slate-800 focus:border-emerald-600 focus:outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 rounded-2xl bg-emerald-600 py-4 text-xs font-extrabold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider with Or */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 font-extrabold text-slate-400">Or continue with</span>
                        </div>
                    </div>

                    {/* Google Sign In Button */}
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 text-xs font-extrabold text-slate-700 shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2.5"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                        </svg>
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
}