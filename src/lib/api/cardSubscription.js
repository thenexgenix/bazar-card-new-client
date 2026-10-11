import { serverFetch } from "@/lib/core/server";

export async function getUserSubscriptionsApi(userId) {
    try {
        const res = await serverFetch(`/api/subscriptions/${userId}`);
        return res;
    } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
        return { success: false, data: [] };
    }
}