import { Component } from '@angular/core';
import { NavBar } from "../nav-bar/nav-bar";
import { Footer } from "../footer/footer";
import { DashboardRoutingModule } from "../../modules/dashboard/dashboard-routing-module";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SideNavBar } from "../side-nav-bar/side-nav-bar";


@Component({
  selector: 'app-global-layout',
  imports: [CommonModule, NavBar, DashboardRoutingModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, SideNavBar],
  templateUrl: './global-layout.html',
  styleUrl: './global-layout.scss'
})
export class GlobalLayout {
  creatorName = 'Ritesh';
githubUsername = 'riteshksi231';
linkedinUsername = 'ritesh-kumar-123456789'; // Replace with actual
instagramUsername = 'ritesh.ig';             // Replace with actual
  isSidenavOpen = true; // initial state
  sidenavMode: 'side' | 'over' = 'side'; // can also switch to responsive mode later

  toggleSidenav(event : any) {
    console.log("recieveing", event)
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
