import { newSpecPage } from '@stencil/core/testing';
import { OntarioDateInput } from '../ontario-date-input';

describe('ontario-date-input', () => {
	it('renders deafult state', async () => {
		const page = await newSpecPage({
			components: [OntarioDateInput],
			html: `<ontario-date-input></ontario-date-input>`,
		});
		expect(page.root).toEqualHtml(`
			<ontario-date-input>
				<mock:shadow-root>
					<div class="ontario-form-group">
						<fieldset aria-describedby="date-input-hint" class="ontario-fieldset" role="group">
							<legend class="ontario-fieldset__legend">
								Exact date
								<span class="ontario-label__flag">
									(optional)
								</span>
							</legend>
							<p class="ontario-hint" id="date-input-hint">
								For example: 1990 3 15
							</p>
							<div class="ontario-error-messaging ontario-error__hidden">
								<ontario-icon-alert-error></ontario-icon-alert-error>
								<div class="ontario-error-messaging__content"></div>
							</div>
							<div class="ontario-date__group">
								<div class="ontario-date__group-input">
									<label htmlfor="year">
										Year
										<span class="ontario-show-for-sr">
											(1 or 2 digits)
										</span>
									</label>
									<input class="ontario-input ontario-input--4-char-width" id="year" inputmode="numeric" placeholder="YYYY" type="text">
								</div>
								<div class="ontario-date__group-input">
									<label htmlfor="month">
										Month
										<span class="ontario-show-for-sr">
											(1 or 2 digits)
										</span>
									</label>
									<input class="ontario-input ontario-input--4-char-width" id="month" inputmode="numeric" placeholder="MM" type="text">
								</div>
								<div class="ontario-date__group-input">
									<label htmlfor="day">
										Day
										<span class="ontario-show-for-sr">
											(4 digits)
										</span>
									</label>
									<input class="ontario-input ontario-input--4-char-width" id="day" inputmode="numeric" placeholder="DD" type="text">
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
			<ontario-date-input caption="{ &quot;captionText&quot;: &quot;Enter Date&quot;, &quot;captionType&quot;: &quot;default&quot; }" date-options="[&quot;month&quot;, &quot;year&quot;]" hint-text="Example 1990 12" max-year="1000" min-year="500" placeholder="{ &quot;day&quot;: &quot;D&quot;, &quot;month&quot;: &quot;M&quot;, &quot;year&quot;: &quot;YY&quot; }" required="true">
				<mock:shadow-root>
					<div class="ontario-form-group">
						<fieldset aria-describedby="date-input-hint" class="ontario-fieldset" role="group">
							<legend class="ontario-fieldset__legend">
								Enter Date
								<span class="ontario-label__flag">
									(required)
								</span>
							</legend>
							<p class="ontario-hint" id="date-input-hint">
								Example 1990 12
							</p>
							<div class="ontario-error-messaging ontario-error__hidden">
								<ontario-icon-alert-error></ontario-icon-alert-error>
								<div class="ontario-error-messaging__content"></div>
							</div>
							<div class="ontario-date__group">
								<div class="ontario-date__group-input">
									<label htmlfor="month">
										Month
										<span class="ontario-show-for-sr">
											(1 or 2 digits)
										</span>
									</label>
									<input class="ontario-input ontario-input--4-char-width" id="month" inputmode="numeric" placeholder="M" required="" type="text">
								</div>
								<div class="ontario-date__group-input">
									<label htmlfor="day">
										Day
										<span class="ontario-show-for-sr">
											(4 digits)
										</span>
									</label>
									<input class="ontario-input ontario-input--4-char-width" id="day" inputmode="numeric" placeholder="D" required="" type="text">
								</div>
							</div>
						</fieldset>
					</div>
				</mock:shadow-root>
			</ontario-date-input>
		`);
	});
});
