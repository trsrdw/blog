"use client";
import style from "./style.module.scss";
import Image from "next/image";
import { projects } from "@/lib/helper/list";
import SvgIcon from "@/lib/utils/svg";
import Link from "next/link";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import { useEffect, useMemo, useRef, useState } from "react";
import { useIsMobileSmall, useIsTablet } from "@/lib/utils/mediaquery";

export default function Featured() {
    const isTablet = useIsTablet();
    const isMobile = useIsMobileSmall();
    const featuredRef = useRef<HTMLUListElement>(null);
    const [desktopInView, setDesktopInView] = useState(false);
    const featured = projects.find((p) => p.type === "featured");
    const items = useMemo(() => featured?.items ?? [], [featured]);

    const itemsPerPage = isMobile ? 1 : isTablet ? 2 : 3;
    const [currentItems, setCurrentItems] = useState(items.slice(0, itemsPerPage));
    const [pageCount, setPageCount] = useState(Math.ceil(items.length / itemsPerPage));
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, items, itemsPerPage]);

    const handlePageClick: ReactPaginateProps["onPageChange"] = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        if (!featuredRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setDesktopInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(featuredRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className={style.featured}>
            <h3>{featured?.type}</h3>
            <ul
                ref={featuredRef}
                className={`${style.list} ${desktopInView ? style.animate : ""}`}
            >
                {currentItems.map((item) => (
                    <li key={item.title}>
                        <div className={style.content}>
                            <Link href={item.link} target="_blank">
                                <div className={style.head}>
                                    <div className={style.imageWrapper}>
                                        <Image
                                            className={style.banner}
                                            src={item.banner}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                    <p className={style.title}>{item.title}</p>
                                    <p className={style.description}>{item.description}</p>
                                </div>

                                <div className={style.tail}>
                                    <div className={style.tools}>
                                        {item.tools.map((tool) => (
                                            <div className={style.label} key={tool.label}>
                                                <Image
                                                    className={style.logo}
                                                    src={tool.logo}
                                                    alt={tool.label}
                                                    width={24}
                                                    height={24}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className={style.arrow}>
                                        <SvgIcon url={"/arrow.svg"} />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>

            {pageCount > 1 && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<div className={`${style.pagebtn} ${style.next}`}><span>Next</span><SvgIcon url={"/chevron-left.svg"} /></div>}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel={<div className={`${style.pagebtn} ${style.prev}`}><SvgIcon url={"/chevron-left.svg"} /><span>Prev</span></div>}
                    renderOnZeroPageCount={null}
                    containerClassName={style.pagination}
                    pageLinkClassName={style.pagenum}
                    previousClassName={`${style.arrow} ${style.prev}`}
                    nextClassName={`${style.arrow} ${style.next}`}
                    activeLinkClassName={style.active}
                    disabledClassName={style.disabled}
                />
            )}
        </div>
    );
}
