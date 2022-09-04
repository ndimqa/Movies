import {Component, OnInit} from '@angular/core';
import {Movie} from '../movies';
import { Location } from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  searchText: any = '';

  constructor(private movieService: MovieService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe((data) => {
      console.log(data);
      this.movies = data;
    });
  }

}

