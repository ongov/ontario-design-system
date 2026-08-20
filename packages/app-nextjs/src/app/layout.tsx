import type { Metadata } from 'next';

// Local theme wrapper sets asset base path and includes slotted styles.
import './styles/ontario-theme.scss';

export const metadata: Metadata = {
	title: 'NextJS Ontario Design System PoC',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
