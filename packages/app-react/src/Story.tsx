import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './stories/home-page/Home';
import StoryButton from './stories/button-page/Button';
import StoryOntarioHintExpander from './stories/hint-expander-page/hint-expander';

const StoryRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/ontario-button" element={<StoryButton />} />
			<Route path="/ontario-hint-expander" element={<StoryOntarioHintExpander />} />
		</Routes>
	);
};

export default StoryRouter;
