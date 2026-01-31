import { NextSeo } from "next-seo";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <NextSeo
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist"
        noindex={true}
      />

      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              404
            </h1>
          </div>

          <h2
            data-testid="not-found-message"
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100"
          >
            Page Not Found
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been moved or deleted.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Go Home
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-200"
            >
              Browse Blog
            </Link>
          </div>

          {/* Illustration */}
          <div className="mt-12">
            <svg
              className="w-64 h-64 mx-auto text-gray-300 dark:text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
