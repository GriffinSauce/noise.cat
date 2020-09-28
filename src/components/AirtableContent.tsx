import { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';

export const isEmptyContent = (content: string): boolean =>
  !content?.replace('\n', '')?.trim();

type Props = { content: string; className?: string };

const AirtableContent = forwardRef<HTMLDivElement, Props>(
  ({ content, className }: Props, ref) => {
    const formatted = content
      .replace('http:///', '/') // Airtable doesn't keep relative links
      .replace(/\n/gm, '\n\n'); // Airtable doesn't seem to render paragraph breaks right
    return (
      <div ref={ref} className="break">
        <ReactMarkdown
          className={className}
          source={formatted}
          escapeHtml={false}
        />
        <style jsx>
          {`
            .break {
              word-break: break-word;
            }
          `}
        </style>
      </div>
    );
  },
);

AirtableContent.defaultProps = {
  className: '',
};

export default AirtableContent;
