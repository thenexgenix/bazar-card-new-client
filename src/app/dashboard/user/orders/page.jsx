'use client';

import { useState } from 'react';
import {
    ShoppingBag, Search, Filter, Download, Eye, RefreshCw,
    Calendar, MapPin, CreditCard, Tag, CheckCircle2, FileText,
    X, ShieldCheck, Printer, Globe
} from 'lucide-react';

export default function OrderHistoryPage() {
    // Demo Orders Data
    const [orders, setOrders] = useState([
        {
            id: "ORD-2026-9812",
            date: "05 Oct 2026",
            cardName: "Standard Family Pack",
            duration: "30 Days",
            originalPrice: 5200,
            discount: 400,
            paidAmount: 4800,
            paymentMethod: "bKash Online Payment",
            paymentStatus: "Paid",
            orderStatus: "Active",
            startDate: "10 Oct 2026",
            endDate: "08 Nov 2026",
            address: "House 24, Road 5, Block B, Dhanmondi, Dhaka",
            items: [
                { name: "Miniket Rice", qty: "20 kg" },
                { name: "Soyabean Oil", qty: "5 Ltr" },
                { name: "Farm Fresh Eggs", qty: "4 Dozen" },
                { name: "Local Onions", qty: "5 kg" }
            ]
        },
        {
            id: "ORD-2026-8731",
            date: "01 Sep 2026",
            cardName: "Bachelor Essential Pack",
            duration: "15 Days",
            originalPrice: 2800,
            discount: 300,
            paidAmount: 2500,
            paymentMethod: "Credit / Debit Card",
            paymentStatus: "Paid",
            orderStatus: "Completed",
            startDate: "02 Sep 2026",
            endDate: "17 Sep 2026",
            address: "Flat 4A, Green Heaven, Banani, Dhaka",
            items: [
                { name: "Aromatic Chinigura Rice", qty: "5 kg" },
                { name: "Lentil (Musur Dal)", qty: "2 kg" },
                { name: "Fresh Milk", qty: "5 Ltr" }
            ]
        },
        {
            id: "ORD-2026-7640",
            date: "15 Aug 2026",
            cardName: "Compact Duo Pack",
            duration: "7 Days",
            originalPrice: 1400,
            discount: 200,
            paidAmount: 1200,
            paymentMethod: "Cash on Delivery",
            paymentStatus: "Paid",
            orderStatus: "Expired",
            startDate: "16 Aug 2026",
            endDate: "23 Aug 2026",
            address: "House 24, Road 5, Block B, Dhanmondi, Dhaka",
            items: [
                { name: "Fresh Vegetables Mix", qty: "5 kg" },
                { name: "Broiler Chicken", qty: "2 kg" }
            ]
        }
    ]);

    // UI States
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null); // For Details Modal
    const [invoiceOrder, setInvoiceOrder] = useState(null);   // For Invoice Modal
    const [invoiceLang, setInvoiceLang] = useState("en");     // 'en' or 'bn'

    // Filter Logic
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.cardName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.orderStatus.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const handlePrintInvoice = () => {
        window.print();
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 py-6 px-4 sm:px-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900">Order History</h1>
                    <p className="text-xs text-slate-500 mt-1">View all past subscription orders, download invoices, and renew active packages.</p>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                        type="text"
                        placeholder="Search by Order ID or Card..."
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
                        <option value="all">All Orders</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>
            </div>

            {/* Orders Table / Cards List */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                {filteredOrders.length === 0 ? (
                    <div className="p-12 text-center text-xs text-slate-400 font-medium">
                        No orders matching your search or filter.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
                                    <th className="py-4 px-6">Order ID & Date</th>
                                    <th className="py-4 px-6">Subscription Card</th>
                                    <th className="py-4 px-6">Amount Paid</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/80 transition">
                                        <td className="py-4 px-6">
                                            <div className="font-extrabold text-slate-900">{order.id}</div>
                                            <div className="text-[11px] text-slate-500 mt-0.5">{order.date}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-slate-800">{order.cardName}</div>
                                            <div className="text-[11px] text-emerald-700 font-semibold">{order.duration} Plan</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-black text-slate-900">৳{order.paidAmount}</div>
                                            <div className="text-[10px] text-slate-400 line-through">৳{order.originalPrice}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${order.orderStatus === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                                    order.orderStatus === 'Completed' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                                        'bg-slate-100 text-slate-600 border border-slate-200'
                                                }`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setInvoiceOrder(order)}
                                                    className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition"
                                                    title="Download Invoice"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-[11px] font-bold hover:bg-emerald-700 transition flex items-center gap-1"
                                                >
                                                    <RefreshCw className="w-3 h-3" /> Re-order
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* --- 1. ORDER DETAILS MODAL --- */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <span className="text-[10px] font-extrabold uppercase text-slate-400">Order Details</span>
                                <h3 className="text-lg font-black text-slate-900">{selectedOrder.id}</h3>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-1 text-slate-400 hover:text-slate-700 font-bold">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4 text-xs">
                            {/* Card & Price Breakdown */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-extrabold text-slate-900 text-sm">{selectedOrder.cardName}</span>
                                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg">{selectedOrder.duration}</span>
                                </div>
                                <div className="pt-2 border-t border-slate-200/60 space-y-1">
                                    <div className="flex justify-between text-slate-500">
                                        <span>Original Card Price:</span>
                                        <span>৳{selectedOrder.originalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-emerald-700 font-bold">
                                        <span>Discount Savings:</span>
                                        <span>-৳{selectedOrder.discount}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-200">
                                        <span>Total Amount Paid:</span>
                                        <span className="text-emerald-700">৳{selectedOrder.paidAmount}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Dates & Payment */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                        <Calendar className="w-3 h-3 text-emerald-600" /> Active Period
                                    </span>
                                    <div className="font-bold text-slate-800">{selectedOrder.startDate}</div>
                                    <div className="text-[11px] text-slate-500">to {selectedOrder.endDate}</div>
                                </div>
                                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                        <CreditCard className="w-3 h-3 text-emerald-600" /> Payment
                                    </span>
                                    <div className="font-bold text-slate-800">{selectedOrder.paymentMethod}</div>
                                    <div className="text-[11px] text-emerald-700 font-bold">Status: {selectedOrder.paymentStatus} ✓</div>
                                </div>
                            </div>

                            {/* Delivery Address */}
                            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-emerald-600" /> Delivery Address
                                </span>
                                <p className="font-semibold text-slate-800">{selectedOrder.address}</p>
                            </div>

                            {/* Included Package Items */}
                            <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Included Items List</span>
                                <div className="grid grid-cols-2 gap-2">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                                            <span className="font-bold text-slate-700">{item.name}</span>
                                            <span className="text-emerald-700 font-extrabold">{item.qty}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- 2. INVOICE MODAL (PDF / PRINTABLE) --- */}
            {invoiceOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 space-y-6">

                        {/* Top Action Bar (Non-printable) */}
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 print:hidden">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setInvoiceLang(invoiceLang === 'en' ? 'bn' : 'en')}
                                    className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-100 transition"
                                >
                                    <Globe className="w-3.5 h-3.5 text-emerald-600" />
                                    {invoiceLang === 'en' ? 'বাংলা ভার্সন' : 'English Version'}
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePrintInvoice}
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition flex items-center gap-1.5 shadow-sm"
                                >
                                    <Printer className="w-4 h-4" /> Download / Print PDF
                                </button>
                                <button onClick={() => setInvoiceOrder(null)} className="p-1 text-slate-400 hover:text-slate-700 font-bold">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Invoice Printable Sheet */}
                        <div className="space-y-6 text-slate-900 p-2">

                            {/* Invoice Brand Header */}
                            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                                <div>
                                    <h2 className="text-2xl font-black text-emerald-800">Bazaar Card</h2>
                                    <p className="text-[11px] text-slate-500 font-bold">Grocery Subscription Services</p>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-lg font-black uppercase text-slate-700">
                                        {invoiceLang === 'en' ? 'INVOICE' : 'ইনভয়েস / রসিদ'}
                                    </h3>
                                    <p className="text-xs font-bold text-slate-500">#{invoiceOrder.id}</p>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <span className="font-extrabold text-slate-400 uppercase text-[10px]">
                                        {invoiceLang === 'en' ? 'Billed To' : 'গ্রাহকের নাম ও ঠিকানা'}
                                    </span>
                                    <div className="font-bold text-slate-900 mt-1">Valued Customer</div>
                                    <div className="text-slate-600">{invoiceOrder.address}</div>
                                </div>
                                <div className="text-right space-y-1">
                                    <div>
                                        <span className="font-bold text-slate-400">{invoiceLang === 'en' ? 'Order Date: ' : 'অর্ডারের তারিখ: '}</span>
                                        <span className="font-extrabold">{invoiceOrder.date}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold text-slate-400">{invoiceLang === 'en' ? 'Payment Method: ' : 'পেমেন্ট মেথড: '}</span>
                                        <span className="font-extrabold">{invoiceOrder.paymentMethod}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Items Table */}
                            <div className="border border-slate-200 rounded-2xl overflow-hidden">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                                        <tr>
                                            <th className="p-3">{invoiceLang === 'en' ? 'Description' : 'বিবরণ'}</th>
                                            <th className="p-3">{invoiceLang === 'en' ? 'Duration' : 'মেয়াদ'}</th>
                                            <th className="p-3 text-right">{invoiceLang === 'en' ? 'Amount' : 'মূল্য'}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 font-medium">
                                        <tr>
                                            <td className="p-3 font-bold">{invoiceOrder.cardName}</td>
                                            <td className="p-3">{invoiceOrder.duration}</td>
                                            <td className="p-3 text-right font-bold">৳{invoiceOrder.originalPrice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Total Calculation */}
                            <div className="flex justify-end text-xs">
                                <div className="w-60 space-y-1.5 pt-2">
                                    <div className="flex justify-between text-slate-600">
                                        <span>{invoiceLang === 'en' ? 'Subtotal:' : 'উপমোট:'}</span>
                                        <span>৳{invoiceOrder.originalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-emerald-700 font-bold">
                                        <span>{invoiceLang === 'en' ? 'Discount:' : 'ছাড়:'}</span>
                                        <span>-৳{invoiceOrder.discount}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
                                        <span>{invoiceLang === 'en' ? 'Total Paid:' : 'সর্বমোট পরিশোধিত:'}</span>
                                        <span className="text-emerald-700">৳{invoiceOrder.paidAmount}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Note */}
                            <div className="pt-6 border-t border-slate-100 text-center text-[11px] text-slate-400 font-medium">
                                {invoiceLang === 'en'
                                    ? 'Thank you for subscribing with Bazaar Card! Chart-Lock Guarantee Included.'
                                    : 'বাজার কার্ডের সাথেই থাকার জন্য ধন্যবাদ! চার্ট-লক গ্যারান্টি অন্তর্ভুক্ত।'}
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}