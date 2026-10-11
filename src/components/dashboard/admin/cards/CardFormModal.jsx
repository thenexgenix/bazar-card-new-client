'use client';

import { useState, useEffect } from 'react';
import { Calculator, Plus, Trash2, Image as ImageIcon, Loader2, CheckCircle } from 'lucide-react';
import { uploadToCloudinary } from '@/lib/upload';

const initialFormState = {
    name: '',
    slug: '',
    image: '',
    familySize: '',
    assumedComposition: '2 Adults + 2 Kids',
    description: '',
    plans: [
        { durationDays: 7, price: 0 },
        { durationDays: 15, price: 0 },
        { durationDays: 30, price: 0 },
    ],
    perPersonAmount: 0,
    products: [],
    estimatedBasketCost: 3500,
    foodChartVersion: 'v1.2-Standard',
    rules: {
        included: '',
        notIncluded: '',
        terms: ''
    }
};

export default function CardFormModal({ isOpen, onClose, onSubmit, editingCard }) {
    const [formData, setFormData] = useState(initialFormState);
    const [newProduct, setNewProduct] = useState({ name: '', quantity: '', unit: 'kg' });
    const [uploadingImage, setUploadingImage] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        if (isOpen) {
            if (editingCard) {
                setFormData({
                    name: editingCard.name || '',
                    slug: editingCard.slug || '',
                    image: editingCard.image || '',
                    familySize: editingCard.familySize || 4,
                    assumedComposition: editingCard.assumedComposition || '',
                    description: editingCard.description || '',
                    plans: editingCard.plans || [
                        { durationDays: 7, price: 0 },
                        { durationDays: 15, price: 0 },
                        { durationDays: 30, price: 0 },
                    ],
                    perPersonAmount: editingCard.perPersonAmount || 0,
                    products: editingCard.products || [],
                    estimatedBasketCost: editingCard.estimatedBasketCost || 3500,
                    foodChartVersion: editingCard.foodChartVersion || 'v1.2-Standard',
                    rules: editingCard.rules || { included: '', notIncluded: '', terms: '' }
                });
            } else {
                setFormData(initialFormState);
            }
        }
    }, [isOpen, editingCard]);

    if (!isOpen) return null;

    // Live calculation logic
    const monthPlan = formData.plans.find(p => p.durationDays === 30) || formData.plans[0];
    const calculatedPerPersonDay = monthPlan ? (monthPlan.price / (formData.familySize * monthPlan.durationDays)).toFixed(2) : 0;
    const perPersonDay = formData.perPersonAmount > 0 ? formData.perPersonAmount : calculatedPerPersonDay;

    const estimatedMargin = monthPlan ? monthPlan.price - formData.estimatedBasketCost : 0;
    const marginPercentage = monthPlan && monthPlan.price > 0 ? ((estimatedMargin / monthPlan.price) * 100).toFixed(1) : 0;

    const handleAddProduct = () => {
        if (!newProduct.name) return;
        setFormData({
            ...formData,
            products: [...formData.products, newProduct]
        });
        setNewProduct({ name: '', quantity: '', unit: 'kg' });
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = formData.products.filter((_, i) => i !== index);
        setFormData({ ...formData, products: updatedProducts });
    };

    // Cloudinary Image Upload Handler
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploadingImage(true);
            setMessage({ type: "", text: "" });
            const uploadedResult = await uploadToCloudinary(file);
            if (uploadedResult && uploadedResult.url) {
                setFormData((prev) => ({ ...prev, image: uploadedResult.url }));
                setMessage({ type: "success", text: "Image uploaded successfully!" });
            }
            else {
                setMessage({ type: "error", text: "Image uploading failed!" });
            }
        } catch (error) {
            console.error("Image upload error:", error);
            setMessage({ type: "error", text: "Image uploading failed" });
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-extrabold text-slate-900">
                        {editingCard ? 'Edit Subscription Card' : 'Create Subscription Card'}
                    </h2>
                    <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 font-bold text-lg">✕</button>
                </div>

                <form onSubmit={handleSubmitForm} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Card Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Standard Family Pack"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Slug</label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="e.g. standard-family-pack"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                            />
                        </div>
                    </div>

                    {/* Image Upload Field using Cloudinary */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Card Image</span>
                        </label>
                        <div className="space-y-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 focus:outline-none"
                            />
                            {uploadingImage && (
                                <p className="text-xs text-emerald-600 flex items-center gap-1.5 font-medium">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading image to Cloudinary...
                                </p>
                            )}
                            {formData.image && !uploadingImage && (
                                <div className="flex items-center gap-3 mt-2">
                                    <img src={formData.image} alt="Preview" className="w-14 h-14 object-cover rounded-lg border border-slate-200" />
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="Image URL or uploaded link"
                                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                                    />
                                </div>
                            )}
                        </div>

                        {message.text && (
                            <div className={`p-1 mt-2 rounded-lg text-[12px] flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                                <CheckCircle size={16} /> {message.text}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Family Size</label>
                            <input
                                type="number"
                                required
                                value={formData.familySize}
                                placeholder='e.g. 4'
                                onChange={(e) => setFormData({ ...formData, familySize: Number(e.target.value) })}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Assumed Composition</label>
                            <input
                                type="text"
                                value={formData.assumedComposition}
                                onChange={(e) => setFormData({ ...formData, assumedComposition: e.target.value })}
                                placeholder="e.g. 2 Adults + 2 Kids"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Per Person Daily(৳)</label>
                        <input
                            type="number"
                            value={formData.perPersonAmount}
                            onChange={(e) => setFormData({ ...formData, perPersonAmount: Number(e.target.value) })}
                            placeholder="Leave 0 for auto-calculation"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                        />
                    </div>

                    {/* Plans pricing */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                        <span className="text-xs font-extrabold text-slate-800 uppercase block">Plans & Duration Pricing</span>
                        <div className="grid grid-cols-3 gap-3">
                            {formData.plans.map((plan, index) => (
                                <div key={index} className="bg-white p-3 rounded-xl border border-slate-200">
                                    <span className="text-[11px] font-bold text-emerald-700 block mb-1">{plan.durationDays} Days</span>
                                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Price (৳)</label>
                                    <input
                                        type="number"
                                        value={plan.price}
                                        onChange={(e) => {
                                            const newPlans = [...formData.plans];
                                            newPlans[index].price = Number(e.target.value);
                                            setFormData({ ...formData, plans: newPlans });
                                        }}
                                        className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs font-bold focus:outline-none focus:border-emerald-600"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Management Section */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                        <span className="text-xs font-extrabold text-slate-800 uppercase block">Included Products / Items</span>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Product name (e.g. Rice)"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-emerald-600"
                            />
                            <input
                                type="text"
                                placeholder="Qty (e.g. 5)"
                                value={newProduct.quantity}
                                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                                className="w-20 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-emerald-600"
                            />
                            <select
                                value={newProduct.unit}
                                onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                                className="w-20 px-2 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-emerald-600"
                            >
                                <option value="kg">kg</option>
                                <option value="ltr">ltr</option>
                                <option value="pcs">pcs</option>
                                <option value="pkt">pkt</option>
                            </select>
                            <button
                                type="button"
                                onClick={handleAddProduct}
                                className="px-3.5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition flex items-center justify-center"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {formData.products.length > 0 && (
                            <div className="space-y-1.5 max-h-32 overflow-y-auto mt-2">
                                {formData.products.map((prod, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
                                        <span className="font-medium text-slate-700">{prod.name} - <strong className="text-emerald-700">{prod.quantity} {prod.unit}</strong></span>
                                        <button type="button" onClick={() => handleRemoveProduct(idx)} className="text-rose-500 hover:text-rose-700">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cost & Margin Panel */}
                    <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 flex items-center justify-between">
                        <div>
                            <span className="text-xs font-extrabold text-emerald-900 block flex items-center gap-1.5">
                                <Calculator className="w-4 h-4 text-emerald-600" />
                                <span>Live Margin Analysis</span>
                            </span>
                            <p className="text-[11px] text-emerald-700 mt-0.5">
                                Per Person/Day: <strong className="text-emerald-900">৳{perPersonDay}</strong> | Margin: <strong className="text-emerald-900">৳{estimatedMargin} ({marginPercentage}%)</strong>
                            </p>
                        </div>
                        <div className="w-32">
                            <label className="text-[10px] font-bold text-emerald-800 block mb-0.5">Basket Cost</label>
                            <input
                                type="number"
                                value={formData.estimatedBasketCost}
                                onChange={(e) => setFormData({ ...formData, estimatedBasketCost: Number(e.target.value) })}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-emerald-300 text-xs font-bold bg-white focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Food Chart Version</label>
                        <input
                            type="text"
                            value={formData.foodChartVersion}
                            onChange={(e) => setFormData({ ...formData, foodChartVersion: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                        />
                    </div>

                    <div className="space-y-3">
                        <span className="text-xs font-extrabold text-slate-800 uppercase block">Rules</span>
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={formData.rules.included}
                                onChange={(e) => setFormData({ ...formData, rules: { ...formData.rules, included: e.target.value } })}
                                placeholder="Included items"
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                            />
                            <input
                                type="text"
                                value={formData.rules.notIncluded}
                                onChange={(e) => setFormData({ ...formData, rules: { ...formData.rules, notIncluded: e.target.value } })}
                                placeholder="Not included items"
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                            />
                            <input
                                type="text"
                                value={formData.rules.terms}
                                onChange={(e) => setFormData({ ...formData, rules: { ...formData.rules, terms: e.target.value } })}
                                placeholder="Terms"
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                        <textarea
                            rows={2}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder='Write package description here...'
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-600 resize-none"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploadingImage}
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20 disabled:opacity-50"
                        >
                            {editingCard ? 'Update Card' : 'Save & Publish'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}