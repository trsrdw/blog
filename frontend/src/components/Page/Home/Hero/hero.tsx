import Image from "next/image";
import Link from "next/link";
import style from "./style.module.scss";
import { DataProps } from "@/lib/types/data";
import { getStrapiMedia } from "@/lib/utils/general";

export default function HeroSection({ data = [] }: DataProps) {
    if (data.length === 0) return <p>No posts available.</p>;
    const featuredPost = data[0];
    const otherPosts = data.slice(1);
    const categories = featuredPost.categories;
    return (
        <div className={style.hero}>
            {/* Featured post */}
            <Link
                href={`/posts/${featuredPost.slug}`}
                key={featuredPost.id}
                className={`${style.post} ${style.featured}`}
            >
                <div className={style.banner}>
                    <Image
                        src={getStrapiMedia(featuredPost.banner?.url) || "/placeholder.png"}
                        alt={featuredPost.title}
                        fill
                        sizes="100vw"
                    />
                    <div className={style.summary}>
                        <div className={style.category}>
                            {categories.map((category, index) => (
                                <span key={index}>{category.title}</span>
                            ))}
                        </div>
                        <div className={style.info}>
                            <h2>{featuredPost.title}</h2>
                            <p>{featuredPost.excerpt}</p>
                            <span>
                                By {featuredPost.writer} •{" "}
                                {new Date(featuredPost.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Other posts */}
            {otherPosts.map((post) => (
                <Link href={`/posts/${post.slug}`} key={post.id} className={style.post}>
                    <div className={style.banner}>
                        <Image
                            src={getStrapiMedia(post.banner?.url) || "/placeholder.png"}
                            alt={post.title}
                            fill
                            sizes="100vw"
                        />
                        <div className={style.summary}>
                            <div className={style.category}>
                                {post.categories.map((category, index) => (
                                    <span key={index}>{category.title}</span>
                                ))}
                            </div>
                            <h2>{post.title}</h2>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
