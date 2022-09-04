import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  login: string;
  password: string;
  name: string;
  surname: string;

  constructor() { }

  ngOnInit(): void {
  }

  registerFunc(): void{
    window.alert(`Registration is not available now. Please try again later`);
  }
}
