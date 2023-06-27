import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../classes/photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  private url = "http://jsonplaceholder.typicode.com/photos"
  
  getPhotos(): Observable<Photo[]>{
    return this.http.get<Photo[]>(this.url);
  }
}
