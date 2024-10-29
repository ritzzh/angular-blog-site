import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { UserInfoInterface } from '../user-info-interface';
import { Router } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { ShortTitlePipe } from '../short-title.pipe';

@Component({
  selector: 'app-profile',
  imports:[JsonPipe, ShortTitlePipe,CommonModule],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  imgurl =
    'https://uploads.dailydot.com/2023/12/crying-cat-meme.jpg?auto=compress&fm=pjpg';
  userProfile?: UserInfoInterface;
  username: String = '';
  profileForm: FormGroup;
  editing:boolean=false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.profileForm = this.fb.group({
      profile: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.authService.currUsername$.subscribe((msg) => {
      this.username = msg || localStorage.getItem('username') || '';
      this.loadUserProfile();
    });
  }

  private loadUserProfile() {
    this.authService.getProfile(this.username).then((profile) => {
      this.userProfile = profile;
      console.log(this.userProfile);
      if (this.userProfile) {
        this.profileForm.patchValue({
          profile: this.userProfile.profile,
          username: this.userProfile.username,
          email: this.userProfile.email,
        });
        console.log(this.profileForm.value)
      }
    });
  }

  goBack() {
    this.router.navigate(['/blog/allblogs']);
  }

  updateProfile() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }

  setEditing(){
    this.editing=!this.editing
  }
}
