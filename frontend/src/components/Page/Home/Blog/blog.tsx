"use client";
import style from "./style.module.scss";

export default function BlogSection() {
    return (
        <div id="blog" className={style.blog}>
            <h1>Personal <span>Blog</span></h1>

            <div className={style.content}>
                <p>Coming Soon !</p>
            </div>
        </div>
    );
}