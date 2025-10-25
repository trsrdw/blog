import Container from "@/components/Layout/Container/container";
import SinglePost from "@/components/Page/Post/post";
import { getPosts } from "@/lib/api/fetch";
import { Post, PostsResponse } from "@/lib/types/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: PageProps<'/posts/[slug]'>) {
    const slug = (await params).slug;

    let post: Post | undefined;
    let relatedPosts: Post[] = [];
    try {
        const postsResponse: PostsResponse<Post[]> = await getPosts("en");
        post = postsResponse.data.find((p) => p.slug === slug);
        relatedPosts = postsResponse.data
            .filter(p => p.slug !== slug)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
    } catch (error) {
        console.error("Failed to fetch post:", error);
    }

    if (!post) {
        return notFound();
    }
    // console.log("SSR: ", post)
    return (
        <Container>
            <SinglePost data={post} related={relatedPosts} />
        </Container>
    );
}