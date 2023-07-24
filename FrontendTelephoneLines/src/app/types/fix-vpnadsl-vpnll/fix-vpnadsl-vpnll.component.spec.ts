import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixVpnadslVpnllComponent } from './fix-vpnadsl-vpnll.component';

describe('FixVpnadslVpnllComponent', () => {
  let component: FixVpnadslVpnllComponent;
  let fixture: ComponentFixture<FixVpnadslVpnllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FixVpnadslVpnllComponent]
    });
    fixture = TestBed.createComponent(FixVpnadslVpnllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
