import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loggedIn:Boolean = false;
  username:String = "";
  stored:string|null = "";
  tempuser:any = "";
  isadmin:Boolean = false;


  handleLogout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
  ngOnInit():void{
    this.authService.loggedIn$.subscribe(msg=>{
      this.loggedIn = msg;
      console.log(this.loggedIn)
      if(!this.loggedIn){
        this.loggedIn = localStorage.getItem('login')==='true'?true:false;
      }
    });
    this.authService.currUsername$.subscribe(msg=>{
      this.username = msg;
      if(this.username.length==0)
      {
        this.username = localStorage.getItem('username')||"";
      }
      console.log(this.username)
    })
    this.authService.isAdmin$.subscribe(next=>{
      this.isadmin=next;
      if(!this.isadmin)
      {
        this.isadmin = localStorage.getItem('admin')==='true';
      }
    })
    

  }

  constructor(private router:Router,private authService: AuthenticationService){
    
  }
}
