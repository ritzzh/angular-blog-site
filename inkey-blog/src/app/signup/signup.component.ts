import { Component, Inject } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,RouterOutlet,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  formIsInvalid = true;
  authService = Inject(AuthenticationService);

  signUpForm = new FormGroup({
    email:new FormControl(''),
    username: new FormControl(''),
    password1:new FormControl(''),
    password2:new FormControl('')
  })

  OnSubmit(){
    if(this.signUpForm.valid){
      if(this.signUpForm.value.password1 !== this.signUpForm.value.password2)
      {
        alert("Your passwords do not match");
      }
      else
      {
        this.authService.validateSignUp(
          this.signUpForm.value.username??'',
          this.signUpForm.value.email ?? '',
          this.signUpForm.value.password1 ?? '',
          this.signUpForm.value.password2??''
        )
      }
    }
    else{
      alert("Please fill form correctly!")
    }
  }


}
