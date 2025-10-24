"use client";
import ErrorClient from "@/components/Error/Throw/error";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return <ErrorClient msg={error.message} reset={reset} />;
}