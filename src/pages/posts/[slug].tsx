import { GetStaticProps, GetStaticPaths } from "next";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { format } from "date-fns";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { Post } from "@/types/post";
import MDXComponents from "@/components/MDXComponents";

interface PostPageProps {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
}

export default function PostPage({ post, mdxSource }: PostPageProps) {
  return (
    <>
      <NextSeo
        title={`${post.title} - ModernBlog`}
        description={post.excerpt}
        canonical={`http://localhost:3000/posts/${post.slug}`}
        openGraph={{
          url: `http://localhost:3000/posts/${post.slug}`,
          title: post.title,
          description: post.excerpt,
          type: "article",
          article: {
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
          },
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <ArticleJsonLd
        type="BlogPosting"
        url={`http://localhost:3000/posts/${post.slug}`}
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        authorName={post.author}
        images={[]}
      />

      <article
        data-testid="blog-post"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            data-testid="post-title"
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100 leading-tight"
          >
            {post.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 text-gray-600 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {post.author}
                  </p>
                  <time dateTime={post.date} className="text-sm">
                    {format(new Date(post.date), "MMMM dd, yyyy")}
                  </time>
                </div>
              </div>
            </div>

            <span
              data-testid="reading-time"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {post.readingTime}
            </span>
          </div>
        </header>

        {/* Content */}
        <div
          data-testid="post-content"
          className="prose prose-lg dark:prose-dark max-w-none"
        >
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Thanks for reading!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you enjoyed this article, consider subscribing to our RSS feed
              to stay updated with the latest content.
            </p>
            <a
              href="/rss.xml"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
                <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z" />
              </svg>
              Subscribe to RSS
            </a>
          </div>
        </footer>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllPostSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);
  const mdxSource = await serialize(post.content);

  return {
    props: {
      post: {
        ...post,
        content: "", // Don't send raw content to client
      },
      mdxSource,
    },
  };
};
