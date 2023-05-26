import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FramefourComponent } from './framefour.component';

describe('FramefourComponent', () => {
	let component: FramefourComponent;
	let fixture: ComponentFixture<FramefourComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FramefourComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FramefourComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
