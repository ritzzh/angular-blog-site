import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Blog } from './blog';

const routes: Routes = [
  {
    path: 'my-blogs',
    component: Blog
  },
  {
    path: 'read-blog/:id',
    loadComponent: () => import('./read-blog/read-blog').then(m => m.ReadBlog)
  },
  {
    path: 'create',
    loadComponent: () => import('./create-edit-blog/create-edit-blog').then(m => m.CreateEditBlog)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./create-edit-blog/create-edit-blog').then(m => m.CreateEditBlog)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
