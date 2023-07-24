import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetMobileVPNComponent } from './internet-mobile-vpn.component';

describe('InternetMobileVPNComponent', () => {
  let component: InternetMobileVPNComponent;
  let fixture: ComponentFixture<InternetMobileVPNComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternetMobileVPNComponent]
    });
    fixture = TestBed.createComponent(InternetMobileVPNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
