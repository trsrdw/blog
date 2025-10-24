"use client";

import Image from "next/image";
// import SvgIcon from "@/lib/utils/svg";
import style from "./style.module.scss";
import { DataProps } from "@/lib/types/data";

export default function HeroSection({ data = [] }: DataProps) {
    return (
        <div className={style.hero}>
            {data.length > 0 ? (
                data.map((post) => (
                    <div key={post.id} className={style.post}>
                        <h2>{post.title}</h2>
                        <p>{post.excerpt}</p>
                        <small>
                            By {post.writer} • {new Date(post.publishedAt).toLocaleDateString()}
                        </small>
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
}
