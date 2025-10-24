"use client";
import SvgIcon from "@/lib/utils/svg";
import Image from "next/image";
import style from "./style.module.scss";
import { useIsTablet } from "@/lib/utils/mediaquery";
import { Section } from "@/lib/types/data";
import { motion, Variants } from "framer-motion";

export default function HeroSection() {
    const isTablet = useIsTablet();
    const available = true;

    const sections: Section[] = [
        { label: "about", href: "about" },
        { label: isTablet ? "journey" : "journey", href: "journey" },
        { label: "projects", href: "projects" },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "tween", duration: 0.4, ease: "easeOut" }
        },
    };

    return (
        <div className={style.hero}>
            <div className={style.title}>
                <div className={style.name}>
                    <h1>Tiara S. Dewi</h1>

                    <div className={style.info}>
                        <div className={style.location}><SvgIcon url={"/location.svg"} /> <p>Bandung, <span>Indonesia</span></p></div>

                        <div className={`${style.availability} ${available ? style.positive : style.negative}`}>
                            <span></span>
                            <p>{available ? "Open to opportunities" : "Currently focused on existing work"}</p>
                        </div>
                    </div>
                </div>
                <div className={style.role}>
                    <h2>Frontend</h2>
                    <h2>Developer</h2>
                </div>
            </div>

            <div className={style.arrow}>
                <span></span>
            </div>

            <div className={style.accent}>
                <Image
                    src="/mobile.png"
                    alt="Accent"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>

            <motion.ul
                className={style.navigation}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {sections.map((item) => (
                    <motion.li key={item.href} variants={itemVariants}>
                        <span className={style.line} />
                        <button
                            className={style.link}
                            onClick={() => scrollToSection(item.href)}
                        >
                            {item.label}
                        </button>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
}