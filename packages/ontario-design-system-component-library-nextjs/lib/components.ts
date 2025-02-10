import dynamic from 'next/dynamic';
import { defineCustomElements } from '@ongov/ontario-design-system-component-library/loader';

export const MyComponent = dynamic(() => import('@my-org/web-components').then((mod) => mod.MyComponent), {
	ssr: false,
});
