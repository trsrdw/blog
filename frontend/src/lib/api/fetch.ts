import qs from "qs";
import { flattenAttributes, getStrapiURL } from "../utils/general";
import { Post, PostsResponse } from "../types/data";

type FetchOptions = {
    authToken?: string;
};

/**
 * Fetches data from a given URL, with optional Bearer token authorization.
 */
export async function fetchData<T = unknown>(
    url: string,
    { authToken }: FetchOptions = {}
): Promise<T> {
    const headers: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        cache: "no-store",
    };

    try {
        const response = await fetch(url, headers);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        return flattenAttributes(data) as T;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

/**
 * Fetches navigation (header) data from Strapi.
 */
export async function getPosts(lang: string): Promise<PostsResponse<Post[]>> {
    const path = "/api/posts";
    const baseUrl = getStrapiURL();

    const query = qs.stringify({
        locale: lang,
        populate: {
            banner: {
                fields: ["url", "alternativeText", "name", "height", "width"],
            },
            categories: {
                populate: true,
            }
        },
        sort: ["createdAt:desc"],
    });

    const url = new URL(path, baseUrl);
    url.search = query;

    try {
        const data = fetchData<PostsResponse<Post[]>>(url.href);
        // console.log("📦 Posts data:", data);
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Failed to fetch posts data:`, error.message);
        }
        throw error;
    }
}