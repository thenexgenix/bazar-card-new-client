'use client';

import { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import CardItem from './CardItem';
import CardFormModal from './CardFormModal';
import { createCardAction, updateCardAction, toggleCardStatusAction, deleteCardAction } from '@/lib/action/cards';

export default function CardModalWrapper({ initialCards }) {
    const [cards, setCards] = useState(initialCards);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCard, setEditingCard] = useState(null);

    const handleOpenCreate = () => {
        setEditingCard(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (card) => {
        setEditingCard(card);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (formData) => {
        let res;
        if (editingCard) {
            res = await updateCardAction(editingCard._id, formData);
        } else {
            res = await createCardAction(formData);
        }

        if (res.success) {
            setIsModalOpen(false);
            window.location.reload(); 
        } else {
            alert(res.message || 'Operation failed!');
        }
    };

    const handleToggleStatus = async (id) => {
        const res = await toggleCardStatusAction(id);
        if (res.success) {
            window.location.reload();
        } else {
            alert(res.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to soft-delete this card?')) return;
        const res = await deleteCardAction(id);
        if (res.success) {
            window.location.reload();
        } else {
            alert(res.message); 
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <button
                    onClick={handleOpenCreate}
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-emerald-600/20 transition"
                >
                    <Plus className="w-5 h-5" />
                    <span>Create New Card</span>
                </button>
            </div>

            {cards.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                    <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600 font-bold text-sm">No cards found. Please Create a new card.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <CardItem
                            key={card._id}
                            card={card}
                            onEdit={handleOpenEdit}
                            onToggleStatus={handleToggleStatus}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <CardFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                editingCard={editingCard}
            />
        </div>
    );
}