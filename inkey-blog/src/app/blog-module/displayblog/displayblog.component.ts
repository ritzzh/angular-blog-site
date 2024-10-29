import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../blog.service';
import { JsonPipe, Location, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
@Component({
  selector: 'app-displayblog',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './displayblog.component.html',
  styleUrl: './displayblog.component.css'
})
export class DisplayblogComponent {
  blogId:String ="";
  title:String = "";
  content:String ="";
  username:String ="";
  currUsername: any= "";
  commentDisplay:any=[];
  replying:boolean=false;
  reply:string="";
  activatedComment:string="";
  
  commentForm = new FormGroup(
    {
      comment: new FormControl('')
    }
  )
  
  handleReplyClick(id:string){
    this.replying = true;
    this.activatedComment = id;
  }
  handleReplyCancel(){
    this.replying = false;
    this.activatedComment = "";
  }

  addReply(commentid:string){
    this.blogService.addReply(commentid,this.reply,this.currUsername).then(res=>{
      if(res)
      {
        this.fetchComments();
        this.reply="";
        this.replying = false;
      }
    })
  }

  goBack()
  {
    this.location.back()
  }

  fetchComments()
  {
    this.blogService.getComments(this.blogId).then(next=>{
      this.commentDisplay = next;
    })
  }

  ngOnInit():void{
    this.blogId = this.route.snapshot.paramMap.get('id')||"";
    this.blogService.getBlogById(this.blogId).subscribe(
      res=>{
        let blogjson = JSON.stringify(res);
        let blogobj = JSON.parse(blogjson)
        this.title = blogobj.data.title;
        this.content=blogobj.data.content;
        this.username=blogobj.data.username;
      }
    )
    this.authService.currUsername$.subscribe(next=>{
      this.currUsername = next;
      if(this.currUsername==="")
      {
        this.currUsername = localStorage.getItem('username')
      }
    })
    this.fetchComments();
  }

  addComment(){
    if(this.commentForm.valid){
      this.blogService.addComment(this.commentForm.value.comment??"",this.currUsername, this.blogId).then(res=>{
        if(res)
        {
          this.fetchComments();
          this.commentForm.get('comment')?.setValue(' ')
        }
      })
    }
  }

  constructor(private route:ActivatedRoute,private blogService: BlogService,
    private location:Location, private authService: AuthenticationService
  ){

  }
}
