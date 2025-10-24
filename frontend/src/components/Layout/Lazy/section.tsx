"use client";
import { useEffect, useState, useRef } from "react";

interface LazySectionProps {
    children: React.ReactNode;
    fallback: React.ReactNode;
}

export default function LazySection({ children, fallback }: LazySectionProps) {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return <div className="lazyloader" ref={ref}>{inView ? children : fallback}</div>;
}
