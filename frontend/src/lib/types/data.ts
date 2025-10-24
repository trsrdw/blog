export interface LoaderProps {
    item?: boolean;
}

export interface ErrorProps {
    msg?: string;
    reset?: () => void;
}

export type Section = {
    label: string;
    href: string;
};

export interface Education {
    id: number;
    institution: string;
    degree: string;
    period: string;
    year: number;
}

export interface Tool {
    label: string;
    logo: string;
    link: string;
}

export interface ExperiencePosition {
    id: number;
    title: string;
    description: string;
    period: string;
    year: number;
}

export interface ExperienceLogo {
    path: string;
    width: number;
    height: number;
    alt: string;
}

export interface Experience {
    id: number;
    company: string;
    position: ExperiencePosition[];
    location: string;
    logo: ExperienceLogo;
}

export type YearGroup = {
    year: number;
    positions: {
        id: number;
        title: string;
        period: string;
        description: string;
        company: string;
        location: string;
        logo: { path: string; width: number; height: number; alt: string };
    }[];
};

export interface ProjectTool {
    label: string;
    logo: string;
}

export interface ProjectItem {
    id: number;
    banner: string;
    title: string;
    description: string;
    tools: ProjectTool[];
    link: string;
    status: "Live" | "Development" | "Archived" | "Down";
}

export interface ProjectGroup {
    id: number;
    type: string;
    items: ProjectItem[];
}

export interface Contact {
    label: string;
    logo: string;
    link: string;
}