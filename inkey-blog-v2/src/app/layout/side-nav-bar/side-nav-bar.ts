import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommonService } from '../../core/services/common-service';

@Component({
  selector: 'app-side-nav-bar',
  imports: [CommonModule, MatMenuModule, MatIconModule, MatToolbarModule, MatDividerModule, RouterModule, MatButtonModule],
  templateUrl: './side-nav-bar.html',
  styleUrl: './side-nav-bar.scss',
  standalone: true
})
export class SideNavBar {
  isLoggedIn!: boolean;
  constructor ( private commonService: CommonService) {
    this.commonService.checkLoginStatus().then(status => {
      this.isLoggedIn = status;
    });
  }
}
