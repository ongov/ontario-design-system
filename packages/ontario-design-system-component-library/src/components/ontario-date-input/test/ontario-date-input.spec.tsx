import { render } from '@stencil/vitest';
import { isInvalidYear } from '../utils';

describe('ontario-date-input', () => {
	const dispatchInputEvent = (input: HTMLInputElement) => {
		const event =
			typeof InputEvent === 'function'
				? new InputEvent('input', { bubbles: true, composed: true })
				: new Event('input', { bubbles: true, composed: true });
		input.dispatchEvent(event);
	};

	it('renders deafult state', async () => {
		const page = await render(`<ontario-date-input language="en" element-id="date-id-example"></ontario-date-input>`);
		expect(page.root).toEqualHtml(`
<ontario-date-input language="en" element-id="date-id-example" class="hydrated">
  <mock:shadow-root>
    <fieldset role="group" class="ontario-fieldset">
      <legend class="ontario-fieldset__legend">
        Exact date
        <span class="ontario-label__flag">
          (optional)
        </span>
      </legend>
      <div role="alert" class="ontario-error-messaging ontario-error__hidden">
        <ontario-icon-alert-error class="hydrated">
          <mock:shadow-root>
            <div class="ontario-icon ontario-icon--width-24">
              <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="alert-error">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#cd0000"></path>
                <path d="M11 17h2v-2h-2v2zm0-4h2V7h-2v6z" fill="#fff"></path>
              </svg>
            </div>
          </mock:shadow-root>
        </ontario-icon-alert-error>
        <div class="ontario-error-messaging__content"></div>
      </div>
      <div class="ontario-date__group">
        <div class="ontario-date__group-input">
          <label htmlfor="year-date-id-example">
            Year
            <span class="ontario-show-for-sr">
              (1 or 2 digits)
            </span>
          </label>
          <input class="ontario-input ontario-input--4-char-width" id="year-date-id-example" type="text" value inputmode="numeric" aria-describedby="date-input-hint-date-id-example">
        </div>
        <div class="ontario-date__group-input">
          <label htmlfor="month-date-id-example">
            Month
            <span class="ontario-show-for-sr">
              (1 or 2 digits)
            </span>
          </label>
          <input class="ontario-input ontario-input--4-char-width" id="month-date-id-example" type="text" value inputmode="numeric" aria-describedby="date-input-hint-date-id-example">
        </div>
        <div class="ontario-date__group-input">
          <label htmlfor="day-date-id-example">
            Day
            <span class="ontario-show-for-sr">
              (4 digits)
            </span>
          </label>
          <input class="ontario-input ontario-input--4-char-width" id="day-date-id-example" type="text" value inputmode="numeric" aria-describedby="date-input-hint-date-id-example">
        </div>
      </div>
    </fieldset>
  </mock:shadow-root>
</ontario-date-input>
`);
	});

	it('should render custom prop', async () => {
		const page = await render(`
				<ontario-date-input
					element-id="date-id-example"
					placeholder='{ "day": "D", "month": "M", "year": "YY" }'
					min-year="500"
					max-year="1000"
					required="true"
					hint-text="Example 1990 12"
					date-options='["month", "year"]'
					caption='{ "captionText": "Enter Date", "captionType": "default" }'
				></ontario-date-input>
			`);

		expect(page.root).toEqualHtml(`
<ontario-date-input element-id="date-id-example" placeholder="{ "day": "D", "month": "M", "year": "YY" }" min-year="500" max-year="1000" required="true" hint-text="Example 1990 12" date-options="["month", "year"]" caption="{ "captionText": "Enter Date", "captionType": "default" }" class="hydrated">
  <mock:shadow-root>
    <fieldset role="group" class="ontario-fieldset">
      <legend class="ontario-fieldset__legend">
        Enter Date
        <span class="ontario-label__flag">
          (required)
        </span>
      </legend>
      <p id="date-input-hint-date-id-example" class="ontario-hint">
        Example 1990 12
      </p>
      <div role="alert" class="ontario-error-messaging ontario-error__hidden">
        <ontario-icon-alert-error class="hydrated">
          <mock:shadow-root>
            <div class="ontario-icon ontario-icon--width-24">
              <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="alert-error">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#cd0000"></path>
                <path d="M11 17h2v-2h-2v2zm0-4h2V7h-2v6z" fill="#fff"></path>
              </svg>
            </div>
          </mock:shadow-root>
        </ontario-icon-alert-error>
        <div class="ontario-error-messaging__content"></div>
      </div>
      <div class="ontario-date__group">
        <div class="ontario-date__group-input">
          <label htmlfor="year-date-id-example">
            Year
            <span class="ontario-show-for-sr">
              (1 or 2 digits)
            </span>
          </label>
          <input class="ontario-input ontario-input--4-char-width" id="year-date-id-example" type="text" value placeholder="YY" required inputmode="numeric" aria-describedby="date-input-hint-date-id-example">
        </div>
        <div class="ontario-date__group-input">
          <label htmlfor="month-date-id-example">
            Month
            <span class="ontario-show-for-sr">
              (1 or 2 digits)
            </span>
          </label>
          <input class="ontario-input ontario-input--4-char-width" id="month-date-id-example" type="text" value placeholder="M" required inputmode="numeric" aria-describedby="date-input-hint-date-id-example">
        </div>
      </div>
    </fieldset>
  </mock:shadow-root>
</ontario-date-input>
`);
	});

	it('hydrates the internal fields from a plain ISO value', async () => {
		const page = await render(`<ontario-date-input value="2024-02-20"></ontario-date-input>`);

		const inputs = page.root?.shadowRoot?.querySelectorAll('input');

		expect(inputs?.[0].value).toBe('2024');
		expect(inputs?.[1].value).toBe('02');
		expect(inputs?.[2].value).toBe('20');
		expect((page.root as HTMLOntarioDateInputElement).value).toBe('2024-02-20T00:00:00.000Z');
	});

	it('hydrates the internal fields from a full ISO value and normalizes the host value', async () => {
		const page = await render(`<ontario-date-input value="2024-02-20T15:30:00.000Z"></ontario-date-input>`);

		const inputs = page.root?.shadowRoot?.querySelectorAll('input');

		expect(inputs?.[0].value).toBe('2024');
		expect(inputs?.[1].value).toBe('02');
		expect(inputs?.[2].value).toBe('20');
		expect((page.root as HTMLOntarioDateInputElement).value).toBe('2024-02-20T00:00:00.000Z');
	});

	it('updates the aggregate host value after field input completes a valid date', async () => {
		const page = await render(`<ontario-date-input></ontario-date-input>`);

		const inputs = page.root?.shadowRoot?.querySelectorAll('input');
		const [yearInput, monthInput, dayInput] = Array.from(inputs ?? []);

		yearInput.value = '2024';
		dispatchInputEvent(yearInput);
		monthInput.value = '02';
		dispatchInputEvent(monthInput);
		dayInput.value = '20';
		dispatchInputEvent(dayInput);

		await page.waitForChanges();

		expect((page.root as HTMLOntarioDateInputElement).value).toBe('2024-02-20T00:00:00.000Z');
	});

	it('emits a host `input` event when the aggregate value changes', async () => {
		const page = await render(`<ontario-date-input></ontario-date-input>`);
		const emitSpy = vi.fn();
		page.root?.addEventListener('input', emitSpy);

		const inputs = page.root?.shadowRoot?.querySelectorAll('input');
		const [yearInput, monthInput, dayInput] = Array.from(inputs ?? []);

		yearInput.value = '2024';
		dispatchInputEvent(yearInput);
		monthInput.value = '02';
		dispatchInputEvent(monthInput);
		dayInput.value = '20';
		dispatchInputEvent(dayInput);

		await page.waitForChanges();

		expect(emitSpy).toHaveBeenCalledTimes(1);
		expect((emitSpy.mock.calls[0][0].target as HTMLOntarioDateInputElement).value).toBe('2024-02-20T00:00:00.000Z');
		expect(emitSpy.mock.calls[0][0].detail).toEqual({ value: '2024-02-20T00:00:00.000Z' });
	});

	it('preserves field-level input events while only exposing one aggregate host input event', async () => {
		const page = await render(`<ontario-date-input></ontario-date-input>`);
		const hostInputSpy = vi.fn();
		const fieldInputSpy = vi.fn();
		page.root?.addEventListener('input', hostInputSpy);
		document.addEventListener('inputOnInput', fieldInputSpy);

		const inputs = page.root?.shadowRoot?.querySelectorAll('input');
		const [yearInput, monthInput, dayInput] = Array.from(inputs ?? []);

		yearInput.value = '2024';
		dispatchInputEvent(yearInput);
		monthInput.value = '02';
		dispatchInputEvent(monthInput);
		dayInput.value = '20';
		dispatchInputEvent(dayInput);

		await page.waitForChanges();

		expect(fieldInputSpy).toHaveBeenCalledTimes(3);
		expect(fieldInputSpy.mock.calls[0][0].detail).toEqual({ value: '2024', fieldType: 'year' });
		expect(fieldInputSpy.mock.calls[1][0].detail).toEqual({ value: '02', fieldType: 'month' });
		expect(fieldInputSpy.mock.calls[2][0].detail).toEqual({ value: '20', fieldType: 'day' });
		expect(hostInputSpy).toHaveBeenCalledTimes(1);
		expect(hostInputSpy.mock.calls[0][0].target).toBe(page.root);
	});

	it('emits a host `change` event when the aggregate value changes', async () => {
		const page = await render(`<ontario-date-input></ontario-date-input>`);
		const emitSpy = vi.fn();
		page.root?.addEventListener('change', emitSpy);

		const inputs = page.root?.shadowRoot?.querySelectorAll('input');
		const [yearInput, monthInput, dayInput] = Array.from(inputs ?? []);

		yearInput.value = '2024';
		yearInput.dispatchEvent(new Event('change'));
		monthInput.value = '02';
		monthInput.dispatchEvent(new Event('change'));
		dayInput.value = '20';
		dayInput.dispatchEvent(new Event('change'));

		await page.waitForChanges();

		expect(emitSpy).toHaveBeenCalledTimes(1);
		expect((emitSpy.mock.calls[0][0].target as HTMLOntarioDateInputElement).value).toBe('2024-02-20T00:00:00.000Z');
		expect(emitSpy.mock.calls[0][0].detail).toEqual({ value: '2024-02-20T00:00:00.000Z' });
	});

	it('emits a host `change` event after the aggregate value was already updated by `input` events', async () => {
		const page = await render(`<ontario-date-input></ontario-date-input>`);
		const emitSpy = vi.fn();
		page.root?.addEventListener('change', emitSpy);

		const inputs = page.root?.shadowRoot?.querySelectorAll('input');
		const [yearInput, monthInput, dayInput] = Array.from(inputs ?? []);

		yearInput.value = '2024';
		dispatchInputEvent(yearInput);
		monthInput.value = '02';
		dispatchInputEvent(monthInput);
		dayInput.value = '20';
		dispatchInputEvent(dayInput);
		await page.waitForChanges();

		dayInput.dispatchEvent(new Event('change'));
		await page.waitForChanges();

		expect(emitSpy).toHaveBeenCalledTimes(1);
		expect((emitSpy.mock.calls[0][0].target as HTMLOntarioDateInputElement).value).toBe('2024-02-20T00:00:00.000Z');
		expect(emitSpy.mock.calls[0][0].detail).toEqual({ value: '2024-02-20T00:00:00.000Z' });
	});

	it('emits a host `input` event when the aggregate value is cleared', async () => {
		const page = await render(`<ontario-date-input value="2024-02-20"></ontario-date-input>`);
		const emitSpy = vi.fn();
		page.root?.addEventListener('input', emitSpy);

		const inputs = page.root?.shadowRoot?.querySelectorAll('input');
		const [yearInput] = Array.from(inputs ?? []);

		yearInput.value = '';
		dispatchInputEvent(yearInput);

		await page.waitForChanges();

		expect((page.root as HTMLOntarioDateInputElement).value).toBe('');
		expect(emitSpy).toHaveBeenCalledTimes(1);
		expect((emitSpy.mock.calls[0][0].target as HTMLOntarioDateInputElement).value).toBe('');
		expect(emitSpy.mock.calls[0][0].detail).toEqual({ value: '' });
	});

	it('emits a host `change` event when the aggregate value is cleared', async () => {
		const page = await render(`<ontario-date-input value="2024-02-20"></ontario-date-input>`);
		const emitSpy = vi.fn();
		page.root?.addEventListener('change', emitSpy);

		const inputs = page.root?.shadowRoot?.querySelectorAll('input');
		const [yearInput] = Array.from(inputs ?? []);

		yearInput.value = '';
		yearInput.dispatchEvent(new Event('change'));

		await page.waitForChanges();

		expect((page.root as HTMLOntarioDateInputElement).value).toBe('');
		expect(emitSpy).toHaveBeenCalledTimes(1);
		expect((emitSpy.mock.calls[0][0].target as HTMLOntarioDateInputElement).value).toBe('');
		expect(emitSpy.mock.calls[0][0].detail).toEqual({ value: '' });
	});

	it('reports an error and ignores invalid aggregate values', async () => {
		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

		const page = await render(`<ontario-date-input value="2024-99-20"></ontario-date-input>`);

		const inputs = page.root?.shadowRoot?.querySelectorAll('input');

		expect(inputs?.[0].value).toBe('');
		expect(inputs?.[1].value).toBe('');
		expect(inputs?.[2].value).toBe('');
		expect((page.root as HTMLOntarioDateInputElement).value).toBe('2024-99-20');
		expect(consoleErrorSpy).toHaveBeenCalled();

		consoleErrorSpy.mockRestore();
	});

	it('reports an error and ignores array aggregate values passed at runtime', async () => {
		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

		const page = await render(`<ontario-date-input value="2024-02-20"></ontario-date-input>`);

		(page.root as HTMLOntarioDateInputElement).value = ['2024-02-20'] as unknown as string;
		await page.waitForChanges();

		const inputs = page.root?.shadowRoot?.querySelectorAll('input');

		expect(inputs?.[0].value).toBe('2024');
		expect(inputs?.[1].value).toBe('02');
		expect(inputs?.[2].value).toBe('20');
		expect((page.root as HTMLOntarioDateInputElement).value).toEqual(['2024-02-20']);
		expect(consoleErrorSpy).toHaveBeenCalled();

		consoleErrorSpy.mockRestore();
	});
});

