import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout';

import Home from './stories/home-page/Home';
import Button from './stories/button-page/Button';
import Hint from './stories/hint-text-page/Hint';
import Textarea from './stories/text-area-page/TextArea';
import TextInput from './stories/text-input-page/TextInput';
import Icon from './stories/icon-page/Icon';
import Header from './stories/header-page/HeaderComponent';
import Footer from './stories/footer-page/FooterComponent';
import Checkbox from './stories/checkbox-page/Checkbox';
import RadioButton from './stories/radio-button-page/RadioButton';
import DropdownList from './stories/dropdown-list-page/DropdownList';
import Blockquote from './stories/blockquote-page/Blockquote';

const App = () => {
	return (
		<Routes>
			{/* Home */}
			<Route
				path="/"
				element={
					<Layout>
						<Home />
					</Layout>
				}
			/>

			{/* Button */}
			<Route
				path="/ontario-button"
				element={
					<Layout>
						<Button />
					</Layout>
				}
			/>

			{/* Hint */}
			<Route
				path="/ontario-hint"
				element={
					<Layout>
						<Hint />
					</Layout>
				}
			/>

			{/* Textarea */}
			<Route
				path="/ontario-textarea"
				element={
					<Layout>
						<Textarea />
					</Layout>
				}
			/>

			{/* Text Input */}
			<Route
				path="/ontario-text-input"
				element={
					<Layout>
						<TextInput />
					</Layout>
				}
			/>

			{/* Icon */}
			<Route
				path="/ontario-icon"
				element={
					<Layout>
						<Icon />
					</Layout>
				}
			/>

			{/* Header */}
			<Route
				path="/ontario-header"
				element={
					<Layout>
						<Header />
					</Layout>
				}
			/>

			{/* Footer */}
			<Route
				path="/ontario-footer"
				element={
					<Layout>
						<Footer />
					</Layout>
				}
			/>

			{/* Checkbox */}
			<Route
				path="/ontario-checkbox"
				element={
					<Layout>
						<Checkbox />
					</Layout>
				}
			/>

			{/* Radio Button */}
			<Route
				path="/ontario-radio-button"
				element={
					<Layout>
						<RadioButton />
					</Layout>
				}
			/>

			{/* Dropdown List */}
			<Route
				path="/ontario-dropdown-list"
				element={
					<Layout>
						<DropdownList />
					</Layout>
				}
			/>

			{/* Blockquote */}
			<Route
				path="/ontario-blockquote"
				element={
					<Layout>
						<Blockquote />
					</Layout>
				}
			/>
		</Routes>
	);
};

export default App;
