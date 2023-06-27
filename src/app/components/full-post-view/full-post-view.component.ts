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

  constructor(private fullPostService: FullPostService,
              private route: ActivatedRoute) { }

  post?: FullPost 
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getPostById(id)
  }

  getPostById(id: number){
    this.post = this.fullPostService.getPostById(id);
  }

}
