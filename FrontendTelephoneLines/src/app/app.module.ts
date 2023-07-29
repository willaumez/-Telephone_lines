import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AdminTemplateComponent} from './admin-template/admin-template.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import {NotAuthorizedComponent} from './not-authorized/not-authorized.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from '@angular/material/table';


import {SidenavComponent} from './sidenav/sidenav.component';
import {BodyComponent} from './body/body.component';
import {SubLevelMenuComponent} from './sidenav/sub-level-menu.component';
import {LigneTelephoniqueComponent} from './ligne-telephonique/ligne-telephonique.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LigneAddEditComponent} from './ligne-telephonique/ligne-add-edit/ligne-add-edit.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminTemplateComponent,
    NotAuthorizedComponent,
    SidenavComponent,
    BodyComponent,
    SubLevelMenuComponent,
    LigneTelephoniqueComponent,
    LigneAddEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
