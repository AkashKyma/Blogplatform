import { Post } from '@/lib/types';

interface ArticleBodyProps {
  content: Post['content'];
}

export function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-foreground/85 prose-strong:text-foreground prose-a:text-accent prose-blockquote:border-accent prose-blockquote:text-foreground/80 dark:prose-invert">
      {content.map((block, index) => {
        if (block.type === 'heading') {
          if (block.level === 3) {
            return <h3 key={`${block.text}-${index}`}>{block.text}</h3>;
          }

          return <h2 key={`${block.text}-${index}`}>{block.text}</h2>;
        }

        if (block.type === 'quote') {
          return <blockquote key={`${block.text}-${index}`}>{block.text}</blockquote>;
        }

        if (block.type === 'list') {
          if (block.style === 'number') {
            return (
              <ol key={`${block.items.join('-')}-${index}`}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          }

          return (
            <ul key={`${block.items.join('-')}-${index}`}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return <p key={`${block.text}-${index}`}>{block.text}</p>;
      })}
    </div>
  );
}
