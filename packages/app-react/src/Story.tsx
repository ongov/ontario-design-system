import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './stories/home-page/Home';
import StoryButton from './stories/button-page/Button';

const StoryRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/ontario-button" element={<StoryButton />} />
		</Routes>
	);
};

export default StoryRouter;
