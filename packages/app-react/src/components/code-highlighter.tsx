import React from 'react';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism, SyntaxHighlighterProps } from 'react-syntax-highlighter';
const SyntaxHighlighter = Prism as any as React.FC<SyntaxHighlighterProps>;

interface CodeHighlighterProps {
	codeExample: string;
}
const CodeHighlighter = ({ codeExample }: CodeHighlighterProps) => {
	return (
		<SyntaxHighlighter
			language="javascript"
			style={vscDarkPlus}
			wrapLines={true}
			lineProps={{ style: { wordBreak: 'keep-all', whiteSpace: 'pre-wrap' } }}
		>
			{codeExample}
		</SyntaxHighlighter>
	);
};

export default CodeHighlighter;
