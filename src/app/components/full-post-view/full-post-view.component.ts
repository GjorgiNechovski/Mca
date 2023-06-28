import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullPostService } from 'src/app/services/full-post.service';
import { FullPost } from 'src/app/classes/full-post';

@Component({
  selector: 'app-full-post-view',
  templateUrl: './full-post-view.component.html',
  styleUrls: ['./full-post-view.component.css']
})
export class FullPostViewComponent implements OnInit {
  post?: FullPost;

  constructor(
    private fullPostService: FullPostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getPostById(id);
    }
  }

  getPostById(id: string): void {
    this.post = this.fullPostService.getPostById(id);
  }
}
