import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogInfoInterface } from '../blog-info-interface';
import { BlogService } from '../blog.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-displayblog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './displayblog.component.html',
  styleUrl: './displayblog.component.css'
})
export class DisplayblogComponent {
  blogId:String ="";
  title:String = "";
  content:String ="";
  username:String ="";

  goBack()
  {
    this.location.back()
  }

  ngOnInit():void{
    this.blogId = this.route.snapshot.paramMap.get('id')||"";
    this.blogService.getBlogById(this.blogId).then(
      res=>{
        this.title = res.title;
        this.content=res.content;
        this.username=res.username;
      }
    )
  }
  constructor(private route:ActivatedRoute, private blogService: BlogService,
    private location:Location
  ){

  }
}
