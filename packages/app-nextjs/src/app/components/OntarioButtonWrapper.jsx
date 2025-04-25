'use client';

import dynamic from 'next/dynamic';

const OntarioButton = dynamic(
	() => import('@ongov/ontario-design-system-component-library-react').then((mod) => mod.OntarioButton),
	{ ssr: false },
);

export default function OntarioButtonWrapper({ children = null, ...props }) {
	return <OntarioButton {...props}>{children}</OntarioButton>;
}
