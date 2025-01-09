import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairStyleViewComponent } from './hair-style-view.component';

describe('HairStyleViewComponent', () => {
  let component: HairStyleViewComponent;
  let fixture: ComponentFixture<HairStyleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HairStyleViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HairStyleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
