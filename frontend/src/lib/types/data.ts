export interface LoaderProps {
    item?: boolean;
}

export interface ErrorProps {
    msg?: string;
    reset?: () => void;
}

export type Section = {
    label: string;
    href: string;
};

export interface PostsResponse<T> {
    data: T;
    meta: unknown;
}


export interface Post {
    id: number;
    documentId: string;
    title: string;
    excerpt: string;
    slug: string;
    writer: string;
    locale: string;
    reference: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface DataProps {
    data: Post[];
}