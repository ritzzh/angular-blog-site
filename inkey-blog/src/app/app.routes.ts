import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CreateblogComponent } from './createblog/createblog.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { EditblogComponent } from './editblog/editblog.component';
import { AllblogsComponent } from './allblogs/allblogs.component';
import { DisplayblogComponent } from './displayblog/displayblog.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Sign Up',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
    canActivate:[AuthGuard]
  },
  {
    path:'myblogs',
    component:MyblogsComponent,
    title:'My Blog',
    canActivate:[AuthGuard]
  },
  {
    path:'createblog',
    component:CreateblogComponent,
    title:'Create Blog',
    canActivate:[AuthGuard]
  },
  {
    path:'editblog/:id',
    component:EditblogComponent,
    title: 'Edit Blog',
    canActivate:[AuthGuard]
  },
  {
    path:'allblogs',
    component:AllblogsComponent,
    title:'All Blogs',
    canActivate:[AuthGuard]
  },
  {
    path:'displayblog/:id',
    component:DisplayblogComponent,
    title: 'Reading Blog',
    canActivate:[AuthGuard]
  }
];
