import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!); // The ! is intentional **
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
);
