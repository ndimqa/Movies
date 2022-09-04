import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MovieListComponent} from './movie-list/movie-list.component';
import {GenreComponent} from './genre/genre.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';

const routes: Routes = [
  {path: '', redirectTo: '/movies', pathMatch: 'full', component: MovieListComponent},
  {path: 'movies/:id', component: MovieDetailsComponent},
  {path: 'genre/:id', component: GenreComponent},
  {path: 'genres/:id', component: GenreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
