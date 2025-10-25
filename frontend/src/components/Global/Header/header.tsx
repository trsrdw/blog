"use client";
import Image from "next/image";
import style from "./style.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useIsTablet } from "@/lib/utils/mediaquery";

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Posts", href: "/posts" },
    ];

    const isTablet = useIsTablet();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <nav className={`${style.navbar} ${isScrolled ? style.colored : ""} ${isOpen ? style.menu : ""}`}>
            <Link href={"/"} className={`${style.logo} logo`}>
                <Image src={"/logo/logo-white.png"} alt="Logo" width={24} height={24} priority />
                <span>blog.tiara</span>
            </Link>

            <ul
                className={`${style.navigation} ${isTablet ? (isOpen ? style.show : "") : style.desktop
                    }`}
            >
                {navItems.map((item) => (
                    <li
                        key={item.href}
                        className={pathname === item.href ? style.active : ""}
                    >
                        <Link href={item.href}>{item.label}</Link>
                    </li>
                ))}
            </ul>

            {isTablet && (
                <button
                    className={`${style.menuToggle} ${isOpen ? style.open : ""}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                </button>
            )}
        </nav>
    );
}