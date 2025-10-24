"use client";
import style from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import SvgIcon from "@/lib/utils/svg";
import { motion, Variants } from "framer-motion";

export default function ResumeSection() {
    const slideIn: Variants = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 0.25, transition: { duration: 0.8, delay: 0.4 } },
    };

    return (
        <div className={style.resume}>
            <div className={style.content}>
                <div className={style.text}>
                    <p>Discover what I can bring to your team.</p>
                    <motion.div whileTap={{ scale: 0.96 }}>
                        <Link
                            href="/CV - Tiara S. Dewi.pdf"
                            download
                            target="_blank"
                            className={style.download}
                        >

                            <SvgIcon url="/download.svg" />
                            <span>Download Resume</span>
                        </Link>
                    </motion.div>
                </div>
                <motion.div
                    className={style.shadow}
                    variants={slideIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <Image
                        src="/resume-preview.png"
                        alt="Resume preview"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </motion.div>
            </div>
        </div>
    );
}
