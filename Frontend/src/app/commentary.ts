export class Commentary {
  static cnt = 0;
  id: number;
  username: string;
  movie: string;
  public description: string;
  constructor(username: string, movie: string, description: string) {
    this.id = Commentary.cnt++;
    this.username = username;
    this.movie = movie;
    this.description = description;
  }
}
