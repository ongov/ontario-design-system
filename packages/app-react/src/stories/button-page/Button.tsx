import React, { useEffect, useRef } from 'react';
import './Button.scss';

const StoryOntarioButton = () => {
	const iframeref = useRef<HTMLIFrameElement>(null);
	useEffect(() => {
		if (iframeref.current) {
			const current = iframeref.current;
			const header = current.contentWindow?.document.getElementById('header');
			if (header) {
				header.style.display = 'none';
			}
			const footer = current.contentWindow?.document.getElementById('footer');
			if (footer) {
				footer.style.display = 'none';
			}
		}
	}, [iframeref]);

	return (
		<div className="button-page">
			<div className="ontario-button-container">
				<div className="ontario-row">
					<iframe src="http://localhost:3000/ontario-button-iframe" height="300px"title="Buttons" id="iframe" ref={iframeref}></iframe>
				</div>
			</div>
		</div>
	);
};

export default StoryOntarioButton;
