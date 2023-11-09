import { EventEmitter } from '@stencil/core';

export interface CommonInputEvents {
	inputValueChange: EventEmitter<string>;
}
