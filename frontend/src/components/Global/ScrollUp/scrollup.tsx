"use client";
import { useEffect, useState } from "react";
import SvgIcon from "@/lib/utils/svg";
import style from "./style.module.scss";

export default function ScrollUp() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) setVisible(true);
            else setVisible(false);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            className={`${style.scroll} ${visible ? style.show : ""}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <SvgIcon url="/chevron-up.svg" />
        </button>
    );
}
