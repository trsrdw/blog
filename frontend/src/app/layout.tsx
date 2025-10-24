import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto } from "next/font/google";
import { ErrorProvider } from "@/lib/context/errorcontext";
import HeaderCondition from "@/components/Global/Context/header";
import ScrollUp from "@/components/Global/ScrollUp/scrollup";
import FooterCondition from "@/components/Global/Context/footer";
import "@/styles/globals.scss";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
});

const isProd = process.env.NODE_ENV === "production";
const baseUrl = isProd ? "https://tiarasdewi.com" : "http://localhost:3000";

export const metadata: Metadata = {
  title: "Blog - Tiara S. Dewi",
  description: "A personal blog by Tiara S. Dewi, sharing thoughts, life experiences, stories, and occasional tech insights.",
  robots: "index, follow",
  icons: {
    icon: "/logo/logo-icon.png",
    apple: "/logo/logo-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Blog - Tiara S. Dewi",
    description: "A personal blog by Tiara S. Dewi, sharing thoughts, life experiences, stories, and occasional tech insights.",
    url: baseUrl,
    siteName: "Blog - Tiara S. Dewi",
    images: [
      {
        url: (baseUrl) + "/profile-meta.jpg",
        width: 1280,
        height: 720,
        alt: "Tiara S. Dewi",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Tiara S. Dewi",
    description: "A personal blog by Tiara S. Dewi, sharing thoughts, life experiences, stories, and occasional tech insights.",
    images: [(baseUrl) + "/profile-meta.jpg",],
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "Tiara S. Dewi",
      "alternateName": "tiarasdewi.com",
      "publisher": {
        "@id": `${baseUrl}/#organization`
      }
    },
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "Tiara S. Dewi",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo/logo-icon.png`
      }
    },
    {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      "name": "Tiara S. Dewi",
      "url": baseUrl,
      "image": `${baseUrl}/logo/logo-icon.png`,
      "jobTitle": "Frontend Developer",
      "worksFor": {
        "@id": `${baseUrl}/#organization`
      },
      "sameAs": [
        "https://www.linkedin.com/in/tiarasdewi",
        "https://github.com/trsrdw"
      ]
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorProvider>
      <html lang="en">
        <head>
          <link rel="canonical" href={baseUrl} />
          <script
            id="schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          />
        </head>
        <body className={`${jakarta.variable} ${roboto.variable}`}>
          <HeaderCondition />
          {children}
          <FooterCondition />
          <ScrollUp />
        </body>
      </html>
    </ErrorProvider>
  );
}