import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityChoice } from './city-choice';

describe('CityChoice', () => {
  let component: CityChoice;
  let fixture: ComponentFixture<CityChoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityChoice],
    }).compileComponents();

    fixture = TestBed.createComponent(CityChoice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
