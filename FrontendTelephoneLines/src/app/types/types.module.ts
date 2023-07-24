import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypesRoutingModule } from './types-routing.module';
import {TypesComponent} from "./types.component";
import { InternetMobileComponent } from './internet-mobile/internet-mobile.component';
import { InternetMobileVPNComponent } from './internet-mobile-vpn/internet-mobile-vpn.component';
import { GSMComponent } from './gsm/gsm.component';
import { FixVpnadslVpnllComponent } from './fix-vpnadsl-vpnll/fix-vpnadsl-vpnll.component';


@NgModule({
  declarations: [
    TypesComponent,
    InternetMobileComponent,
    InternetMobileVPNComponent,
    GSMComponent,
    FixVpnadslVpnllComponent
  ],
  imports: [
    CommonModule,
    TypesRoutingModule
  ]
})
export class TypesModule { }
