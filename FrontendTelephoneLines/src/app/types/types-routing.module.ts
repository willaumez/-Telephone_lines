import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TypesComponent} from "./types.component";
import {InternetMobileComponent} from "./internet-mobile/internet-mobile.component";
import {InternetMobileVPNComponent} from "./internet-mobile-vpn/internet-mobile-vpn.component";
import {FixVpnadslVpnllComponent} from "./fix-vpnadsl-vpnll/fix-vpnadsl-vpnll.component";
import {GSMComponent} from "./gsm/gsm.component";

const routes: Routes = [
  {
    path: 'gsm',
    component: GSMComponent
  },
  {
    path: 'internet-mobile',
    component: InternetMobileComponent
  },
  {
    path: 'fix',
    component: FixVpnadslVpnllComponent
  },
  {
    path: 'internet-mobile-vpn',
    component: InternetMobileVPNComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypesRoutingModule { }
