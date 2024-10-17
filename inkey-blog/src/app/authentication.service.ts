import { Injectable } from '@angular/core';
import { UserInfoInterface } from './user-info-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url = 'http://localhost:4000'

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
  ): Promise<boolean | undefined> {
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
    return data.success;
  }
  constructor() {}
}
