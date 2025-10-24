
import { LoaderProps } from "@/lib/types/data";
import style from "./style.module.scss";

export function Loader({ item = false }: LoaderProps) {
    return (
        <div className={`${style.spinnerwrapper} ${item ? style.item : ""}`}>
            <div className={style.spinner}></div>
        </div>
    );
}