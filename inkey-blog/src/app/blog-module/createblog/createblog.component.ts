import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../authentication.service';
import { BlogService } from '../../blog.service';


@Component({
  selector: 'app-createblog',
  standalone: true,
  imports: [RouterLink,FormsModule,EditorModule,ReactiveFormsModule,CommonModule],
  templateUrl: './createblog.component.html',
  styleUrl: './createblog.component.css'
})
export class CreateblogComponent{
  blogForm: FormGroup;
  username:String="";

  constructor(private fb: FormBuilder,private authService: AuthenticationService
    ,private blogService:BlogService, private router: Router
  ) {
    this.authService.currUsername$.subscribe(msg=>{
      this.username = msg;
      if(this.username.length==0)
      {
        this.username = localStorage.getItem('username')||"";
      }
    })
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  createBlog() {
    if (this.blogForm.valid) {
      const blogPost = this.blogForm.value;
      console.log('Blog Post Created:', blogPost.title);
      this.blogService.saveBlog(blogPost.title,blogPost.content,this.username)
      .then((result)=>{
        if(result)alert("Blog saved successfully")
          this.router.navigate(["/myblogs"])
      })
    }
  }
}
