# Angular Integration App - AI Agent Instructions

**Package**: `app-angular`

This is the **Angular integration testing application** for testing Angular directives, form integration (especially value accessors), and ensuring components work correctly in Angular environment. See [root AGENTS.md](../../AGENTS.md) for universal guidelines.

## Quick Reference

```bash
# Development
pnpm run start       # Start Angular dev server
pnpm run build       # Production build

# Testing
pnpm run test        # Run unit tests
pnpm run test:e2e    # Run E2E tests
pnpm run lint        # Lint code
```

## Purpose

This app serves to:

1. **Forms Testing**: Primary focus - test Angular Forms integration with value accessors
2. **Integration Testing**: Verify Angular directives work correctly
3. **Two-Way Binding**: Test `[(ngModel)]` and `formControlName` patterns
4. **Validation Testing**: Ensure Angular validators work with components
5. **Regression Testing**: Catch Angular-specific issues before release

## Structure

```
app-angular/
├── src/
│   ├── app/
│   │   ├── components/     # Test components
│   │   ├── examples/       # Usage examples
│   │   ├── pages/          # Test pages
│   │   └── app.module.ts   # Main module
│   └── environments/
├── tests/                  # E2E tests
└── angular.json
```

## Angular Forms Integration

### Module Setup

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OntarioDesignSystemComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@NgModule({
	declarations: [AppComponent /* ... */],
	imports: [
		BrowserModule,
		ReactiveFormsModule, // For reactive forms
		FormsModule, // For template-driven forms
		OntarioDesignSystemComponentLibraryModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
```

### Reactive Forms Testing

```typescript
// reactive-form-test.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-reactive-form-test',
	templateUrl: './reactive-form-test.component.html',
})
export class ReactiveFormTestComponent {
	form: FormGroup;
	submitted = false;

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			name: ['', [Validators.required, Validators.minLength(2)]],
			age: ['', [Validators.required, Validators.min(18)]],
			subscribe: [false],
			country: [''],
		});
	}

	get email() {
		return this.form.get('email');
	}

	get name() {
		return this.form.get('name');
	}

	onSubmit() {
		this.submitted = true;
		if (this.form.valid) {
			console.log('Form submitted:', this.form.value);
		}
	}
}
```

**Template**:

```html
<!-- reactive-form-test.component.html -->
<form [formGroup]="form" (ngSubmit)="onSubmit()">
	<h2>Reactive Form Test</h2>

	<!-- Text Input -->
	<ontario-input formControlName="email" type="email" label="Email" [required]="true"></ontario-input>
	<div *ngIf="submitted && email?.errors" class="error">
		<p *ngIf="email?.errors?.['required']">Email is required</p>
		<p *ngIf="email?.errors?.['email']">Invalid email format</p>
	</div>

	<!-- Another Input -->
	<ontario-input formControlName="name" type="text" label="Name" [required]="true"></ontario-input>
	<div *ngIf="submitted && name?.errors" class="error">
		<p *ngIf="name?.errors?.['required']">Name is required</p>
		<p *ngIf="name?.errors?.['minlength']">Name must be at least 2 characters</p>
	</div>

	<!-- Checkboxes -->
	<ontario-checkboxes
		formControlName="subscribe"
		[options]="[{ value: 'yes', label: 'Subscribe to newsletter' }]"
	></ontario-checkboxes>

	<!-- Radio Buttons -->
	<ontario-radio-buttons
		formControlName="country"
		[options]="[
      { value: 'ca', label: 'Canada' },
      { value: 'us', label: 'United States' }
    ]"
	></ontario-radio-buttons>

	<!-- Dropdown -->
	<ontario-dropdown-list
		formControlName="age"
		label="Age Range"
		[options]="[
      { value: '18-25', label: '18-25' },
      { value: '26-35', label: '26-35' },
      { value: '36+', label: '36+' }
    ]"
	></ontario-dropdown-list>

	<!-- Submit Button -->
	<ontario-button type="submit"> Submit Form </ontario-button>

	<!-- Debug Output -->
	<pre>{{ form.value | json }}</pre>
	<p>Form Valid: {{ form.valid }}</p>
</form>
```

### Template-Driven Forms Testing

```typescript
// template-driven-form-test.component.ts
import { Component } from '@angular/core';

@Component({
	selector: 'app-template-driven-test',
	templateUrl: './template-driven-test.component.html',
})
export class TemplateDrivenTestComponent {
	model = {
		email: '',
		name: '',
		subscribe: false,
	};

	submitted = false;