describe('date-validation-utils', () => {
	it('is invalid year value - undefined string', () => {
		// Note: Type system doesn't like `undefined` as `any` lets us force it for testing purposes
		const value: any = undefined;

		const isInvalidYearResult = isInvalidYear(value);
		expect(isInvalidYearResult).toEqual(true);
	});

	it('is invalid year value - null string', () => {
		// Note: Type system doesn't like `null` as `any` lets us force it for testing purposes
		const value: any = null;

		const isInvalidYearResult = isInvalidYear(value);
		expect(isInvalidYearResult).toEqual(true);
	});

	it('is invalid year value - empty string', () => {
		const value = ''; // Empty string

		const isInvalidYearResult = isInvalidYear(value);
		expect(isInvalidYearResult).toEqual(true);
	});

	it('is invalid year value - written out number', () => {
		const value = 'two-thousand';

		const isInvalidYearResult = isInvalidYear(value);
		expect(isInvalidYearResult).toEqual(true);
	});

	it('is valid year value', () => {
		const value = '2000';

		const isValidYear = !isInvalidYear(value);
		expect(isValidYear).toEqual(true);
	});

	it('is valid year when in range', () => {
		const value = '2000';
		const minYear = 1;
		const maxYear = 9999;

		const isValidYear = !isInvalidYear(value, minYear, maxYear);
		expect(isValidYear).toEqual(true);
	});

	it('is valid year when in range but is minYear', () => {
		const value = '2000';
		const minYear = 2000;
		const maxYear = 9999;

		const isValidYear = !isInvalidYear(value, minYear, maxYear);
		expect(isValidYear).toEqual(true);
	});

	it('is valid year when in range but is maxYear', () => {
		const value = '2000';
		const minYear = 1;
		const maxYear = 2000;

		const isValidYear = !isInvalidYear(value, minYear, maxYear);
		expect(isValidYear).toEqual(true);
	});

	it('is invalid year when out of range', () => {
		const value = '2000';
		const minYear = 1;
		const maxYear = 1999;

		const isValidYear = !isInvalidYear(value, minYear, maxYear);
		expect(isValidYear).toEqual(false);
	});
});
