import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { getPaginatedPosts } from "@/lib/posts";
import { PostMeta } from "@/types/post";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

interface BlogIndexProps {
  posts: PostMeta[];
  currentPage: number;
  totalPages: number;
}

export default function BlogIndex({
  posts,
  currentPage,
  totalPages,
}: BlogIndexProps) {
  return (
    <>
      <NextSeo
        title="Blog - ModernBlog"
        description="Browse all articles on web development, React, Next.js, TypeScript, and modern JavaScript"
        canonical="http://localhost:3000/blog"
        openGraph={{
          url: "http://localhost:3000/blog",
          title: "Blog - ModernBlog",
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

export const getStaticProps: GetStaticProps = async () => {
  const { posts, totalPages, currentPage } = getPaginatedPosts(1);

  return {
    props: {
      posts,
      currentPage,
      totalPages,
    },
  };
};
