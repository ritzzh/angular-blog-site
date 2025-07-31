import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  url = 'https://blog-backend-eta-blond.vercel.app'
  $userInfo = new BehaviorSubject({});
  $isLoggedIn = new BehaviorSubject(false);
  $isAdmin = new BehaviorSubject<boolean>(false);
  $username = new BehaviorSubject<string>("");

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
    if(data.success){
      this.$isLoggedIn.next(data.success);
      this.$username.next(data.data.username);
      this.$isAdmin.next(data.data.isadmin);
      localStorage.setItem('username',data.data.username);
      localStorage.setItem('login',data.success);
      localStorage.setItem('admin',data.data.isadmin);
    }
    return data.message;
  }

  async checkLoginStatus() {
    if (!isPlatformBrowser(this.platformId)) {
      return false;  // Avoid using localStorage on server
    }

    const loginStatus = localStorage.getItem('loginStatus');
    if (!loginStatus) {
      return false;
    }

    const loginStatusObj = JSON.parse(loginStatus);
    console.log("Login Status in storage: ", loginStatusObj.isLoggedIn);
    return loginStatusObj.isLoggedIn;
  }

  async updateLoginStatus(isLoggedIn: boolean) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const loginStatus = localStorage.getItem('loginStatus');

    if (!loginStatus) {
      console.log("No login object found");
      localStorage.setItem('loginStatus', JSON.stringify({ isLoggedIn }));
      return;
    }

    const loginStatusObj = JSON.parse(loginStatus);
    loginStatusObj.isLoggedIn = isLoggedIn;
    localStorage.setItem('loginStatus', JSON.stringify(loginStatusObj));
    console.log("Updated login object with status: ", loginStatusObj.isLoggedIn);
    this.$isLoggedIn.next(isLoggedIn);
  }
}
