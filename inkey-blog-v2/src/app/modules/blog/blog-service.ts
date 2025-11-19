import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlogInfoInterface } from '../../shared/types/BlogTypes';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import environment from '../../../../environment.json';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly BASE_URL = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  saveBlog(title: string, content: string, username: string): Observable<boolean> {
    return this.http.post<{ success: boolean }>(
      `${this.BASE_URL}/blog/setblog`,
      { title, content, username },
      this.httpOptions
    ).pipe(
      map(res => res.success),
      catchError(() => of(false))
    );
  }

  getAllBlog(): Observable<BlogInfoInterface[]> {
    return this.http.post<{ data: BlogInfoInterface[] }>(
      `${this.BASE_URL}/blog/getallblog`,
      {},
      this.httpOptions
    ).pipe(
      map(res => res.data),
      catchError(() => of([]))
    );
  }

  getBlog(username: string): Observable<BlogInfoInterface[]> {
    return this.http.post<{ data: BlogInfoInterface[] }>(
      `${this.BASE_URL}/blog/getblog`,
      { username },
      this.httpOptions
    ).pipe(
      map(res => res.data),
      catchError(() => of([]))
    );
  }

  deleteBlog(_id: string): Observable<boolean> {
    return this.http.request<{ success: boolean }>(
      'delete',
      `${this.BASE_URL}/blog/deleteblog`,
      {
        ...this.httpOptions,
        body: { _id },
      }
    ).pipe(
      map(res => res.success),
      catchError(() => of(false))
    );
  }

  updateBlog(
    _id: string,
    title: string,
    content: string,
    username: string,
    isapproved: string
  ): Observable<boolean> {
    return this.http.put<{ success: boolean }>(
      `${this.BASE_URL}/blog/updateblog`,
      { _id, title, content, username, isapproved },
      this.httpOptions
    ).pipe(
      map(res => res.success),
      catchError(() => of(false))
    );
  }

  getBlogById(_id: string): Observable<BlogInfoInterface | null> {
    return this.http.get<BlogInfoInterface>(
      `${this.BASE_URL}/blog/getblog/${_id}`
    ).pipe(
      catchError(() => of(null))
    );
  }

  addComment(content: string, username: string, blogId: string): Observable<boolean> {
    return this.http.post<{ success: boolean }>(
      `${this.BASE_URL}/blog/addcomment`,
      { content, username, blog: blogId },
      this.httpOptions
    ).pipe(
      map(res => res.success),
      catchError(() => of(false))
    );
  }

  getComments(blogId: string): Observable<any[]> {
    return this.http.post<{ data: any[] }>(
      `${this.BASE_URL}/blog/getcomments`,
      { blog: blogId },
      this.httpOptions
    ).pipe(
      map(res => res.data),
      catchError(() => of([]))
    );
  }

  addReply(commentId: string, replyContent: string, username: string): Observable<boolean> {
    return this.http.post<{ success: boolean }>(
      `${this.BASE_URL}/blog/addreply`,
      { commentId, replyContent, username },
      this.httpOptions
    ).pipe(
      map(res => res.success),
      catchError(() => of(false))
    );
  }
}
