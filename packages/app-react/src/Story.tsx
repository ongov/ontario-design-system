import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './stories/home-page/Home';
import StoryButton from './stories/button-page/Button';
import StoryOntarioHint from './stories/hint-text-page/Hint';
import StoryOntarioTextArea from './stories/text-area-page/TextArea';
import StoryOntarioTextInput from './stories/text-input-page/TextInput';
import StoryOntarioIcon from './stories/icon-page/Icon';
import StoryOntarioHeader from './stories/header-page/HeaderComponent';

const StoryRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/ontario-button" element={<StoryButton />} />
			<Route path="/ontario-hint" element={<StoryOntarioHint />} />
			<Route path="/ontario-text-area" element={<StoryOntarioTextArea />} />
			<Route path="/ontario-text-input" element={<StoryOntarioTextInput />} />
			<Route path="/ontario-icon" element={<StoryOntarioIcon />} />
			<Route path="/ontario-header" element={<StoryOntarioHeader />} />
		</Routes>
	);
};

export default StoryRouter;