	onSubmit(form: any) {
		this.submitted = true;
		if (form.valid) {
			console.log('Form submitted:', this.model);
		}
	}
}
```

**Template**:

```html
<!-- template-driven-test.component.html -->
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
	<h2>Template-Driven Form Test</h2>

	<ontario-input
		name="email"
		type="email"
		label="Email"
		[(ngModel)]="model.email"
		required
		email
		#emailInput="ngModel"
	></ontario-input>
	<div *ngIf="submitted && emailInput.errors" class="error">
		<p *ngIf="emailInput.errors?.['required']">Email is required</p>
		<p *ngIf="emailInput.errors?.['email']">Invalid email</p>
	</div>

	<ontario-input
		name="name"
		type="text"
		label="Name"
		[(ngModel)]="model.name"
		required
		minlength="2"
		#nameInput="ngModel"
	></ontario-input>
	<div *ngIf="submitted && nameInput.errors" class="error">
		<p *ngIf="nameInput.errors?.['required']">Name is required</p>
		<p *ngIf="nameInput.errors?.['minlength']">Name too short</p>
	</div>

	<ontario-checkboxes
		name="subscribe"
		[(ngModel)]="model.subscribe"
		[options]="[{ value: true, label: 'Subscribe' }]"
	></ontario-checkboxes>

	<ontario-button type="submit"> Submit </ontario-button>

	<pre>{{ model | json }}</pre>
	<p>Form Valid: {{ form.valid }}</p>
</form>
```

## E2E Testing

### Form Validation Tests

```typescript
// tests/forms.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Reactive Forms Integration', () => {
	test('should validate required fields', async ({ page }) => {
		await page.goto('/reactive-form');

		// Submit without filling
		await page.click('ontario-button[type="submit"]');

		// Verify validation errors
		await expect(page.locator('.error')).toContainText('Email is required');
		await expect(page.locator('.error')).toContainText('Name is required');
	});

	test('should submit valid form', async ({ page }) => {
		await page.goto('/reactive-form');

		// Fill form
		await page.locator('ontario-input[formcontrolname="email"]').fill('test@example.com');
		await page.locator('ontario-input[formcontrolname="name"]').fill('John Doe');

		// Submit
		await page.click('ontario-button[type="submit"]');

		// Verify success
		await expect(page.locator('.success-message')).toBeVisible();
	});

	test('should update form state on input', async ({ page }) => {
		await page.goto('/reactive-form');

		const input = page.locator('ontario-input[formcontrolname="email"]');
		await input.fill('test@example.com');

		// Verify form value updated
		const debugOutput = page.locator('pre');
		await expect(debugOutput).toContainText('"email": "test@example.com"');
	});
});
```

### Value Accessor Tests

```typescript
test.describe('Value Accessor Integration', () => {
	test('should sync with FormControl', async ({ page }) => {
		await page.goto('/reactive-form');

		// Type in input
		await page.locator('ontario-input[formcontrolname="email"]').fill('user@test.com');

		// Check FormControl has value
		const formValue = await page.evaluate(() => {
			const email = (window as any).testForm.get('email').value;
			return email;
		});

		expect(formValue).toBe('user@test.com');
	});

	test('should handle programmatic setValue', async ({ page }) => {
		await page.goto('/reactive-form');

		// Programmatically set value
		await page.evaluate(() => {
			(window as any).testForm.get('email').setValue('programmatic@test.com');
		});

		// Verify input displays value
		const input = page.locator('ontario-input[formcontrolname="email"]');
		await expect(input).toHaveValue('programmatic@test.com');
	});
});
```

### Validation Integration Tests

```typescript
test.describe('Angular Validators', () => {
	test('should apply custom validators', async ({ page }) => {
		await page.goto('/reactive-form');

		const emailInput = page.locator('ontario-input[formcontrolname="email"]');

		// Test invalid email
		await emailInput.fill('notanemail');
		await page.click('ontario-button[type="submit"]');

		await expect(page.locator('.error')).toContainText('Invalid email format');

		// Test valid email
		await emailInput.fill('valid@email.com');
		await page.click('ontario-button[type="submit"]');

		await expect(page.locator('.error')).not.toBeVisible();
	});
});
```

## Component Testing

### Unit Tests (Jasmine/Karma)

```typescript
// reactive-form-test.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { OntarioDesignSystemComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';
import { ReactiveFormTestComponent } from './reactive-form-test.component';

