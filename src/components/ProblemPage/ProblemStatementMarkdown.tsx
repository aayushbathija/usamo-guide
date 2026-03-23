import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import 'katex/dist/katex.min.css';

/**
 * Renders problem statement / solution snippets from JSON (Markdown + $...$ / $$...$$ math).
 */
export default function ProblemStatementMarkdown({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}): JSX.Element {
  if (!children?.trim()) return <></>;
  return (
    <div
      className={`prose dark:prose-invert max-w-none ${className}`.trim()}
    >
      <ReactMarkdown
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- remark/unified version skew
        remarkPlugins={[remarkGfm, remarkMath] as any}
        rehypePlugins={[rehypeKatex]}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
