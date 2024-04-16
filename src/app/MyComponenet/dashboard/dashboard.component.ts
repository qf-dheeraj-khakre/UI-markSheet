import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentService } from '../../Services/student.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentCardComponent } from './student-card/student-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { Overlay } from '@angular/cdk/overlay';
import { Student } from '../../Model/classes/Student';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    HttpClientModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    StudentCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    public dialog: MatDialog,
    public StudentService: StudentService,
    public overlay: Overlay
  ) { }
  openDialog(): void {
    let student = new Student();
    const dialogRef = this.dialog.open(StudentFormComponent,
      {
        width: '90vw',
        maxHeight: '90vh',
        minHeight: '50vh',
        data: { student: student, view: false },
        scrollStrategy: this.overlay.scrollStrategies.noop()
      }
    );

    dialogRef.afterClosed().subscribe(result => {


    });

  }
}
