import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayout } from '../modules/auth/auth-layout';
import { childAuthGuard } from '../core/guards/child-auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayout,
    canActivateChild: [childAuthGuard],
    loadChildren: () => import('../modules/auth/auth-routing-module').then(m => m.AuthRoutingModule)
  },
  {
    path: '',
    // canActivate: [childAuthGuard],
    loadChildren: () => import('../shared/feature-routing-routing-module').then(m => m.FeatureRoutingRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalRoutingRoutingModule { }
