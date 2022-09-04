import {Component, OnInit} from '@angular/core';
import {GenreService} from '../genre.service';
import {Genre} from '../genres';
import {Movie} from '../movies';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {
  genres: Genre[] = [];

  constructor(private genreService: GenreService) {
  }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(): void {
    this.genreService.getGenres().subscribe((data) => {
      console.log(data);
      this.genres = data;
    });
  }
}
