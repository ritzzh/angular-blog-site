import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { BlogService } from '../blog.service';
import { BlogInfoInterface } from '../blog-info-interface';

@Component({
  selector: 'app-myblogs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './myblogs.component.html',
  styleUrl: './myblogs.component.css',
})
export class MyblogsComponent {
  blogs: any = [
    { title: 'This is a placeholder blog, search to load your blogs' },
  ];
  username: String = '';
  tempuser: any;

  ngOnInit():void{
    this.getBlogs();
  }

  getBlogs() {
    this.authService.currUsername$.subscribe((msg) => {
      this.username = msg;

      // if (this.username) alert(this.username);

      this.tempuser = localStorage.getItem('username');
      this.blogService.getBlog(this.username||this.tempuser).then((result) => {
        this.blogs = result;
        console.log(result)
      });
    });
  }

  deleteBlog(_id:string){
    this.blogService.deleteBlog(_id).then(
      (result)=>{
        if(result)
        this.blogs = this.blogs.filter((blog:BlogInfoInterface)=> blog._id!=_id)
        else
        {
          alert("unable to delete");
        }
      }
    )
  }

  constructor(
    private authService: AuthenticationService,
    private blogService: BlogService
  ) {}
}
