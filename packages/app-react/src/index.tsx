import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = createRoot(container!); // The ! is intentional **
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
);

// ** The ! is needed with TypeScript
// See the upgrade guide for reference: https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
