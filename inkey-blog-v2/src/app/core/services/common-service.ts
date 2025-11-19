import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import environment from "../../../../environment.json";
import { UserInfoInterface } from "../../shared/types/UserTypes";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  private apiUrl = environment.apiUrl;

  $userInfo = new BehaviorSubject<Partial<UserInfoInterface>>({});
  $isLoggedIn = new BehaviorSubject<boolean>(false);
  $isAdmin = new BehaviorSubject<boolean>(false);
  $username = new BehaviorSubject<string>("");

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

async validateSignUp(
  username: string,
  email: string,
  password1: string,
  adminCode?: string
): Promise<{ success: boolean; message: string }> {
  const body = { username, email, password: password1, adminCode };
  const headers = new HttpHeaders({ "Content-Type": "application/json" });

  try {
    const response: any = await this.http
      .post(`${this.apiUrl}/auth/signup`, body, { headers })
      .toPromise();

    return { success: !!response.success, message: response.message || '' };
  } catch (error: any) {
    return {
      success: false,
      message: error?.error?.message || 'Unknown error occurred',
    };
  }
}


  async validateLogin(email: string, password: string): Promise<string> {
    try {
      const body = { email, password };
      const headers = new HttpHeaders({ "Content-Type": "application/json" });

      const response: any = await this.http
        .post(`${this.apiUrl}/auth/login`, body, { headers })
        .toPromise();

      if (response.success) {
        const { username, isadmin } = response.data;

        this.$isLoggedIn.next(true);
        this.$username.next(username);
        this.$isAdmin.next(isadmin);

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem("username", username);
          localStorage.setItem("login", "true");
          localStorage.setItem("admin", JSON.stringify(isadmin));
          localStorage.setItem(
            "loginStatus",
            JSON.stringify({ isLoggedIn: true })
          );
        }
      }

      return response.message;
    } catch (error) {
      console.error("Login failed:", error);
      return "Login failed. Please try again.";
    }
  }

  async checkLoginStatus(): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) return false;

    try {
      const status = localStorage.getItem("loginStatus");
      return status ? JSON.parse(status).isLoggedIn : false;
    } catch {
      return false;
    }
  }

  async updateLoginStatus(isLoggedIn: boolean): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.setItem("loginStatus", JSON.stringify({ isLoggedIn }));
    this.$isLoggedIn.next(isLoggedIn);
  }

  async getProfile(username: string): Promise<UserInfoInterface> {
    try {
      const body = { username };
      const headers = new HttpHeaders({ "Content-Type": "application/json" });

      const response: any = await this.http
        .post(`${this.apiUrl}/auth/getdetails`, body, { headers })
        .toPromise();

      const data = response.data;

      const userInfo: UserInfoInterface = {
        _id: data._id,
        email: data.email,
        password: data.password,
        username: data.username,
        isadmin: data.isadmin,
        profile: data.profile,
      };

      this.$userInfo.next(userInfo);
      return userInfo;
    } catch (err) {
      console.error("Error loading profile:", err);
      throw new Error("Failed to load user profile");
    }
  }

  async updateProfile(
    updatedData: any
  ): Promise<string> {
    try {
      const headers = new HttpHeaders({ "Content-Type": "application/json" });

      const response: any = await this.http
        .put(`${this.apiUrl}/auth/updatedetails`, updatedData, { headers })
        .toPromise();

      if (response.success) {
        // Update BehaviorSubjects if needed
        if (updatedData.username) this.$username.next(updatedData.username);
        if (updatedData.email || updatedData.username || updatedData.profile) {
          this.$userInfo.next({
            ...this.$userInfo.getValue(),
            ...updatedData,
          });
        }
        return response.message || "Profile updated successfully";
      } else {
        return response.message || "Update failed";
      }
    } catch (error) {
      console.error("Update failed:", error);
      return "Update failed. Please try again.";
    }
  }
}
