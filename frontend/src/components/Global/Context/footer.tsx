"use client";
import { useErrorContext } from "@/lib/context/errorcontext";
import Footer from "@/components/Global/Footer/footer";

export default function FooterCondition() {
    const { hasError } = useErrorContext();

    if (hasError) return null;
    return <Footer />;
}