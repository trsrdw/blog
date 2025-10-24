import style from "./style.module.scss";
import Link from "next/link";
import SvgIcon from "@/lib/utils/svg";
import { contacts } from "@/lib/helper/list";

export default function Header() {
    return (
        <nav className={style.navbar}>
            <ul className={style.contacts}>
                {contacts.map((item) => (
                    <li key={item.link}>
                        <Link href={item.link} target="_blank"><SvgIcon url={item.logo} /></Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}