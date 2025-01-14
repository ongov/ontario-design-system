import { newSpecPage } from '@stencil/core/testing';
import { OntarioDateInput } from '../ontario-date-input';
import { isInvalidYear } from '../utils';

describe('ontario-date-input', () => {
	it('renders deafult state', async () => {
		const page = await newSpecPage({
			components: [OntarioDateInput],
			html: `<ontario-date-input language="en" element-id="date-id-example"></ontario-date-input>`,
		});
		expect(page.root).toEqualHtml(`
			<ontario-date-input element-id="date-id-example" language="en">
				<mock:shadow-root>
					<div class="ontario-form-group">
						<fieldset class="ontario-fieldset" role="group">
							<legend class="ontario-fieldset__legend">
								Exact date
								<span class="ontario-label__flag">
									(optional)
								</span>
							</legend>
							<div class="ontario-error-messaging ontario-error__hidden" role="alert">
								<ontario-icon-alert-error></ontario-icon-alert-error>
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
									<input aria-describedby="date-input-hint-date-id-example" class="ontario-input ontario-input--4-char-width" id="year-date-id-example" inputmode="numeric" type="text">
								</div>
								<div class="ontario-date__group-input">
									<label htmlfor="month-date-id-example">
										Month
										<span class="ontario-show-for-sr">
											(1 or 2 digits)
										</span>
									</label>
									<input aria-describedby="date-input-hint-date-id-example" class="ontario-input ontario-input--4-char-width" id="month-date-id-example" inputmode="numeric" type="text">
								</div>
								<div class="ontario-date__group-input">
									<label htmlfor="day-date-id-example">
										Day
										<span class="ontario-show-for-sr">
											(4 digits)
										</span>
									</label>
									<input aria-describedby="date-input-hint-date-id-example" class="ontario-input ontario-input--4-char-width" id="day-date-id-example" inputmode="numeric" type="text">
								</div>
							</div>
						</fieldset>
					</div>
				</mock:shadow-root>
			</ontario-date-input>
    `);
	});

	it('should render custom prop', async () => {
		const page = await newSpecPage({
			components: [OntarioDateInput],
			html: `
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
			`,
		});

		expect(page.root).toEqualHtml(`
			<ontario-date-input element-id="date-id-example" caption="{ &quot;captionText&quot;: &quot;Enter Date&quot;, &quot;captionType&quot;: &quot;default&quot; }" date-options="[&quot;month&quot;, &quot;year&quot;]" hint-text="Example 1990 12" max-year="1000" min-year="500" placeholder="{ &quot;day&quot;: &quot;D&quot;, &quot;month&quot;: &quot;M&quot;, &quot;year&quot;: &quot;YY&quot; }" required="true">
				<mock:shadow-root>
					<div class="ontario-form-group">
						<fieldset class="ontario-fieldset" role="group">
							<legend class="ontario-fieldset__legend">
								Enter Date
								<span class="ontario-label__flag">
									(required)
								</span>
							</legend>
							<p class="ontario-hint" id="date-input-hint-date-id-example">
								Example 1990 12
							</p>
							<div class="ontario-error-messaging ontario-error__hidden" role="alert">
								<ontario-icon-alert-error></ontario-icon-alert-error>
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
									<input aria-describedby="date-input-hint-date-id-example" class="ontario-input ontario-input--4-char-width" id="year-date-id-example" inputmode="numeric" placeholder="YY" required="" type="text">
								</div>
								<div class="ontario-date__group-input">
									<label htmlfor="month-date-id-example">
										Month
										<span class="ontario-show-for-sr">
											(1 or 2 digits)
										</span>
									</label>
									<input aria-describedby="date-input-hint-date-id-example" class="ontario-input ontario-input--4-char-width" id="month-date-id-example" inputmode="numeric" placeholder="M" required="" type="text">
								</div>
							</div>
						</fieldset>
					</div>
				</mock:shadow-root>
			</ontario-date-input>
		`);
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
