import Container from "@/components/Layout/Container/container";
import { Loader } from "@/components/Layout/Loader/loader";
import Posts from "@/components/Page/Posts/posts";
import { getCategories, getPosts } from "@/lib/api/fetch";
import { Post } from "@/lib/types/data";
import { Suspense } from "react";

export default async function Page() {
    const lang = "en";
    const postsData = await getPosts(lang);
    const categoriesData = await getCategories(lang);
    const allPosts = postsData.data;
    const allCategories = categoriesData.data;

    const featuredIndex = allPosts.findIndex((p) => p.featured);
    let recentPosts: Post[];

    if (featuredIndex > -1) {
        const featuredPost = allPosts[featuredIndex];
        recentPosts = [
            featuredPost,
            ...allPosts.filter((p) => p.id !== featuredPost.id),
        ];
    } else {
        recentPosts = allPosts;
    }

    return (
        <Suspense fallback={<Loader />}>
            <Container>
                <Posts data={recentPosts} categories={allCategories} />
            </Container>
        </Suspense>
    );
}