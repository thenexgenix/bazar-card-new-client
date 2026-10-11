import { serverMutation } from "@/lib/core/server";

export async function cardSubscription(formData) {
    const res = await serverMutation('/api/subscriptions', formData, 'POST');
    return res;
}

export async function updateSubscriptionDate(subId, startDate) {
    const res = await serverMutation(`/api/subscriptions/${subId}/date`, { startDate }, 'PATCH');
    return res;
}

export async function updateSubscriptionStatus(subId, status) {
    const res = await serverMutation(`/api/subscriptions/${subId}/status`, { status }, 'PATCH');
    return res;
}

export async function paySubscription(subId) {
    const res = await serverMutation(`/api/subscriptions/${subId}/pay`, {}, 'PATCH');
    return res;
}