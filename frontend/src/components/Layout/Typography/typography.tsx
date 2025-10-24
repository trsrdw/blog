import React from "react";
import style from "./style.module.scss";

type TypographyVariant = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";

interface TypographyProps {
    variant?: TypographyVariant;
    children: React.ReactNode;
}

export default function Typography({ variant = "p", children }: TypographyProps) {
    const Tag: keyof React.JSX.IntrinsicElements = variant;
    return <Tag className={style[variant]}>{children}</Tag>;
}
