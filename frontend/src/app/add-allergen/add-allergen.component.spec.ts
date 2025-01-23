import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllergenComponent } from './add-allergen.component';

describe('AddAllergenComponent', () => {
  let component: AddAllergenComponent;
  let fixture: ComponentFixture<AddAllergenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAllergenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAllergenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
