import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './stories/home-page/Home';
import StoryButton from './stories/button-page/Button';
import StoryButtonIframe from './stories/button-page/Button-iframe';

const StoryRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/ontario-button" element={<StoryButton />} />
			<Route path="/ontario-button-iframe" element={<StoryButtonIframe />} />
		</Routes>
	);
};

export default StoryRouter;
