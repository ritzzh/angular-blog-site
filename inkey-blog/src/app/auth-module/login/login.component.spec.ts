import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check valid email', ()=>{
    const email = component.loginForm.get('email');
    email?.setValue('invalid-email');
    expect(email?.valid).toBeFalsy();
    email?.setValue('hehe@gmail.com');
    expect(email?.value).toBeTruthy();
  })

  it('should check login button', async() => {
    spyOn(component, 'onSubmit');
  
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should navigate to sign up',()=>{
    const linkDEbugElement = fixture.debugElement.query(By.css('#tosignup'))
    const rounterlink = linkDEbugElement.attributes['ng-reflect-router-link'];

    expect(linkDEbugElement).toBeTruthy();
    expect(rounterlink).toBe('/auth/signup')
  })
});
