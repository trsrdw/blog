import { useEffect, useState } from "react";

interface SvgProps {
    url: string;
}

export default function SvgIcon({ url }: SvgProps) {
    const [svg, setSvg] = useState<string>("");

    useEffect(() => {
        fetch(url)
            .then(res => res.text())
            .then(setSvg)
            .catch(err => console.error("Error loading SVG:", err));
    }, [url]);

    return (
        <div
            style={{ height: "fit-content", display: "grid", placeContent: "center" }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
