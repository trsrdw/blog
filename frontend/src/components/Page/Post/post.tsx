"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PostRenderer from "@/components/Layout/Renderer/renderer";
import { PostPage } from "@/lib/types/data";
import style from "./style.module.scss";
import { formatDate, getStrapiMedia, truncate } from "@/lib/utils/general";
import Image from "next/image";
import Link from "next/link";
import { useIsMobile, useIsTablet } from "@/lib/utils/mediaquery";

gsap.registerPlugin(ScrollTrigger);

export default function SinglePost({ data, related }: PostPage) {
    const stickyRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isTablet = useIsTablet();
    const isMobile = useIsMobile();

    useEffect(() => {
        const sticky = stickyRef.current;
        const container = containerRef.current;

        if (!sticky || !container || isTablet) return;

        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        const trigger = ScrollTrigger.create({
            trigger: container,
            start: `top top`,
            end: `bottom bottom`,
            pin: sticky,
            pinSpacing: false,
            invalidateOnRefresh: true,
            markers: false,
        });

        return () => {
            trigger.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [isTablet]);

    const playlistId = "4nhNIJ3xgXwnCwKeDvr6oL";

    return (
        <div className={style.post} ref={containerRef}>
            <div className={style.column}>
                <div className={style.banner}>
                    <Image
                        src={getStrapiMedia(data.banner?.url) || "/placeholder.png"}
                        alt={data.title}
                        fill
                        sizes="100%"
                        priority
                    />
                    <div className={style.header}>
                        <div className={style.label}>
                            {data.categories.map((cat) => (
                                <label key={cat.id}>{cat.title}</label>
                            ))}
                        </div>
                        <h1>{data.title}</h1>
                        <div className={style.info}>
                            <p>{formatDate(data.createdAt, "en")}</p>
                            <p>By {data.writer}</p>
                        </div>
                    </div>
                </div>

                <div className={style.content}>
                    <PostRenderer content={data.body} />
                </div>
                <div className={style.categories}>
                    <p>{data.categories.length > 1 ? "Categories:" : "Category:"}</p>
                    <div className={style.wrapper}>
                        {data.categories.map((category, index) => (
                            <span key={index}>{category.title}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`${style.column} ${style.sticky}`} ref={stickyRef}>
                <div className={style.recent}>
                    <h2>Recent Posts</h2>
                    <div className={style.cards}>
                        {related.map((item, index) => (
                            <div className={style.card} key={index}>
                                <div className={style.thumbnail}>
                                    <Image
                                        src={getStrapiMedia(item.banner?.url) || "/placeholder.png"}
                                        alt={item.title}
                                        fill
                                        sizes="50%"
                                    />
                                </div>
                                <div className={style.summary}>
                                    <h3>{item.title}</h3>
                                    <p>{truncate(item.excerpt, (isMobile ? 90 : (isTablet ? 60 : 80)))}</p>
                                    <Link href={item.slug}>Read More</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={style.spotify}>
                    <iframe
                        title="Spotify Embed: Recommendation Playlist"
                        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
                        width="100%"
                        height="100%"
                        style={{ minHeight: "152px" }}
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
}
