import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  static isLogged: boolean;
  title = 'Movie Reviews';

  constructor(public router: Router) {
    AppComponent.isLogged = false;
  }

  ngOnInit(): void {

  }
}
