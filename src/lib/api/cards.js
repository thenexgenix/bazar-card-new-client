import { serverFetch } from "@/lib/core/server";

export async function getAdminCards() {
    try {
        const response = await serverFetch('/api/cards');
        return response;
    } catch (error) {
        console.error("Failed to fetch cards:", error);
        return { success: false, data: [] };
    }
}