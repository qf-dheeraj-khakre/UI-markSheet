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
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { StudentFormComponent } from './student-form/student-form.component';
import { Student } from '../../Model/classes/Student';
import { StudentService } from '../../Services/student.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatInputModule, FlexLayoutModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    HttpClientModule,
    MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog, public StudentService: StudentService) { }



  public student: Student[] = [];

  ngOnInit(): void {
    this.StudentService.GetAllStudent().subscribe({
      next: res => {
        console.log(res);
        this.student = res;
        console.log(this.student);
      },
      error: error => {
        console.log(error);
      }
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(StudentFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });

  }
}
