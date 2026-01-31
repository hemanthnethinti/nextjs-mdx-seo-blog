import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Layout from "@/components/Layout";

const SEO = {
  title: "ModernBlog - Next.js Blog Platform",
  description:
    "A high-performance, SEO-optimized blog platform built with Next.js, MDX, and TypeScript.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000",
    site_name: "ModernBlog",
  },
  twitter: {
    handle: "@modernblog",
    site: "@modernblog",
    cardType: "summary_large_image",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
