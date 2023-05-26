import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FramesixComponent } from './framesix.component';

describe('FramesixComponent', () => {
	let component: FramesixComponent;
	let fixture: ComponentFixture<FramesixComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FramesixComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FramesixComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
