'use server';

import { serverMutation } from "@/lib/core/server";
import { revalidatePath } from "next/cache";

export async function createCardAction(formData) {
    const res = await serverMutation('/api/admin/cards', formData, 'POST');
    if (res.success) {
        revalidatePath('/dashboard/admin/cards');
    }
    return res;
}

export async function updateCardAction(id, formData) {
    const res = await serverMutation(`/api/admin/cards/${id}`, formData, 'PUT');
    if (res.success) {
        revalidatePath('/dashboard/admin/cards');
    }
    return res;
}

export async function toggleCardStatusAction(id) {
    const res = await serverMutation(`/api/admin/cards/${id}/toggle-status`, {}, 'PATCH');
    if (res.success) {
        revalidatePath('/dashboard/admin/cards');
    }
    return res;
}

export async function deleteCardAction(id) {
    const res = await serverMutation(`/api/admin/cards/${id}`, {}, 'DELETE');
    if (res.success) {
        revalidatePath('/dashboard/admin/cards');
    }
    return res;
}