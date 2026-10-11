'use client';

import { useState } from 'react';
import {
    CreditCard, DollarSign, CheckCircle2, Clock, AlertTriangle,
    RefreshCw, Download, Search, Filter, ShieldCheck, ArrowUpRight,
    X, RotateCcw, ArrowRight, HelpCircle
} from 'lucide-react';

export default function PaymentsPage() {
    // Demo Payment History Data
    const [payments, setPayments] = useState([
        {
            id: "PAY-98123",
            orderId: "ORD-2026-9812",
            cardName: "Standard Family Pack",
            date: "05 Oct 2026",
            amount: 4800,
            method: "bKash Online Payment",
            status: "Paid", // Paid, Pending, Failed, Refunded
            trxId: "BKASH981237X",
            refundTrack: null
        },
        {
            id: "PAY-87311",
            orderId: "ORD-2026-8731",
            cardName: "Bachelor Essential Pack",
            date: "11 Oct 2026",
            amount: 2500,
            method: "Nagad Gateway",
            status: "Pending",
            trxId: "NAGAD873112Y",
            refundTrack: null
        },
        {
            id: "PAY-76402",
            orderId: "ORD-2026-7640",
            cardName: "Compact Duo Pack",
            date: "28 Sep 2026",
            amount: 1200,
            method: "Credit / Debit Card",
            status: "Failed",
            trxId: "N/A",
            refundTrack: null
        },
        {
            id: "PAY-65291",
            orderId: "ORD-2026-6529",
            cardName: "Weekend Veggies Special",
            date: "15 Sep 2026",
            amount: 1800,
            method: "bKash Online Payment",
            status: "Refunded",
            trxId: "BKASH652919Z",
            refundTrack: {
                step: 3, // 1: Requested, 2: Approved, 3: Processed
                requestedDate: "16 Sep 2026",
                approvedDate: "17 Sep 2026",
                processedDate: "18 Sep 2026",
                refundMethod: "bKash Wallet (+88017******12)"
            }
        }
    ]);

    // UI States
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedRefundTrack, setSelectedRefundTrack] = useState(null); // Refund Modal

    // Filter Logic
    const filteredPayments = payments.filter(payment => {
        const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.cardName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const handleRetryPayment = (paymentId) => {
        alert(`Redirecting to payment gateway for ${paymentId}...`);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 py-6 px-4 sm:px-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900">Payment History & Refunds</h1>
                    <p className="text-xs text-slate-500 mt-1">Track transactions, complete pending payments, download invoices, and monitor live refund steps.</p>
                </div>
            </div>

            {/* Quick Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
                    <div>
                        <span className="font-bold text-slate-400 uppercase text-[10px]">Total Spent</span>
                        <div className="text-2xl font-black text-slate-900 mt-0.5">৳10,300</div>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                        <CreditCard className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
                    <div>
                        <span className="font-bold text-slate-400 uppercase text-[10px]">Pending Due</span>
                        <div className="text-2xl font-black text-amber-600 mt-0.5">৳2,500</div>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                        <Clock className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
                    <div>
                        <span className="font-bold text-slate-400 uppercase text-[10px]">Refunded Amount</span>
                        <div className="text-2xl font-black text-blue-600 mt-0.5">৳1,800</div>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <RotateCcw className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                        type="text"
                        placeholder="Search Trx ID, Payment ID or Card..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:outline-none"
                    >
                        <option value="all">All Payment Statuses</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>
            </div>

            {/* Payment History Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                {filteredPayments.length === 0 ? (
                    <div className="p-12 text-center text-xs text-slate-400 font-medium">
                        No payments found matching your search or filter.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
                                    <th className="py-4 px-6">Payment ID & Date</th>
                                    <th className="py-4 px-6">Subscription Card</th>
                                    <th className="py-4 px-6">Method & TrxID</th>
                                    <th className="py-4 px-6">Amount</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                                {filteredPayments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-slate-50/80 transition">
                                        <td className="py-4 px-6">
                                            <div className="font-extrabold text-slate-900">{payment.id}</div>
                                            <div className="text-[11px] text-slate-500 mt-0.5">{payment.date}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-slate-800">{payment.cardName}</div>
                                            <div className="text-[10px] text-slate-400">{payment.orderId}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-slate-800">{payment.method}</div>
                                            <div className="text-[10px] font-mono text-slate-400">{payment.trxId}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-black text-slate-900 text-sm">৳{payment.amount}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {/* Status Badges */}
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase flex items-center gap-1 w-fit ${payment.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                                    payment.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                                        payment.status === 'Failed' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                                                            'bg-blue-50 text-blue-700 border border-blue-200'
                                                }`}>
                                                {payment.status === 'Paid' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                                                {payment.status === 'Pending' && <Clock className="w-3 h-3 text-amber-600" />}
                                                {payment.status === 'Failed' && <AlertTriangle className="w-3 h-3 text-rose-600" />}
                                                {payment.status === 'Refunded' && <RotateCcw className="w-3 h-3 text-blue-600" />}
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Pending or Failed State: Pay Now / Retry */}
                                                {(payment.status === 'Pending' || payment.status === 'Failed') && (
                                                    <button
                                                        onClick={() => handleRetryPayment(payment.id)}
                                                        className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl text-[11px] font-extrabold hover:bg-emerald-700 transition flex items-center gap-1 shadow-xs"
                                                    >
                                                        <RefreshCw className="w-3 h-3" /> Pay Now
                                                    </button>
                                                )}

                                                {/* Refunded State: Track Refund */}
                                                {payment.status === 'Refunded' && payment.refundTrack && (
                                                    <button
                                                        onClick={() => setSelectedRefundTrack(payment)}
                                                        className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-[11px] font-extrabold hover:bg-blue-100 transition flex items-center gap-1"
                                                    >
                                                        <RotateCcw className="w-3 h-3" /> Refund Tracker
                                                    </button>
                                                )}

                                                {/* Paid State: Download Invoice */}
                                                {payment.status === 'Paid' && (
                                                    <button
                                                        className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition"
                                                        title="Download Invoice PDF"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* --- REFUND TRACKER MODAL (Requested → Approved → Processed) --- */}
            {selectedRefundTrack && selectedRefundTrack.refundTrack && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <span className="text-[10px] font-extrabold uppercase text-slate-400">Refund Status</span>
                                <h3 className="text-base font-black text-slate-900">{selectedRefundTrack.id}</h3>
                            </div>
                            <button onClick={() => setSelectedRefundTrack(null)} className="p-1 text-slate-400 hover:text-slate-700 font-bold">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-6 text-xs">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                                <div className="flex justify-between font-bold text-slate-700">
                                    <span>Refund Amount:</span>
                                    <span className="text-emerald-700 text-sm font-black">৳{selectedRefundTrack.amount}</span>
                                </div>
                                <div className="text-[11px] text-slate-500 font-medium pt-1">
                                    Method: {selectedRefundTrack.refundTrack.refundMethod}
                                </div>
                            </div>

                            {/* Live Refund Tracker Steps */}
                            <div className="space-y-4 relative pl-4 border-l-2 border-emerald-500">

                                {/* Step 1: Requested */}
                                <div className="relative space-y-0.5">
                                    <div className="absolute -left-[23px] top-0 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white"></div>
                                    <div className="font-extrabold text-slate-900">1. Refund Requested</div>
                                    <div className="text-[11px] text-slate-500">{selectedRefundTrack.refundTrack.requestedDate}</div>
                                </div>

                                {/* Step 2: Approved */}
                                <div className="relative space-y-0.5">
                                    <div className="absolute -left-[23px] top-0 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white"></div>
                                    <div className="font-extrabold text-slate-900">2. Refund Approved</div>
                                    <div className="text-[11px] text-slate-500">{selectedRefundTrack.refundTrack.approvedDate}</div>
                                </div>

                                {/* Step 3: Processed */}
                                <div className="relative space-y-0.5">
                                    <div className="absolute -left-[23px] top-0 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white"></div>
                                    <div className="font-extrabold text-emerald-700">3. Refund Processed & Credited ✓</div>
                                    <div className="text-[11px] text-slate-500">{selectedRefundTrack.refundTrack.processedDate}</div>
                                </div>
                            </div>

                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-[11px] font-medium flex items-start gap-2">
                                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                <span>Money has been successfully credited back to your original payment source.</span>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2 border-t border-slate-100">
                            <button
                                onClick={() => setSelectedRefundTrack(null)}
                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}