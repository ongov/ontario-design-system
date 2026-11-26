import { getFormControlError, getFormErrorPresentation } from './form-error';

describe('shared form error helpers', () => {
	it.each([undefined, ''])('does not create an anchor or error for %j', (message) => {
		const host = document.createElement('div');
		expect(getFormControlError(host, message)).toBeNull();
		expect(getFormErrorPresentation(host, message, 'hint')).toEqual({
			error: false,
			errorMessageId: undefined,
			describedBy: 'hint',
		});
		expect(host.id).toBe('');
	});

	it('keeps native field identity separate from the host anchor', () => {
		const host = document.createElement('div');
		host.id = 'control-host';
		expect(getFormControlError(host, 'Invalid', 'native-field')).toEqual({
			controlId: 'native-field',
			anchorId: 'control-host',
			message: 'Invalid',
		});
		expect(getFormErrorPresentation(host, 'Invalid', 'hint', 'native-field')).toEqual({
			error: true,
			errorMessageId: 'error-native-field',
			describedBy: 'hint error-native-field',
		});
	});

	it('uses a stable generated host anchor for grouped controls', () => {
		const host = document.createElement('div');
		const presentation = getFormErrorPresentation(host, 'Select an option');
		const state = getFormControlError(host, 'Select an option');
		expect(host.id).toMatch(/^ontario-error-control-/);
		expect(state).toEqual({ controlId: host.id, anchorId: host.id, message: 'Select an option' });
		expect(presentation).toEqual({
			error: true,
			errorMessageId: `error-${host.id}`,
			describedBy: `error-${host.id}`,
		});
		expect(getFormControlError(host, 'Updated')?.anchorId).toBe(host.id);
	});

	it('preserves whitespace-only messages as error conditions', () => {
		const host = document.createElement('div');
		expect(getFormControlError(host, ' \t ', 'field')?.message).toBe(' \t ');
		expect(getFormErrorPresentation(host, ' \t ', undefined, 'field')).toEqual({
			error: true,
			errorMessageId: 'error-field',
			describedBy: 'error-field',
		});
	});

	it('omits descriptions when neither a hint nor an error exists', () => {
		expect(getFormErrorPresentation(document.createElement('div'), '', null).describedBy).toBeUndefined();
	});
});
