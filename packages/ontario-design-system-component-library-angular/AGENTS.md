# Angular Component Library - AI Agent Instructions

**Package**: `@ongov/ontario-design-system-component-library-angular`

This package contains **auto-generated Angular directives** for Stencil components, including value accessor support for Angular Forms. See [root AGENTS.md](../../AGENTS.md) for universal guidelines.

## Quick Reference

```bash
# Build
pnpm run build

# The source directives are generated - don't edit directly!
# Edit the Stencil components in ontario-design-system-component-library instead
```

## How It Works

### Auto-Generation

Angular directives are **automatically generated** from Stencil components:

```typescript
// In packages/ontario-design-system-component-library/stencil.config.ts
angularOutputTarget({
	componentCorePackage: '@ongov/ontario-design-system-component-library',
	directivesProxyFile: '../ontario-design-system-component-library-angular/src/directives/proxies.ts',
	valueAccessorConfigs: [
		// Form component configs
	],
});
```

**Flow**:

1. Build component library
2. Angular directives generated to `src/directives/`
3. Build this package
4. Angular apps can import components

## Usage in Angular

### Module Import

```typescript
import { OntarioDesignSystemComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@NgModule({
	imports: [
		OntarioDesignSystemComponentLibraryModule,
		// ...
	],
})
export class AppModule {}
```

### Basic Usage

```typescript
<ontario-button
  variant="primary"
  (buttonClick)="handleClick()"
>
  Click Me
</ontario-button>

<ontario-input
  type="email"
  label="Email"
  (inputChange)="handleChange($event)"
></ontario-input>
```

### Property Binding

```typescript
<ontario-button
  [variant]="buttonVariant"
  [htmlId]="buttonId"
>
  {{ buttonText }}
</ontario-button>
```

## Angular Forms Integration

### Value Accessors

Form components implement `ControlValueAccessor` for seamless Angular Forms integration:

**Configured in Component Library**:

```typescript
valueAccessorConfigs: [
	{
		elementSelectors: ['ontario-input[type="text"]', 'ontario-input[type="email"]'],
		event: 'inputChange', // Event that fires on value change
		targetAttr: 'value', // Property that holds the value
		type: 'text',
	},
	{
		elementSelectors: ['ontario-checkboxes'],
		event: 'checkboxChange',
		targetAttr: 'options',
		type: 'select',
	},
	{
		elementSelectors: ['ontario-radio-buttons'],
		event: 'radioChange',
		targetAttr: 'options',
		type: 'select',
	},
	{
		elementSelectors: ['ontario-dropdown-list'],
		event: 'dropdownChange',
		targetAttr: 'options',
		type: 'select',
	},
];
```

### Reactive Forms

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
	form: FormGroup;

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			name: ['', Validators.required],
			newsletter: [false],
		});
	}
}
```

**Template**:

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
	<ontario-input formControlName="email" type="email" label="Email" [required]="true"></ontario-input>

	<ontario-input formControlName="name" type="text" label="Name" [required]="true"></ontario-input>

	<ontario-checkboxes formControlName="newsletter" [options]="newsletterOptions"></ontario-checkboxes>

	<ontario-button type="submit" [disabled]="!form.valid"> Submit </ontario-button>
</form>
```

### Template-Driven Forms

```html
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
	<ontario-input name="email" type="email" label="Email" [(ngModel)]="email" required></ontario-input>

	<ontario-input name="name" type="text" label="Name" [(ngModel)]="name" required></ontario-input>

	<ontario-button type="submit" [disabled]="!form.valid"> Submit </ontario-button>
</form>
```

### Form Validation

```typescript
// In component
get emailControl() {
  return this.form.get('email');
}

get isEmailInvalid() {
  return this.emailControl?.invalid && this.emailControl?.touched;
}
```

**Template**:

```html
<ontario-input formControlName="email" type="email" label="Email" [required]="true"></ontario-input>

<div *ngIf="isEmailInvalid" class="error-message">
	<p *ngIf="emailControl?.errors?.['required']">Email is required</p>
	<p *ngIf="emailControl?.errors?.['email']">Invalid email format</p>
</div>
```

