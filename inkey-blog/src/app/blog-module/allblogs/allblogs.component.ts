import { Component } from '@angular/core';
import { BlogService } from '../../blog.service';
import { BlogInfoInterface } from '../../blog-info-interface';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../authentication.service';
import { ShortTitlePipe } from '../../short-title.pipe';

@Component({
  selector: 'app-allblogs',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterOutlet,ShortTitlePipe],
  templateUrl: './allblogs.component.html',
  styleUrl: './allblogs.component.css'
})
export class AllblogsComponent {
  blogs:BlogInfoInterface[]=[]
  isAdmin:Boolean = false;


  getBlogs(){
    this.blogService.getAllBlog().then(res=>{
      this.blogs = res;
    })
  }

  approveBlog(_id:String,title:String,content:String,username:String,isapproved:String){
    isapproved = "approved";
    this.blogService.updateBlog(_id,title,content,username,isapproved).then(res=>{
      if(res){
        this.getBlogs();
      }
    })
  }

  rejectBlog(_id:String,title:String,content:String,username:String,isapproved:String){
    isapproved = "rejected";
    this.blogService.updateBlog(_id,title,content,username,isapproved).then(res=>{
      if(res){
        this.getBlogs();
      }
    })
  }

  ngOnInit():void{
    console.log("all blogs")
    this.authService.isAdmin$.subscribe(next=>{
      this.isAdmin=next;
      if(!this.isAdmin)
      {
        this.isAdmin = localStorage.getItem('admin')==='true';
      }
    })
    this.getBlogs();
  }
  constructor(private blogService: BlogService, private authService: AuthenticationService){

  }
}
