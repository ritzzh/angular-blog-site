import { Component, inject } from '@angular/core';
import { Router, RouterLink,RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
// import { UserInfoInterface } from '../user-info-interface';
import { EmailValidator, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IllumBorderDirective } from '../../illum-border.directive';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterOutlet,ReactiveFormsModule, IllumBorderDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthenticationService);
  routerLink = "signup";
  loginForm:FormGroup;
  private emailValidator:EmailValidator;

  ngOnInit():void{
    let loginstatus = localStorage.getItem('login')
    if(loginstatus==="true")
    {
      this.router.navigate(["/blog/allblogs"])
    }
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.authService.validateLogin(
        this.loginForm.value.email ?? '',
        this.loginForm.value.password ?? ''
      ).then((result)=>{
        switch(result)
        {
          case "Invalid-U":{alert("The email is wrong or it does not exist");break;}
          case "Invalid-P":{alert("The password is wrong");break;}
          case "Server-E":{alert("Server error, try again");break;}
          case "Valid":{ this.router.navigate(["/blog/allblogs"]);break; }
          default :{ alert("ran into some error, try again");break;}
        }
      })
    }
    else{
      alert("Please fill form correctly!")
    }
  }

  constructor(private router:Router, private fb:FormBuilder){
    this.emailValidator = new EmailValidator();
    this.loginForm = this.fb.group({
      email:["",Validators.required],
      password:["",[Validators.required,this.emailValidator.validate.bind(this.emailValidator)]]
    })
  }
}
