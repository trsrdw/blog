import Container from "@/components/Layout/Container/container";
import HeroSection from "@/components/Page/Home/Hero/hero";
import AboutSection from "@/components/Page/Home/About/about";
import JourneySection from "@/components/Page/Home/Journey/journey";
import ProjectsSection from "@/components/Page/Home/Projects/projects";
import FormSection from "@/components/Page/Home/Form/form";
import ResumeSection from "@/components/Page/Home/Resume/resume";
// import BlogSection from "@/components/Page/Home/Blog/blog";

export default async function Page() {
    return (
        <main className="homecontent">
            <Container>
                <HeroSection />
            </Container>
            <Container>
                <AboutSection />
            </Container>
            <Container>
                <JourneySection />
            </Container>
            {/* <Container>
                <CertificationSection />
            </Container> */}
            <Container>
                <ProjectsSection />
            </Container>
            {/* <Container>
                <BlogSection />
            </Container> */}
            <Container>
                <ResumeSection />
            </Container>
            <Container>
                <FormSection />
            </Container>
        </main>
    );
}