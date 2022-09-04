import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  private login: string;
  constructor(private router: Router,
              private loginService: LoginService,
              private location: Location
  ) {
  }

  username = '';
  password = '';
  isTaken = false;


  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  loginFunc(): void {
    this.loginService.login(this.username, this.password).subscribe((data) => {
      AppComponent.isLogged = true;
      this.location.back();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', this.username);
      this.username = '';
      this.password = '';
      // const login = document.getElementById('username');
      // const password = document.getElementById('password');
      // // console.log(username);
      // // console.log(password);
      // if (this.login === 'admin' && this.password === '123456'){
      //   this.router.navigateByUrl('/profile');
      // }else{
      //   window.alert(Login or password is incorrect. Please try again);
      //   this.login = '';
      //   this.password = '';
      // }
    });
  }
}