import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './stories/home-page/Home';
import StoryButton from './stories/button-page/Button';
import StoryOntarioHintExpander from './stories/hint-expander-page/hint-expander';
import StoryOntarioHintText from './stories/hint-text-page/hint-text';
import StoryOntarioInput from './stories/text-input-page/text-input';
import StoryOntarioTextArea from './stories/text-area-page/text-area';



const StoryRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/ontario-button" element={<StoryButton />} />
			<Route path="/ontario-hint-expander" element={<StoryOntarioHintExpander />} />
			<Route path="/ontario-hint-text" element={<StoryOntarioHintText />} />
			<Route path="/ontario-text-input" element={<StoryOntarioInput />} />
			<Route path="/ontario-text-area" element={<StoryOntarioTextArea />} />

		</Routes>
	);
};

export default StoryRouter;
