import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './stories/Home';
import StoryOntarioButton from './stories/OntarioButton';

const StoryRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/ontario-button" element={<StoryOntarioButton />} />
		</Routes>
	);
};

export default StoryRouter;
