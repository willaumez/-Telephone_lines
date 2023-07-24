import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {navbarData, navbarData2} from "./nav-data";
import {MatDividerModule} from "@angular/material/divider";
import {LoginService} from "../services/login.service";
import {animate, animation, keyframes, style, transition, trigger} from "@angular/animations";
import {fadeInOut, INavBarData} from "./helper";
import {Router} from "@angular/router";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: 0}),
            style({transform: 'rotate(2turn)', offset: 1})
          ]))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit{

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter()
  collapsed:boolean = false;
  screenWidth: number= 0;
  navData = navbarData;
  navData2 = navbarData2;

  multiple: boolean = false;

  constructor(public loginService: LoginService, public router: Router) {
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 768){
      this.closeSidenav();
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse():void {
    this.collapsed = ! this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  handleClick(item: INavBarData): void{
    if (!this.multiple){
      for (let modelItem of this.navData){
        if (item !== modelItem && modelItem.expanded){
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }


  getActiveClass(data: INavBarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  handleLogOut() {
    this.loginService.logout();
    this.router.navigateByUrl("/login");
  }
}
