import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FramefiveComponent } from './framefive.component';

describe('FramefiveComponent', () => {
	let component: FramefiveComponent;
	let fixture: ComponentFixture<FramefiveComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FramefiveComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FramefiveComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
