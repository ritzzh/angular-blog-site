import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CommonService } from '../../core/services/common-service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, MatToolbarModule, MatDividerModule, RouterModule, MatButtonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss'
})
export class NavBar {
  @Output() toggleSidenav = new EventEmitter<boolean>();
  isMenuOpen = false;
  isLoggedIn: boolean = true;
  
  
  constructor ( private commonService : CommonService, private router: Router) {
  }
  
  async ngOnInit( ) {
    this.isLoggedIn = await this.commonService.checkLoginStatus()
  }

  redirectToLogin() {
    this.router.navigate(['/login'])
  }

  getMenuSelection(selection: string) {
    switch ( selection ) {
      case 'logout': {
        this.commonService.updateLoginStatus(false);
        this.router.navigate(['/login']);
        break;
      }
      case 'blogs': {
        this.router.navigate(['blog/my-blogs']);
        break;
      }
      case 'profile': {
        this.router.navigate(['/profile']);
        break;
      }
      default: break;
    } 
  }

  openSideNav() {
    this.toggleSidenav.emit(true);
  }
}
