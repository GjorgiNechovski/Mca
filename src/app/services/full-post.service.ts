import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { PhotoService } from './photo.service';
import { Post } from '../classes/post';
import { Photo } from '../classes/photo';
import { FullPost } from '../classes/full-post';

@Injectable({
  providedIn: 'root'
})
export class FullPostService {

  postList: Post[] = [];
  photoList: Photo[] = [];
  fullPostList: FullPost[] = [];

  constructor(private postSevice: PostService, private photoService: PhotoService) { }

  getPosts() {
    if (this.postList.length === 0) {
      this.postSevice.getPosts().subscribe(
        data => {
          this.postList = data;
          this.getPhotos();
        }
      );
    }
  }

  getPhotos() {
    if (this.photoList.length === 0) {
      this.photoService.getPhotos().subscribe(
        data => {
          this.photoList = data.slice(0, 100);
          this.makeFullPosts();
        }
      );
    }
  }

  makeFullPosts() {
    for (let i = 0; i < this.postList.length; i++) {
      this.fullPostList.push(
        new FullPost(
          this.postList[i].userId,
          this.postList[i].id.toString(),
          this.postList[i].title,
          this.postList[i].body,
          this.photoList[i].url,
          this.photoList[i].thumbnailUrl
        )
      );
    }
  }

  getPostById(id: string): FullPost {
    return this.fullPostList.find(post => post.id === id)!;
  }

  deletePostById(id: string) {
    const index = this.fullPostList.findIndex(post => post.id === id);
      this.fullPostList.splice(index, 1);
  }

  editPost(selectedPost: FullPost | null) {
    if (selectedPost) {
      const index = this.fullPostList.findIndex(post => post.id === selectedPost.id);
        this.fullPostList[index] = selectedPost;
    }
  }

  addPost(newPost: FullPost | undefined) {
    if (newPost) {
      const postId = (this.fullPostList.length + 1).toString();
      newPost.id = postId;
      this.fullPostList.unshift(newPost);
    }
  }
  
  
}
