import Image from 'next/image';
import { Highlight, themes } from 'prism-react-renderer';

const MDXComponents = {
  img: (props: any) => (
    <Image
      {...props}
      data-testid="optimized-image"
      width={800}
      height={400}
      className="rounded-lg my-6"
      alt={props.alt || 'Blog image'}
    />
  ),
  pre: (props: any) => {
    const code = props.children?.props?.children || '';
    const language = props.children?.props?.className?.replace('language-', '') || 'javascript';

    return (
      <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            data-testid="code-block"
            className={`${className} rounded-lg p-4 overflow-x-auto my-6`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="inline-block w-8 select-none opacity-50">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  },
  h1: (props: any) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100" {...props} />
  ),
  p: (props: any) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300" {...props} />
  ),
  li: (props: any) => (
    <li className="ml-4" {...props} />
  ),
  a: (props: any) => (
    <a
      className="text-blue-600 dark:text-blue-400 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600 dark:text-gray-400"
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong className="font-bold text-gray-900 dark:text-gray-100" {...props} />
  ),
  code: (props: any) => (
    <code
      className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-blue-600 dark:text-blue-400"
      {...props}
    />
  ),
};

export default MDXComponents;
