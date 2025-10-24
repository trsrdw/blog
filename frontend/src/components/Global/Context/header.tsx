"use client";
import Header from "@/components/Global/Header/header";
import { useErrorContext } from "@/lib/context/errorcontext";

export default function HeaderCondition() {
    const { hasError } = useErrorContext();

    if (hasError) return null;
    return <Header />;
}
