import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../movie.service';
// import {movies} from '../movies';
import {Location} from '@angular/common';
import {Movie} from "../movies";
import {Commentary} from '../commentary';
import {User} from "../models";


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie;
  comments: Commentary[] = [];
  @Input() isLiked = false;
  addClick = false;
  updateClick = false;
  descriptionText = '';
  updatedDescription = '';
  id = 0;
  currentUserName = localStorage.getItem('username');
  constructor(
    private route: ActivatedRoute,
    private moviesService: MovieService,
    private location: Location, ) {
  }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.moviesService.getMovieDetail(id).subscribe((data) => {
          this.movie = data;
        });
        this.moviesService.getComments(id).subscribe((data) => {
          console.log(data);
          this.comments = data;
        });
      }
    });
  }


  goBack(): void {
    this.location.back();
  }

  onClick(): void{
    if (this.isLiked === false) {
      this.movie.like += 1;
      this.isLiked = true;
    } else {
      this.movie.like -= 1;
      this.isLiked = false;
    }
  }

  editButton(id: number): void{
    this.id = id;
    this.updateClick = true;
  }
  newComment(): void{
    if (this.descriptionText !== ''){
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id != null){
          const comment = new Commentary(this.currentUserName as string, id, this.descriptionText);
          this.moviesService.createComment(id, comment).subscribe((comment) => {
            this.getMovie();
            this.addClick = false;
            this.descriptionText = '';
          });
        }
      });
    }
    else{
      this.addClick = false;
    }
  }
  deleteButton(comment: Commentary): void{
    // const ind = Comments.indexOf(id);
    // Comments.splice(ind, 1);
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null){
        this.moviesService.deleteComment(id, comment.id).subscribe((comment) => {
          this.getMovie();
        });
      }
    });
    this.getMovie();
  }
  updateButton(comment: Commentary): void{
    if (this.updatedDescription !== ''){
      comment.description = this.updatedDescription;
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id != null){
          this.moviesService.updateComment(id, comment).subscribe((comment) => {
            this.updateClick = false;
            this.updatedDescription = '';
            this.getMovie();
          });
        }
      });
    }
    else{
      this.updateClick = false;
    }
  }

  share(movie): void {
    window.alert(`The movie ${movie.name} has been shared!`);
    window.open(`https://t.me/share/url?url=http://localhost:4200/movies/${movie.id}&text=Hi! Watch this movie ${movie.name} on the Geek Street.`);
  }
}

