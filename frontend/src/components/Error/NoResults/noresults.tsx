import style from "./style.module.scss";

export default function NoResults() {
    return (
        <div className={style.notfound}>
            <div className={style.title}>
                <h1>Oops</h1>
                <p>No results found.</p>
            </div>
        </div>
    );
}