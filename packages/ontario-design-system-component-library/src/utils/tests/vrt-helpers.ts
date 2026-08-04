export { expectVrtScreenshot } from './vrt-screenshot';

export const withGlobalStyles = (body: string) => `
	<html>
		<head>
			<link rel="stylesheet" href="/build/ontario-design-system-components.css">
		</head>
		<body>${body}</body>
	</html>
`;
