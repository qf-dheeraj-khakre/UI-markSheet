import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Student } from '../../../Model/classes/Student';
import { StudentService } from '../../../Services/student.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { publicDecrypt } from 'crypto';


import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { OverlayService } from '../../../shared/spinner/overlay/overlay.service';
import { ProgressSpinnerComponent } from '../../../shared/spinner/progress-spinner/progress-spinner.component';
@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css'
})
export class StudentCardComponent implements OnInit {
  constructor(
    public StudentService: StudentService,
    public dialog: MatDialog,
    public router: Router,
    public _snackBar: MatSnackBar,
    private overlay: Overlay,
    public _previewProgressSpinner: OverlayService

  ) { }

  DeleteStudent(arg0: string) {
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    this.StudentService.DeleteStudent(arg0).subscribe({
      next: res => {
        console.log(res);
        this._snackBar.open("Student delete Successfully ", 'Action', {
          duration: 3000
        });
        overlay.detach();
        this.router.navigate(['/deshboard']);
      },
      error: error => {
        console.log(error);
        this._snackBar.open("Something went wrong while Deleting student, please try again later", 'Action', {
          duration: 3000
        });
        overlay.detach();
      }
    })
  }
  EditStudent(id: string) {
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    let student = new Student();
    this.StudentService.GetStudetnBtId(id).subscribe({
      next: rep => {
        student = rep;
        const dialogRef = this.dialog.open(StudentFormComponent,
          {
            width: '90vw',
            maxHeight: '90vh',
            minHeight: '50vh',
            data: { student: student, view: false },
            scrollStrategy: this.overlay.scrollStrategies.noop()
          }
        );
        overlay.detach();
      },
      error: error => {
        console.log(error);
        overlay.detach();
      }
    })
  }
  ViewStudent(id: string) {
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);

    let student = new Student();
    this.StudentService.GetStudetnBtId(id).subscribe({
      next: rep => {
        student = rep;
        const dialogRef = this.dialog.open(StudentFormComponent,
          {
            width: '90vw',
            maxHeight: '90vh',
            minHeight: '50vh',
            data: { student: student, view: true },
            scrollStrategy: this.overlay.scrollStrategies.noop()
          }
        );
        overlay.detach();
      },
      error: error => {
        console.log(error);
        overlay.detach();
      }
    })
  }
  GotoMarksheet(id: string) {
    let overlay: OverlayRef;
    let Id: Number
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    this.StudentService.GetStudetnBtId(id).subscribe({
      next: rep => {
        Id = rep.id;
        this.router.navigate(["/marksheet", Id])
        overlay.detach();
      },
      error: error => {
        console.log(error);
        overlay.detach();
      }
    })
  }
  public student: Student[] = [];
  ngOnInit(): void {
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    this.StudentService.GetAllStudent().subscribe({
      next: res => {
        console.log(res);
        this.student = res;
        console.log(this.student);
        overlay.detach();
      },
      error: error => {
        console.log(error);
        overlay.detach();
      }
    })
  }
}
