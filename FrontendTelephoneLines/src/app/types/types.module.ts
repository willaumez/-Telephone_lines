import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypesRoutingModule } from './types-routing.module';
import {TypesComponent} from "./types.component";
import { InternetMobileComponent } from './internet-mobile/internet-mobile.component';
import { InternetMobileVPNComponent } from './internet-mobile-vpn/internet-mobile-vpn.component';
import { GSMComponent } from './gsm/gsm.component';
import { FixVpnadslVpnllComponent } from './fix-vpnadsl-vpnll/fix-vpnadsl-vpnll.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";


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
        TypesRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule
    ]
})
export class TypesModule { }