describe('ReactiveFormTestComponent', () => {
	let component: ReactiveFormTestComponent;
	let fixture: ComponentFixture<ReactiveFormTestComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ReactiveFormTestComponent],
			imports: [ReactiveFormsModule, OntarioDesignSystemComponentLibraryModule],
		}).compileComponents();

		fixture = TestBed.createComponent(ReactiveFormTestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create form with correct controls', () => {
		expect(component.form.get('email')).toBeTruthy();
		expect(component.form.get('name')).toBeTruthy();
	});

	it('should validate email field', () => {
		const emailControl = component.form.get('email');

		emailControl?.setValue('');
		expect(emailControl?.hasError('required')).toBe(true);

		emailControl?.setValue('invalid');
		expect(emailControl?.hasError('email')).toBe(true);

		emailControl?.setValue('valid@email.com');
		expect(emailControl?.valid).toBe(true);
	});

	it('should not submit invalid form', () => {
		spyOn(console, 'log');

		component.onSubmit();

		expect(component.submitted).toBe(true);
		expect(console.log).not.toHaveBeenCalled();
	});
});
```

## Testing Value Accessor Configuration

Verify value accessor configs are working:

```typescript
// value-accessor-test.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-value-accessor-test',
	template: `
		<h2>Value Accessor Tests</h2>
		<form [formGroup]="form">
			<!-- Test each configured value accessor -->

			<ontario-input formControlName="textInput" type="text" label="Text Input (Value Accessor)"></ontario-input>

			<ontario-checkboxes formControlName="checkboxes" [options]="checkboxOptions"></ontario-checkboxes>

			<ontario-radio-buttons formControlName="radio" [options]="radioOptions"></ontario-radio-buttons>

			<ontario-dropdown-list formControlName="dropdown" [options]="dropdownOptions"></ontario-dropdown-list>

			<ontario-date-input formControlName="date"></ontario-date-input>
		</form>

		<h3>Form Values:</h3>
		<pre>{{ form.value | json }}</pre>
	`,
})
export class ValueAccessorTestComponent implements OnInit {
	form: FormGroup;

	checkboxOptions = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
	];

	radioOptions = [
		{ value: 'yes', label: 'Yes' },
		{ value: 'no', label: 'No' },
	];

	dropdownOptions = [
		{ value: '1', label: 'One' },
		{ value: '2', label: 'Two' },
	];

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			textInput: [''],
			checkboxes: [[]],
			radio: [''],
			dropdown: [''],
			date: [''],
		});
	}

	ngOnInit() {
		// Watch for value changes
		this.form.valueChanges.subscribe((value) => {
			console.log('Form value changed:', value);
		});
	}
}
```

## Common Issues

### Value Accessor Not Working

1. **Check Stencil config** has correct value accessor configuration
2. **Verify event names** match exactly
3. **Rebuild Angular library** after config changes:

```bash
cd packages/ontario-design-system-component-library && pnpm run build
cd ../ontario-design-system-component-library-angular && pnpm run build
```

4. **Clear Angular cache**: `rm -rf .angular dist`

### Form Validation Not Triggering

Check that:

- `ReactiveFormsModule` or `FormsModule` imported
- Validators added to FormControl
- Error messages check correct error keys

### Two-Way Binding Not Working

For `[(ngModel)]`:

- Ensure `FormsModule` imported
- Component must have value accessor configured
- Check event name in value accessor config

## Development Workflow

### After Component Library Changes

```bash
# Rebuild component library
cd packages/ontario-design-system-component-library
pnpm run build

# Rebuild Angular library
cd ../ontario-design-system-component-library-angular
pnpm run build

# Clear Angular cache and restart
cd ../app-angular
rm -rf .angular dist node_modules/.cache
pnpm run start
```

### Adding New Form Component Test

1. **Verify value accessor** configured in `stencil.config.ts`
2. **Create test component** in `src/app/components/`
3. **Add to routing** (if applicable)
4. **Test both form types**: Reactive and template-driven
5. **Add E2E tests** in `tests/`
6. **Verify validation** works

## Best Practices

1. **Test Both Form Types**: Reactive and template-driven
2. **Test All Validators**: Required, email, min, max, pattern, etc.
3. **Test Programmatic Changes**: setValue, patchValue, reset
4. **Test Edge Cases**: Empty values, null, undefined
5. **Test Error Display**: Ensure error messages show/hide correctly
6. **Document Issues**: Note Angular-specific quirks

## Dependencies

**Key Dependencies**:

- `@ongov/ontario-design-system-component-library-angular`
- Angular Core
- Angular Forms
- Angular Router (if used)

**Dev Dependencies**:

- Angular CLI
- Karma & Jasmine (unit tests)
- Playwright (E2E tests)

## Additional Resources

- [Angular Library AGENTS.md](../ontario-design-system-component-library-angular/AGENTS.md)
- [Component Library AGENTS.md](../ontario-design-system-component-library/AGENTS.md)
- [Angular Forms Guide](https://angular.io/guide/forms-overview)
- [Angular Reactive Forms](https://angular.io/guide/reactive-forms)
- [Angular Template-Driven Forms](https://angular.io/guide/forms)
- [ControlValueAccessor API](https://angular.io/api/forms/ControlValueAccessor)
