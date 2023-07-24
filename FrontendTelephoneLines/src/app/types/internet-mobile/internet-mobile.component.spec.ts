import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetMobileComponent } from './internet-mobile.component';

describe('InternetMobileComponent', () => {
  let component: InternetMobileComponent;
  let fixture: ComponentFixture<InternetMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternetMobileComponent]
    });
    fixture = TestBed.createComponent(InternetMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
