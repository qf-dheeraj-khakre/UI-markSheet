import { Routes } from '@angular/router';
import { DashboardComponent } from './MyComponenet/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        pathMatch: "full"
    }


];