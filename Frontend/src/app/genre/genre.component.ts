import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../movie.service';
import {GenreService} from '../genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  movies: any;
  genre: any;
  searchText: any = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesService: MovieService,
    private genresService: GenreService
  ) {
    this.router.events.subscribe((value => {
      this.getMovies();
      this.getGenre();
    }));
  }

  ngOnInit(): void {
    this.getMovies();
    this.getGenre();
  }

  getMovies(): void {
    const id: number = +this.route.snapshot.paramMap.get('genreId');
    this.moviesService.getMoviesByGenreId(id).subscribe(movies => this.movies = movies);
  }

  getGenre(): void {
    const id = +this.route.snapshot.paramMap.get('genreId');
    this.genresService.getGenre(id).subscribe(genre => this.genre = genre);
  }
}
