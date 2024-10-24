import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllblogsComponent } from './allblogs/allblogs.component';
import { CreateblogComponent } from './createblog/createblog.component';
import { DisplayblogComponent } from './displayblog/displayblog.component';
import { EditblogComponent } from './editblog/editblog.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { AuthGuard } from '../auth.guard';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class BlogRoutingModule { }
