import { Component } from '@angular/core';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { BlogInfoInterface } from '../blog-info-interface';


@Component({
  selector: 'app-editblog',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule,EditorComponent,ReactiveFormsModule],
  templateUrl: './editblog.component.html',
  styleUrl: './editblog.component.css'
})
export class EditblogComponent {
  blogForm:FormGroup;
  blogId:String ="";
  username:string = "";
  bloginfo?:BlogInfoInterface;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder,
    private blogService:BlogService
  ){
      this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id')||""; 
    this.getBlogDetails(); 
  }

  getBlogDetails() {
    this.blogService.getBlogById(this.blogId).then(blog => {
      this.blogForm.patchValue(blog); 
      this.bloginfo = blog;
    });
  }

  updateBlog(){
    if(this.blogForm.valid){
      this.username = localStorage.getItem('username')||"";
      this.blogService.updateBlog(
        this.blogId,
        this.blogForm.value.title,
        this.blogForm.value.content,
        this.username,
        "pending"
      ).then(result=>{
        if(result){
          alert("Updated Successfully")
          this.router.navigate(['/myblogs'])
        }
      })
    }
  }
}
