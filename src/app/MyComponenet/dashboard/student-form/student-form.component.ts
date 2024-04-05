import { Component, Inject, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { Student } from '../../../Model/classes/Student';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, ReactiveFormsModule, Validators, FormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OverlayService } from '../../../shared/spinner/overlay/overlay.service';
import { StudentCardComponent } from '../student-card/student-card.component';
import { ProgressSpinnerComponent } from '../../../shared/spinner/progress-spinner/progress-spinner.component';
import { OverlayRef } from '@angular/cdk/overlay';
@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})

export class StudentFormComponent implements OnInit {

  panelOpenState: boolean = false;
  student: Student = new Student();
  studentForm: FormGroup = new FormGroup({});
  isReadonly = false;
  buttonforform: string = '';
  constructor(
    public dialogRef: MatDialogRef<StudentCardComponent>,
    public studentService: StudentService,
    private fb: FormBuilder,
    public _snackBar: MatSnackBar,
    public _router: Router,
    public _dialogRef: DialogRef,
    public _previewProgressSpinner: OverlayService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.isReadonly = this.data.view;
    this.buttonforform = this.data.student.studentRollNumber;
    this.student = this.data.student;
    this.studentForm = this.fb.group({
      studentRollNumber: [this.student.studentRollNumber || '', Validators.required],
      name: [this.student.name || '', Validators.required],
      age: [this.student.age || 0, [ageRangeValidator(18, 25), Validators.required]],
      collageName: [this.student.collageName || '', Validators.required],
      email: [this.student.email || "", [Validators.email, Validators.required]],
      number: [this.student.number || "", Validators.required],
      branch: [this.student.branch || "", Validators.required],
      DOB: [this.student.DOB || "", [dateRangeValidator, Validators.required]]
    })
  }
  onSubmit(): void {

    if (this.studentForm.valid) {
      this.student = this.studentForm.value;
      if (!(this.data.student.studentRollNumber === '')) {
        let overlay: OverlayRef;
        overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
        this.student.id = this.data.student.id;
        this.studentService.EditStudent(this.student).subscribe({
          next: res => {
            this._snackBar.open("Student Edit Successfully ", 'Action', {
              duration: 3000
            });
            overlay.detach();
            this._router.navigate(["/deshboard"]);
            this._dialogRef.close();

          },
          error: res => {
            this._snackBar.open("Something went wrong while adding student, please try again later", 'Action', {
              duration: 3000
            });
            overlay.detach();
          }
        })

      } else {
        let overlay: OverlayRef;
        overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
        this.studentService.addStudent(this.student).subscribe({
          next: res => {
            this._snackBar.open("Student Added Successfully ", 'Action', {
              duration: 3000
            });
            overlay.detach();
            this._router.navigate(["/deshboard"]);
            this._dialogRef.close();
          },
          error: res => {
            this._snackBar.open("Something went wrong while adding student, please try again later", 'Action', {
              duration: 3000
            });
            overlay.detach();
          }
        })
      }
    } else {
      console.log('Form is not valid');
    }
  }
  close() {
    this.dialogRef.close();
  }

}
function dateRangeValidator(control: FormControl): { [key: string]: any } | null {
  const date = new Date(control.value);
  const year = date.getFullYear();

  if (isNaN(date.getTime()) || year < 2000 || year > 2010) {
    return { 'invalidDate': { value: control.value } };
  }

  return null;
}
function ageRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
      return { 'ageRange': true };
    }
    return null;
  };
}


