import { Component, OnInit } from '@angular/core';
import { FullPost } from 'src/app/classes/full-post';
import { FullPostService } from 'src/app/services/full-post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postList: FullPost[] = [];
  selectedPost: FullPost | null = null;
  newPost: FullPost = new FullPost("", "", "", "", "", "");
  newPostToggle: boolean = false;

  constructor(private fullPostService: FullPostService) { }

  ngOnInit(): void {
    if (this.postList.length === 0) {
      this.fullPostService.getPosts();
    }
    this.getPosts();
  }

  getPosts() {
    this.postList = this.fullPostService.fullPostList;
  }

  removePost(id: string) {
    this.fullPostService.deletePostById(id);
    this.getPosts();
  }

  editPost(id: string) {
    this.selectedPost = this.fullPostService.getPostById(id);
  }

  saveChanges() {
    this.fullPostService.editPost(this.selectedPost);
    this.getPosts();
    this.selectedPost = null;
  }

  cancelEdit() {
    this.selectedPost = null;
  }

  toggleNewPost() {
    this.newPostToggle = true;
  }

  addPost() {
    this.fullPostService.addPost(this.newPost);
    this.newPostToggle = false;
    this.getPosts();
    this.newPost = new FullPost("", "", "", "", "", "");
  }
}
