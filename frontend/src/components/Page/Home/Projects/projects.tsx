"use client";
import style from "./style.module.scss";
import Featured from "./Featured/featured";
import Personal from "./Personal/personal";

export default function ProjectsSection() {
    return (
        <div id="projects" className={style.projects}>
            <h1>All <span>Projects</span></h1>

            <Featured />
            <Personal />
        </div>
    );
}