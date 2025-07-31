import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loggedIn: Boolean = false;
  username: String = "";
  isadmin: Boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  handleLogout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {
    const isBrowser = isPlatformBrowser(this.platformId);

    this.authService.loggedIn$.subscribe(msg => {
      this.loggedIn = msg;
      if (!this.loggedIn && isBrowser) {
        this.loggedIn = localStorage.getItem('login') === 'true';
      }
    });

    this.authService.currUsername$.subscribe(msg => {
      this.username = msg;
      if (!this.username && isBrowser) {
        this.username = localStorage.getItem('username') || "";
      }
    });

    this.authService.isAdmin$.subscribe(msg => {
      this.isadmin = msg;
      if (!this.isadmin && isBrowser) {
        this.isadmin = localStorage.getItem('admin') === 'true';
      }
    });
  }
}
