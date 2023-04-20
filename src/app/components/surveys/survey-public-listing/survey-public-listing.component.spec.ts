import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPublicListingComponent } from './survey-public-listing.component';

describe('SurveyPublicListingComponent', () => {
  let component: SurveyPublicListingComponent;
  let fixture: ComponentFixture<SurveyPublicListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyPublicListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyPublicListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
