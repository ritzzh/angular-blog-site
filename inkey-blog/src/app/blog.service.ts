import { Injectable } from '@angular/core';
import { BlogInfoInterface } from './blog-info-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  url = "https://blogfrontend-ten-ivory.vercel.app"
  // url='https://blogbackend-beta.vercel.app'

  async saveBlog(title:string,content:string,username:String):Promise<Boolean>{
    // alert(username)
    const response = await fetch(`${this.url}/blog/setblog`, {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title:title,
        content:content,
        username:username
      }),
    });
    const data = await response.json();
    return data.success;
  }

  async getAllBlog():Promise<BlogInfoInterface[]>{
    // alert(username)
    const response = await fetch(`${this.url}/blog/getallblog`, {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      }),
    });
    const data = await response.json();
    const returnArr = data.data
    return returnArr||[];
  }

  async getBlog(username:String):Promise<BlogInfoInterface[]>{
    // alert(username)
    const response = await fetch(`${this.url}/blog/getblog`, {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username:username
      }),
    });
    const data = await response.json();
    const returnArr = data.data
    return returnArr||[];
  }

  async deleteBlog(_id:String):Promise<Boolean>{
    const response = await fetch(`${this.url}/blog/deleteblog`, {
      method: 'DELETE',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id:_id
      }),
    });
    const data = await response.json();
    return data.success;
  }

  async updateBlog(_id:String,title:String,content:String,username:String,
    isapproved:String
  ):Promise<Boolean>{
    const response = await fetch(`${this.url}/blog/updateblog`, {
      method: 'PUT',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id:_id,
        title:title,
        content:content,
        username:username,
        isapproved:isapproved
      }),
    });
    const data = await response.json();
    return data.success;
  }

  getBlogById(_id:String){
    let data = this.http.get(`${this.url}/blog/getblog/${_id}`)
    console.log(data)
    return data;
  }

  async addComment(content:String,currUsername:any,blogId:String):Promise<Boolean>{
      const response = await fetch(`${this.url}/blog/addcomment`,{
        method:'POST',
        mode:'cors',
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({
          content:content,
          username:currUsername,
          blog:blogId
        }),
      })
      const data = await response.json()
      console.log(data)
      return data.success;
  }

  async getComments(blogId:String){
    const response = await fetch(`${this.url}/blog/getcomments`,{
      method:'POST',
      mode:'cors',
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({
       blog:blogId
      }),
    })
    const data = await response.json()
    return data.data;
  }

  async addReply(commentId:String, replyContent:String, username:String){
    const response = await fetch(`${this.url}/blog/addreply`,{
      method:'POST',
      mode:'cors',
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({
       commentId:commentId,
       replyContent:replyContent,
       username:username
      }),
    })
    const data = await response.json()
    console.log(data)
    return data.success;
  }

  

  constructor(private http: HttpClient) { }
}
