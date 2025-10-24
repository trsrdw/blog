"use client";
import style from "./style.module.scss";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.profile}>
                <div className={style.head}>
                    <div className={style.avatar}><Image src={"/tiara.png"} alt="Tiara" width={295} height={520} /></div>
                    <div className={style.name}>
                        <h1><span>Tiara</span> S. Dewi</h1>
                        <p>Frontend Developer</p>
                    </div>
                </div>

                <div className={style.tail}>
                    <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
                    <p>tiarasd.work@gmail.com</p>
                </div>
            </div>
        </footer>
    );
}