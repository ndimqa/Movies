import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RatingModule} from 'ng-starrating';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MovieFilterComponent } from './movie-filter/movie-filter.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { GenreComponent } from './genre/genre.component';
import { LogInComponent } from './log-in/log-in.component';

import {FilterPipe} from './movie-list/pipes';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MovieDetailsComponent,
    LogInComponent,
    MovieFilterComponent,
    GenreComponent,
    FilterPipe,
    MovieListComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RatingModule,
    RouterModule.forRoot([
      {path: '', component: MovieListComponent},
      {path: 'movies', component: MovieListComponent},
      {path: 'movies/:id', component: MovieDetailsComponent},
      {path: 'genre/:genreId', component: GenreComponent},
      {path: 'login', component: LogInComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'profile', component: ProfileComponent}
    ]),
    FormsModule,
  ],
  providers: [
    HttpClientModule,
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
