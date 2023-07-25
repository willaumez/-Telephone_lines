import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {LigneTelComponent} from "./ligne-tel/ligne-tel.component";

const routes: Routes = [

    {path: "login", component: LoginComponent},
    {path: "", redirectTo: "/login", pathMatch: "full"},
    {
      path: 'admin',
      component: AdminTemplateComponent,
      canActivate: [AuthenticationGuard],
      children: [
        {path: 'list', component: LigneTelComponent},
        {path: '', redirectTo: 'list', pathMatch: 'full'}, // Redirect to 'list' when accessing '/admin'
        {
          path: 'types',
          loadChildren: () => import('./types/types.module').then(m => m.TypesModule)
        },
        {path: 'users', component: LoginComponent},
        {path: 'notAuthorized', component: NotAuthorizedComponent},
      ],
    },

  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
