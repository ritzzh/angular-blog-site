import { Injectable } from '@angular/core';
import { BlogInfoInterface } from './blog-info-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  url = "http://localhost:4000"
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
    return data;

    // const response = await fetch(`${this.url}/blog/getblog/${_id}`, {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: { "Content-Type": "application/json" },
    // });
    // const data = await response.json();
    // const returnArr = data.data
    // return returnArr||{};
  }

  

  constructor(private http: HttpClient) { }
}
