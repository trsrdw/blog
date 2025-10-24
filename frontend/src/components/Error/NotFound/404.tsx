"use client";
import Link from "next/link";
import style from "./style.module.scss";
import { useEffect } from "react";
import { useErrorContext } from "@/lib/context/errorcontext";

export default function Error404() {
    const { setHasError } = useErrorContext();

    useEffect(() => {
        setHasError(true);
        return () => setHasError(false);
    }, [setHasError]);

    return (
        <main className={style.notfound}>
            <div className={style.title}>
                <h1>404</h1>
                <p>Sorry, the page you’re looking for doesn’t exist.</p>
            </div>
            <Link href="/" className={style.primary}>Go back home</Link>
        </main>
    );
}