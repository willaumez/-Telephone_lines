import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit{

  constructor(public loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  handleLogout() {
    this.loginService.logout();
    this.router.navigateByUrl("/login");
  }
}
