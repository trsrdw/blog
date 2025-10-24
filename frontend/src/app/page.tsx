import Container from "@/components/Layout/Container/container";
import { Loader } from "@/components/Layout/Loader/loader";
import HeroSection from "@/components/Page/Home/Hero/hero";
import { getPosts } from "@/lib/api/fetch";
import { Post, PostsResponse } from "@/lib/types/data";
import { Suspense } from "react";

export default async function Page() {
    const lang = "en";
    let posts: PostsResponse<Post[]>;
    try {
        posts = await getPosts(lang);
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        throw new Error("Missing data from server");
    }
    // console.log("Posts data:", posts.data);
    return (
        <Suspense fallback={<Loader />}>
            <main className="homecontent">
                <Container>
                    <HeroSection data={posts.data} />
                </Container>
            </main>
        </Suspense>
    );
}