const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const SITE_TITLE = 'ModernBlog';
const SITE_DESCRIPTION = 'A high-performance, SEO-optimized blog platform built with Next.js, MDX, and TypeScript';

function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        author: data.author,
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRSS() {
  const posts = getAllPosts();
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/posts/${post.slug}</link>
      <guid>${BASE_URL}/posts/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escapeXml(post.author)}</author>
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);
  console.log('✅ RSS feed generated successfully!');
}

generateRSS();
