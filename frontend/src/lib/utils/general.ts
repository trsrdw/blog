/**
 * Recursively flattens Strapi-style nested data (attributes/data keys).
 */
export function flattenAttributes<T>(data: T): T {
    if (
        typeof data !== "object" ||
        data === null ||
        data instanceof Date ||
        typeof data === "function"
    ) {
        return data;
    }

    if (Array.isArray(data)) {
        return data.map((item) => flattenAttributes(item)) as unknown as T;
    }

    const flattened: Record<string, unknown> = {};

    for (const key in data as Record<string, unknown>) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) continue;

        const value = (data as Record<string, unknown>)[key];

        if (
            (key === "attributes" || key === "data") &&
            typeof value === "object" &&
            !Array.isArray(value)
        ) {
            Object.assign(flattened, flattenAttributes(value));
        } else {
            flattened[key] = flattenAttributes(value);
        }
    }

    return flattened as T;
}

/**
 * Returns Strapi base URL from env or fallback.
 */
export function getStrapiURL(): string {
    return process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337";
}

/**
 * Builds a complete media URL from Strapi.
 */
export function getStrapiMedia(url?: string | null): string | null {
    if (!url) return null;
    if (url.startsWith("data:")) return url;
    if (url.startsWith("http") || url.startsWith("//")) return url;
    return `${getStrapiURL()}${url}`;
}

/**
 * Extracts YouTube video ID from a given URL.
 */
export function extractYTid(url: string): string | null {
    const match = url.match(
        /(?:v=|\/embed\/|youtu\.be\/|\/v\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
}

/**
 * Truncates text to a maximum number of characters.
 */
export function truncate(text: string, max: number): string {
    return text.length > max ? text.slice(0, max).trim() + " …" : text;
}

/**
 * Truncates text to a maximum number of words.
 */
export function truncateWords(text: string, maxWords: number): string {
    const words = text.split(" ");
    return words.length > maxWords
        ? words.slice(0, maxWords).join(" ") + " …"
        : text;
}

/**
 * Formats a date string based on locale, adding English ordinals.
 */
export function formatDate(dateString: string, locale: "id" | "en" = "en"): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    const formatted = new Intl.DateTimeFormat(
        locale === "id" ? "id-ID" : "en-US",
        options
    ).format(date);

    if (locale === "en") {
        const day = date.getDate();
        const ordinal = (d: number): string => {
            if (d > 3 && d < 21) return "th";
            switch (d % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        };

        return formatted.replace(day.toString(), `${day}${ordinal(day)}`);
    }

    return formatted;
}
