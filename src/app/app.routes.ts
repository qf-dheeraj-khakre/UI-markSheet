import { Routes } from '@angular/router';
import { DashboardComponent } from './MyComponenet/dashboard/dashboard.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'deshboard',
        component: DashboardComponent,
        pathMatch: "full"
    },

    {
        path: '',
        component: DashboardComponent,
        pathMatch: "full"
    },





];
