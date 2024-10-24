import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url = 'http://localhost:4000'
  // url='https://blogbackend-beta.vercel.app'
  private isAdminSubject = new BehaviorSubject<Boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  private loggedInSubject = new BehaviorSubject<Boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  private usernameSubject = new BehaviorSubject<String>("");
  currUsername$ = this.usernameSubject.asObservable();

  async validateSignUp(
    username: string,
    email: string,
    password1: string,
    password2: string
  ):Promise<boolean> {
    const response = await fetch(`${this.url}/auth/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username:username,
        password:password1,
        email:email,
      }),
    });
    const data = await response.json();
    return data.success;
  }

  async validateLogin(
    email: string,
    password: string
  ): Promise<string> {
    const response = await fetch(`${this.url}/auth/login`, {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email:email,
        password:password
      }),
    });
    const data = await response.json();
    this.loggedInSubject.next(data.success);
    this.usernameSubject.next(data.data.username);
    this.isAdminSubject.next(data.data.isadmin);
    localStorage.setItem('username',data.data.username);
    localStorage.setItem('login',data.success);
    localStorage.setItem('admin',data.data.isadmin);
    return data.message;
  }

  async logout(){
    this.loggedInSubject.next(false);
    localStorage.clear();

  }

  loginStatus:Boolean = false;
  isAuthenticated(){
    this.loggedInSubject.subscribe(next=>{
      this.loginStatus = next;
    })
    return this.loginStatus;
  }
  constructor() {}
}
