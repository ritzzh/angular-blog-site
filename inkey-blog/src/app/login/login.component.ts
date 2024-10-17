import { Component, inject } from '@angular/core';
import { Router, RouterLink,RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
// import { UserInfoInterface } from '../user-info-interface';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterOutlet,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthenticationService);
  routerLink = "signup";

  loginForm = new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
  })

  onSubmit(){
    if(this.loginForm.valid){
      this.authService.validateLogin(
        this.loginForm.value.email ?? '',
        this.loginForm.value.password ?? ''
      ).then((result)=>{
        if(result) this.router.navigate(['/home'])
      })
    }
    else{
      alert("Please fill form correctly!")
    }
  }

  constructor(private router:Router){
    
  }
}