## Testing

### Component Testing

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OntarioDesignSystemComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

describe('MyComponent', () => {
	let component: MyComponent;
	let fixture: ComponentFixture<MyComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MyComponent],
			imports: [OntarioDesignSystemComponentLibraryModule],
		}).compileComponents();

		fixture = TestBed.createComponent(MyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should render button', () => {
		const button = fixture.nativeElement.querySelector('ontario-button');
		expect(button).toBeTruthy();
	});
});
```

### Form Testing

```typescript
import { ReactiveFormsModule } from '@angular/forms';

describe('Form Component', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FormComponent],
			imports: [ReactiveFormsModule, OntarioDesignSystemComponentLibraryModule],
		}).compileComponents();
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
});
```

### E2E Testing

E2E tests for Angular integration are in the `app-angular` package. See [app-angular AGENTS.md](../app-angular/AGENTS.md).

## Adding a New Form Component

To add value accessor support for a new form component:

1. **Create component** in `ontario-design-system-component-library`
2. **Implement form logic**: Props for value, events for changes
3. **Add config** to `stencil.config.ts`:

```typescript
valueAccessorConfigs: [
	{
		elementSelectors: ['ontario-new-input[type="text"]'],
		event: 'newInputChange', // Must match @Event() name
		targetAttr: 'value', // Property holding the value
		type: 'text',
	},
];
```

4. **Rebuild libraries**:

```bash
cd packages/ontario-design-system-component-library
pnpm run build

cd ../ontario-design-system-component-library-angular
pnpm run build
```

5. **Test in Angular app** with both reactive and template-driven forms

## Build Process

### Dependencies

- `@ongov/ontario-design-system-component-library` (peer dependency)
- Angular dependencies (peer dependencies)

### Build Output

```bash
pnpm run build
```

**Outputs**:

- `dist/` - Angular package format
- Type declarations
- Directive proxies
- Value accessor implementations

## Development Workflow

### Making Changes

**Don't edit generated files!**

1. Edit Stencil component in `ontario-design-system-component-library`
2. Update `valueAccessorConfigs` in `stencil.config.ts` if needed
3. Build component library
4. Build this package
5. Test in `app-angular`

```bash
# Full workflow
cd packages/ontario-design-system-component-library
pnpm run build

cd ../ontario-design-system-component-library-angular
pnpm run build

cd ../app-angular
pnpm run start  # Test changes
```

## Common Issues

### Value Accessor Not Working

1. **Verify config** in `stencil.config.ts`:

   - `event` matches `@Event()` name exactly
   - `targetAttr` matches `@Prop()` name exactly
   - `elementSelectors` match component tag correctly

2. **Check event emission** in Stencil component:

```typescript
@Event() inputChange: EventEmitter<string>;

handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.inputChange.emit(value);  // Must emit!
}
```

3. **Rebuild both packages**:

```bash
cd packages/ontario-design-system-component-library && pnpm run build
cd ../ontario-design-system-component-library-angular && pnpm run build
```

4. **Clear Angular cache**:

```bash
rm -rf packages/app-angular/dist
rm -rf packages/app-angular/.angular
```

### Components Not Updating

1. Rebuild component library
2. Rebuild this package
3. Restart Angular dev server
4. Clear browser cache

### FormControl Not Recognized

Ensure you've imported the correct Angular Forms module:

```typescript
import { ReactiveFormsModule } from '@angular/forms'; // Reactive forms
import { FormsModule } from '@angular/forms'; // Template-driven
```

## Additional Resources

- [Stencil Angular Integration](https://stenciljs.com/docs/angular)
- [Angular Forms Guide](https://angular.io/guide/forms-overview)
- [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor)
- [Component Library AGENTS.md](../ontario-design-system-component-library/AGENTS.md)
- [App Angular AGENTS.md](../app-angular/AGENTS.md)
