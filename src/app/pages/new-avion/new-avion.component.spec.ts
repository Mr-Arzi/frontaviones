import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAvionComponent } from './new-avion.component';

describe('NewAvionComponent', () => {
  let component: NewAvionComponent;
  let fixture: ComponentFixture<NewAvionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAvionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAvionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
