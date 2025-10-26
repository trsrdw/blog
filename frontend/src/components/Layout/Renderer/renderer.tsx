"use client";

import { FC, ReactNode } from "react";
import {
    BlocksRenderer,
    BlocksContent,
} from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Link from "next/link";
import style from "./style.module.scss";
import Typography from "../Typography/typography";

interface PostRendererProps {
    content: BlocksContent;
    className?: string;
    component?: string;
}

interface BlockProps {
    children?: ReactNode;
    level?: number;
    format?: "ordered" | "unordered";
    image?: {
        url: string;
        alternativeText?: string | null;
        caption?: string | null;
        width: number;
        height: number;
    };
}

interface ModifierProps {
    children?: ReactNode;
    node?: { url?: string };
}

const PostRenderer: FC<PostRendererProps> = ({
    content,
    className = "",
    component = "",
}) => {
    const blocks = {
        paragraph: ({ children }: BlockProps) => <p>{children}</p>,

        heading: ({ children, level = 1 }: BlockProps) => {
            switch (level) {
                case 1:
                    return <Typography variant="h1">{children}</Typography>;
                case 2:
                    return <Typography variant="h2">{children}</Typography>;
                case 3:
                    return <Typography variant="h3">{children}</Typography>;
                case 4:
                    return <Typography variant="h4">{children}</Typography>;
                case 5:
                    return <Typography variant="h5">{children}</Typography>;
                case 6:
                    return <Typography variant="h6">{children}</Typography>;
                default:
                    return <Typography variant="h1">{children}</Typography>;
            }
        },

        list: ({ children, format }: BlockProps) =>
            format === "ordered" ? <ol>{children}</ol> : <ul>{children}</ul>,

        "list-item": ({ children }: BlockProps) => <li>{children}</li>,

        quote: ({ children }: BlockProps) => (
            <blockquote className={style.quote}>{children}</blockquote>
        ),

        image: ({ image }: BlockProps) =>
            image ? (
                <figure>
                    <div
                        className={`${style.photo} ${component === "collaboration" ? style.collab : ""
                            }`}
                    >
                        <Image
                            src={image.url}
                            alt={image.alternativeText || "Image"}
                            fill
                            sizes="90%"
                        />
                    </div>
                    {image.caption && (
                        <figcaption className={style.imgCaption}>
                            {image.caption}
                        </figcaption>
                    )}
                </figure>
            ) : null,

        code: ({ children }: BlockProps) => (
            <pre>
                <code>{children}</code>
            </pre>
        ),
    };

    const modifiers = {
        bold: ({ children }: { children?: ReactNode }) => (
            <strong>{children}</strong>
        ),
        italic: ({ children }: { children?: ReactNode }) => (
            <span className="italic">{children}</span>
        ),
        link: ({ children, node }: ModifierProps) => (
            <Link href={node?.url || "#"}>{children}</Link>
        ),
    };

    return (
        <div className={`${style.article} ${className}`}>
            <BlocksRenderer content={content} blocks={blocks} modifiers={modifiers} />
        </div>
    );
};

export default PostRenderer;