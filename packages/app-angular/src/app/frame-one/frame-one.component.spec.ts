import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameOneComponent } from './frame-one.component';

describe('FrameOneComponent', () => {
	let component: FrameOneComponent;
	let fixture: ComponentFixture<FrameOneComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FrameOneComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FrameOneComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
