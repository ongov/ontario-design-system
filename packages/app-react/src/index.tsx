import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

// Local theme wrapper sets asset base path and includes slotted styles.
import './styles/ontario-theme.scss';
import { setAssetPath } from '@ongov/ontario-design-system-component-library-react';

import App from './App';

setAssetPath(`${window.location.origin}`);

const container = document.getElementById('root');
const root = createRoot(container!); // The ! is intentional **
root.render(
	<HashRouter>
		<App />
	</HashRouter>,
);
