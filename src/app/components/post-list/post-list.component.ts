import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FullPost } from 'src/app/classes/full-post';
import { FullPostService } from 'src/app/services/full-post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(private fullPostService: FullPostService) { }

  ngOnInit(): void {
    if(this.postList.length===0)
       this.fullPostService.getPosts();
    this.getPosts();
  }

  postList: FullPost[] = [];

  getPosts(){
    this.postList = this.fullPostService.fullPostList
  }

  removePost(id: string){
    this.fullPostService.deletePostById(id);
    this.getPosts();
  }

}
