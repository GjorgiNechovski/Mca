import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../classes/post';
import { Photo } from '../classes/photo';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = "http://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) {}  

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }


}
