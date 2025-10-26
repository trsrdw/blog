import Container from "@/components/Layout/Container/container";
import { Loader } from "@/components/Layout/Loader/loader";
import FormSection from "@/components/Page/Home/Form/form";
import HeroSection from "@/components/Page/Home/Hero/hero";
import { getPosts } from "@/lib/api/fetch";
import { Post } from "@/lib/types/data";
import { Suspense } from "react";

export default async function Page() {
    const lang = "en";
    const postsData = await getPosts(lang);
    const allPosts = postsData.data;

    const featuredIndex = allPosts.findIndex((p) => p.featured);
    let recentPosts: Post[];

    if (featuredIndex > -1) {
        const featuredPost = allPosts[featuredIndex];
        recentPosts = [
            featuredPost,
            ...allPosts.filter((p) => p.id !== featuredPost.id).slice(0, 2),
        ];
    } else {
        recentPosts = allPosts.slice(0, 3);
    }

    return (
        <Suspense fallback={<Loader />}>
            <main className="homecontent">
                <Container>
                    <HeroSection data={recentPosts} />
                </Container>
                <Container>
                    <FormSection />
                </Container>
            </main>
        </Suspense>
    );
}