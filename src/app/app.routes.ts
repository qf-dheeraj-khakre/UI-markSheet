import { Routes } from '@angular/router';
import { DashboardComponent } from './MyComponenet/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { MarkSheetComponent } from './MyComponenet/mark-sheet/mark-sheet.component';
import { SubjectComponent } from './MyComponenet/subject/subject.component';

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
    {
        path: 'marksheet',
        children: [
            {
                path: ':id',
                component: MarkSheetComponent,
                pathMatch: "full"
            },
            {
                path: 'subject/:subjectId',
                component: SubjectComponent,
                pathMatch: "full"
            }
        ]
    }







];
