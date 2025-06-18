import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvionCardComponent } from './avion-card.component';

describe('AvionCardComponent', () => {
  let component: AvionCardComponent;
  let fixture: ComponentFixture<AvionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
