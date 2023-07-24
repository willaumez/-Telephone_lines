import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit{

  isSideNavCollapsed:boolean = false;
  screenWidth:number= 0;
  constructor(public loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  handleLogout() {
    this.loginService.logout();
    this.router.navigateByUrl("/login");
  }

  onToggleSideNav(data: SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed= data.collapsed;
  }

}
