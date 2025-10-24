"use client";
import style from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { tools } from "@/lib/helper/list";
import { useIsMobile } from "@/lib/utils/mediaquery";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function AboutSection() {
    const isMobile = useIsMobile();
    const toolsRef = useRef<HTMLUListElement>(null);
    const [visibleCount, setVisibleCount] = useState(4);
    const [desktopInView, setDesktopInView] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const containerVariants: Variants = {
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
    };

    const card: Variants = {
        hidden: { opacity: 1, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
        exit: { opacity: 0, y: 20, transition: { duration: 0.3, ease: "easeIn" } },
    };

    const handleToggle = () => {
        setHasInteracted(true);
        if (visibleCount >= tools.length) {
            setVisibleCount(4);
        } else {
            setVisibleCount((prev) => prev + 2);
        }
    };

    const visibleTools = isMobile ? tools.slice(0, visibleCount) : tools;
    const allVisible = visibleCount >= tools.length;

    useEffect(() => {
        if (isMobile) return;
        if (!toolsRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setDesktopInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(toolsRef.current);

        return () => observer.disconnect();
    }, [isMobile]);

    return (
        <div id="about" className={style.about}>
            <h1><span>About</span> & Skills</h1>
            <p>
                I specialize in building modern, responsive web
                applications using <strong>React.js</strong> and <strong>Next.js</strong>. With over three years of hands-on experience, I&#39;ve contributed to a wide range of projects—from dynamic landing pages to complex web platforms. While my core strength lies in frontend development, I&#39;m currently expanding my skillset as a Fullstack Developer, gaining valuable experience in backend technologies and API integration.
            </p>

            <p>These are the tools I use currently:</p>
            <motion.ul
                ref={toolsRef}
                className={`${style.tools} ${desktopInView ? style.animate : ""}`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
            >
                <AnimatePresence>
                    {visibleTools.map((item) => (
                        <motion.li
                            key={item.label}
                            variants={card}
                            initial={hasInteracted ? "hidden" : false}
                            animate={hasInteracted ? "show" : false}
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <div className={style.tool}>
                                <Link href={item.link} target="_blank">
                                    <Image className={style.logo} src={item.logo} alt={item.label} width={128} height={128} />
                                    <span className={style.label}>{item.label}</span>
                                </Link>
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </motion.ul>

            {isMobile && (
                <motion.button
                    className={style.more}
                    onClick={handleToggle}
                    whileTap={{ scale: 0.96 }}
                >
                    {allVisible ? "Show Less" : "Load More"}
                </motion.button>
            )}
        </div>
    );
}