import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UserInfoInterface } from '../user-info-interface';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authServiceMock:jasmine.SpyObj<AuthenticationService>
  let routerMock : jasmine.SpyObj<Router>

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthenticationService',['getProfile']);
    routerMock = jasmine.createSpyObj('Router',['navigate']);
    authServiceMock.currUsername$ = of('testUser');


    await TestBed.configureTestingModule({
      imports: [ProfileComponent, ReactiveFormsModule],
      providers:[
        {provide:AuthenticationService,useValue:authServiceMock},
        {provide:Router,useValue:routerMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user profile on initialization',async()=>{
    const mockUserProfile: UserInfoInterface = {
      _id:'test123',
      username: 'testUser',
      email: 'test@example.com',
      password:'testpassword',
      profile: 'testProfile',
      isadmin:true,
    };

    authServiceMock.getProfile.and.returnValue(Promise.resolve(mockUserProfile));
    await component.ngOnInit();
    fixture.detectChanges();

    expect(authServiceMock.getProfile).toHaveBeenCalledWith('testUser');
    expect(component.userProfile).toEqual(mockUserProfile);
    expect(component.profileForm.value).toEqual({
      username: 'testUser',
      email: 'test@example.com',
      profile:'testProfile'
    });
  })
});
