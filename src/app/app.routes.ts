import { Routes } from '@angular/router';
import { DashboardComponent } from './MyComponenet/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { MarkSheetComponent } from './MyComponenet/mark-sheet/mark-sheet.component';
import { SubjectComponent } from './MyComponenet/subject/subject.component';
import { CKEditorComponent } from './MyComponenet/MarkS-tamplate/ckeditor/ckeditor.component';
import { MarksheetTamplateComponent } from './MyComponenet/MarkS-tamplate/marksheet-tamplate/marksheet-tamplate.component';

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
    },
    {
        path: "marksheetTamplate",
        component: MarksheetTamplateComponent,
        children: [
            {
                path: 'editor',
                component: CKEditorComponent
            }
        ]
    }









];
