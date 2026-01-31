import { GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import { getPaginatedPosts } from "@/lib/posts";
import { PostMeta } from "@/types/post";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

interface BlogPageProps {
  posts: PostMeta[];
  currentPage: number;
  totalPages: number;
}

export default function BlogPage({
  posts,
  currentPage,
  totalPages,
}: BlogPageProps) {
  return (
    <>
      <NextSeo
        title={`Blog ${currentPage > 1 ? `- Page ${currentPage}` : ""} - ModernBlog`}
        description="Browse all articles on web development, React, Next.js, TypeScript, and modern JavaScript"
        canonical={`http://localhost:3000/blog${currentPage > 1 ? `/${currentPage}` : ""}`}
        openGraph={{
          url: `http://localhost:3000/blog${currentPage > 1 ? `/${currentPage}` : ""}`,
          title: `Blog ${currentPage > 1 ? `- Page ${currentPage}` : ""} - ModernBlog`,
          description:
            "Browse all articles on web development, React, Next.js, TypeScript, and modern JavaScript",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore our collection of articles on modern web development
          </p>
        </div>

        <div
          data-testid="post-list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/blog"
        />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { totalPages } = getPaginatedPosts(1);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = params?.page ? parseInt(params.page as string) : 1;
  const { posts, totalPages, currentPage } = getPaginatedPosts(page);

  return {
    props: {
      posts,
      currentPage,
      totalPages,
    },
  };
};
