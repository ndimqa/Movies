import {Injectable} from '@angular/core';
import {genres} from './genres';
import {Observable, of} from 'rxjs';
import {Genre} from './genres';
import {HttpClient} from '@angular/common/http';
import {Movie} from './movies';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private client: HttpClient) {
  }

  getGenre(id: any): Observable<Genre> {
    return of(genres.find(genre => genre.id === id));
  }

  getGenres(): Observable<Genre[]> {
    return of(genres);
  }
}
