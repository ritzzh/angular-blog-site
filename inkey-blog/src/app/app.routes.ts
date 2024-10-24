import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// import { LoginComponent } from './auth-module/login/login.component';
// import { SignupComponent } from './auth-module/signup/signup.component';
// import { HomeComponent } from './home/home.component';
// import { CreateblogComponent } from './blog-module/createblog/createblog.component';
// import { MyblogsComponent } from './blog-module/myblogs/myblogs.component';
// import { EditblogComponent } from './blog-module/editblog/editblog.component';
// import { AllblogsComponent } from './blog-module/allblogs/allblogs.component';
// import { DisplayblogComponent } from './blog-module/displayblog/displayblog.component';
// import { BlogModuleModule } from './blog-module/blog-module.module';
// import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'blog', loadChildren: () => import('./blog-module/blog-module.module').then(m => m.BlogModuleModule) },
  { path: 'auth', loadChildren:() => import('./auth-module/auth-module.module').then(m=>m.AuthModuleModule)},
  {
    path: '',
    redirectTo:'auth/login',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
