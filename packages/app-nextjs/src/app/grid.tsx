import React from 'react';

export const Grid = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="ontario-row">
			<div className="ontario-columms ontario-small-12">{children}</div>
		</div>
	);
};
