import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Movie} from './movies';
import {Commentary} from "./commentary";
import {HttpClient} from '@angular/common/http';
// import {movies} from './movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private client: HttpClient) {
  }
  BASE_URL = 'http://127.0.0.1:8000';
  getMovies(): Observable<Movie[]> {
    return this.client.get<Movie[]>(`${this.BASE_URL}/api/movies/`);

  }

  getMovieDetail(id: string): Observable<Movie> {
    return this.client.get<Movie>(`${this.BASE_URL}/api/movies/${id}/`);
  }

  getMoviesByGenreId(id: number): Observable<Movie[]> {

    return this.client.get<Movie[]>(`${this.BASE_URL}/api/genres/${id}/`);
  }

  getComments(id: string): Observable<Commentary[]>{
    return this.client.get<Commentary[]>(`${this.BASE_URL}/api/movies/${id}/comments/`);
  }

  createComment(id: string, comment: Commentary): Observable<any>{
    return this.client.post(`${this.BASE_URL}/api/movies/${id}/comments/`, comment);
  }
  updateComment(id: string, comment: Commentary): Observable<any>{
    return this.client.put(`${this.BASE_URL}/api/movies/${id}/comments/${comment.id}/`, comment);
  }
  deleteComment(id: string, comment_id: number): Observable<any>{
    return this.client.delete(`${this.BASE_URL}/api/movies/${id}/comments/${comment_id}/`);
  }
}
