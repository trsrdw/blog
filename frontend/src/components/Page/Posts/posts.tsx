"use client";
import { DataProps } from "@/lib/types/data";
import style from "./style.module.scss";
import Image from "next/image";
import { getStrapiMedia, truncate } from "@/lib/utils/general";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SvgIcon from "@/lib/utils/svg";
import ReactPaginate from "react-paginate";

export default function Posts({ data = [], categories = [] }: DataProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    const [currentPage, setCurrentPage] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const itemsPerPage = 4;

    const handleCheckboxChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    const filteredPosts = data.filter((post) => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            post.categories?.some((cat) => selectedCategories.includes(cat.title));

        const matchesSearch =
            debouncedSearch.trim() === "" ||
            post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            post.categories?.some((cat) =>
                cat.title.toLowerCase().includes(debouncedSearch.toLowerCase())
            );

        return matchesCategory && matchesSearch;
    });

    const pageCount = Math.ceil(filteredPosts.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredPosts.slice(startIndex, endIndex);

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setCurrentPage(0);
    }, [filteredPosts.length]);

    return (
        <div className={`${style.wrapper} ${isFilterOpen ? style.open : ""}`}>
            <div className={style.header}>
                <h1>Posts</h1>

                <button
                    className={`${style.filterButton} ${isFilterOpen ? style.open : ""}`}
                    onClick={() => setIsFilterOpen((prev) => !prev)}
                >
                    Filters
                    <span className={style.arrow}>
                        <SvgIcon url="/filter.svg" />
                    </span>
                </button>
            </div>

            <div className={`${style.filter} ${isFilterOpen ? style.open : ""}`}>
                <div className={style.searchBox}>
                    <span className={style.iconsearch}>
                        <SvgIcon url="/search.svg" />
                    </span>
                    <input
                        type="text"
                        placeholder={`Search`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={style.searchInput}
                    />
                </div>

                {categories.length > 0 && (
                    <div className={style.dropdown} ref={dropdownRef}>
                        <button
                            className={`${style.dropdownButton} ${isDropdownOpen ? style.open : ""}`}
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                        >
                            {selectedCategories.length > 0
                                ? `${selectedCategories.length} selected`
                                : "Categories"}
                            <span className={style.arrow}>
                                {isDropdownOpen ? (
                                    <SvgIcon url="/up.svg" />
                                ) : (
                                    <SvgIcon url="/down.svg" />
                                )}
                            </span>
                        </button>

                        {isDropdownOpen && (
                            <div className={style.dropdownMenu}>
                                {categories.map((cat) => (
                                    <label key={cat.id} className={style.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat.title)}
                                            onChange={() => handleCheckboxChange(cat.title)}
                                        />
                                        <span>{cat.title}</span>
                                    </label>
                                ))}

                                {selectedCategories.length > 0 && (
                                    <button
                                        className={style.clearButton}
                                        onClick={() => setSelectedCategories([])}
                                    >
                                        <span>Clear</span>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className={style.posts}>
                {currentItems.length === 0 && (
                    <p className={style.notfound}>No results found.</p>
                )}

                {currentItems.map((item, index) => (
                    <div
                        key={index}
                        className={`${style.post} ${index === 0 ? style.featured : ""
                            }`}
                    >
                        <div className={style.banner}>
                            <Image
                                src={getStrapiMedia(item.banner?.url) || "/placeholder.png"}
                                alt={item.title}
                                fill
                                sizes="50%"
                            />
                            {item.featured && <span>Featured</span>}
                            <div className={style.label}>
                                {item.categories.map((cat) => (
                                    <label key={cat.id}>{cat.title}</label>
                                ))}
                            </div>
                        </div>

                        <div className={style.description}>
                            <span>
                                <h2>{item.title}</h2>
                                <p>{truncate(item.excerpt, 100)}</p>
                            </span>
                            <Link href={`/posts/${item.slug}`}>Read More</Link>
                        </div>
                    </div>
                ))}
            </div>

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
