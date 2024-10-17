import { Injectable } from '@angular/core';
import { UserInfoInterface } from './user-info-interface';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url = 'https://blogbackend-beta.vercel.app';

  async validateSignUp(
    username: string,
    password1: string,
    password2: string,
    email: string
  ) {
    const response = await fetch(`${this.url}/signup`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        username: username,
        password: password1,
        email: email,
      }),
    });
    const data = await response.json();
    return data;
  }

  async validateLogin(
    email: string,
    password: string
  ): Promise<UserInfoInterface | undefined> {
    const response = await fetch(`${this.url}/login`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const users = data;
    alert(users);
    return users ?? {};
  }
  constructor() {}
}
