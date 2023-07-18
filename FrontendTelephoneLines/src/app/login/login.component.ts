import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formLogin! : FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
  }
  ngOnInit(): void {
    this.formLogin= this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control(""),
    })
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;

    this.loginService.login(username, password).subscribe({
      next: data => {
        this.loginService.loadProfile(data);
        this.router.navigateByUrl("/admin");
      },
      error: err => {
        console.log("data---  ", err)
      }
    })

  }


}
