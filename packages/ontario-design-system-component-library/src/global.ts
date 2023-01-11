import { setMode } from '@stencil/core';

setMode((elm) => {
	// NOTE: you can write whatever you want here - it's up to you. This
	// function must return one of the style "modes" defined in step 1.
	return (elm as any).type;
});
