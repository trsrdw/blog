import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tiarasdewi.com";

    return [
        { url: baseUrl, lastModified: new Date() },
    ];
}
