import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { personal } from "@/lib/data";

export const metadata: Metadata = {
  title: `${personal.name} — ${personal.role}`,
  description: personal.bio,
  keywords: [
    "Ankit Singh Yadav",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Portfolio",
    "Web Developer India",
    "JavaScript",
    "TypeScript",
  ],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: `${personal.name} — ${personal.role}`,
    description: personal.bio,
    siteName: `${personal.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.role}`,
    description: personal.bio,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
