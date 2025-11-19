import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./shared/global-routing-routing-module').then(m => m.GlobalRoutingRoutingModule),
    }
];
