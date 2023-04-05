import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
