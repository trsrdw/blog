import { BlocksContent } from "@strapi/blocks-react-renderer";

export interface LoaderProps {
    item?: boolean;
}

export interface ErrorProps {
    msg?: string;
    reset?: () => void;
}

export interface PageProps {
    params: {
        slug: string;
    };
}

export type Section = {
    label: string;
    href: string;
};

export interface PostsResponse<T> {
    data: T;
    meta: unknown;
}

export interface Media {
    url: string;
    alternativeText?: string | null;
    name?: string;
    width?: number;
    height?: number;
}

export interface Category {
    title: string;
    description: string;
}

export interface Categories {
    data: Category[];
}

export interface Post {
    id: number;
    documentId: string;
    title: string;
    excerpt: string;
    slug: string;
    banner?: Media | null;
    body: BlocksContent;
    writer: string;
    locale: string;
    categories: Category[];
    reference: string | null;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface DataProps {
    data: Post[];
}

export interface PostPage {
    data: Post;
    related: Post[];
}