import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { PhotoService } from './photo.service';
import { Post } from '../classes/post';
import { Photo } from '../classes/photo';
import { FullPost } from '../classes/full-post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullPostService {

  postList: Post[] = [];
  photoList: Photo[] = [];
  fullPostList: FullPost[] = [];

  constructor(private postSevice: PostService,
              private photoService: PhotoService) { }

  getPosts(){
    if(this.postList.length===0)
      this.postSevice.getPosts().subscribe(
        data => {
          this.postList = data;
          this.getPhotos();
        }
      )
  }

  getPhotos(){
    if(this.photoList.length===0)
      this.photoService.getPhotos().subscribe(
        data => {
          this.photoList = data.slice(0,100);
          this.makeFullPhotos();
        }
      )
  }

  makeFullPhotos(){
    for(let i=0; i<this.postList.length; i++){
      this.fullPostList.push(
        new FullPost(
          this.postList[i].userId,
              this.postList[i].id,
              this.postList[i].title,
              this.postList[i].body,
              this.photoList[i].url,
              this.photoList[i].thumbnailUrl
        )
      )
    }
  }

  getPostById(id: number): FullPost{
    return this.fullPostList[+id];
  }

  deletePostById(id: string){
    const index = this.fullPostList.findIndex(post => post.id === id);

    this.fullPostList.splice(index, 1);
  }

}
