import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ModernBlog
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A high-performance, SEO-optimized blog platform built with Next.js
              and MDX.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  title="Home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  title="Blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Sitemap
                </a>
              </li>
              <li>
                <a
                  href="/rss.xml"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  RSS Feed
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Connect
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} ModernBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
