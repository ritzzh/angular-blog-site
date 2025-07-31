import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalLayout } from '../layout/global-layout/global-layout';

const routes: Routes = [
  {
    path: "",
    component: GlobalLayout,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("../modules/dashboard/dashboard-module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "blog",
        loadChildren: () =>
          import("../modules/blog/blog-module").then(
            (m) => m.BlogModule
          ),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("../modules/profile/profile-module").then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingRoutingModule { }
