import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHairstyleComponent } from './detail-hairstyle.component';

describe('DetailHairstyleComponent', () => {
  let component: DetailHairstyleComponent;
  let fixture: ComponentFixture<DetailHairstyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailHairstyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailHairstyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
