"use client";
import { contacts } from "@/lib/helper/list";
import style from "./style.module.scss";
import SvgIcon from "@/lib/utils/svg";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.span}>
                <p>&copy; {new Date().getFullYear()}. Tiara S. Dewi. All rights reserved.</p>
                <div className={style.socials}>
                    {contacts.map((social) => (
                        <Link href={social.link} target="_blank" key={social.label}>
                            <SvgIcon url={social.logo} />
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}