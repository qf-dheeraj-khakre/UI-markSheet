import { BooleanInput } from '@angular/cdk/coercion';
import { Component, Inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MarksheetService } from '../../../Services/marksheet.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OverlayService } from '../../../shared/spinner/overlay/overlay.service';
import { MarkSheet } from '../../../Model/classes/MarkSheet';
import { MatSelectModule } from '@angular/material/select';
import { OverlayRef } from '@angular/cdk/overlay';
import { ProgressSpinnerComponent } from '../../../shared/spinner/progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-mark-sheet-form',
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
    MatSnackBarModule,
    MatSelectModule
  ],
  templateUrl: './mark-sheet-form.component.html',
  styleUrl: './mark-sheet-form.component.css'
})
export class MarkSheetFormComponent implements OnInit {

  isReadonly: boolean = false;
  markSheetForm!: FormGroup;
  markSheet = new MarkSheet();
  panelOpenState: boolean = false;
  constructor(
    public MSService: MarksheetService,
    public dialogRef: MatDialogRef<MarkSheetFormComponent>,
    private fb: FormBuilder,
    public _snackBar: MatSnackBar,
    public _router: Router,
    public _dialogRef: DialogRef,
    public _previewProgressSpinner: OverlayService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    if (this.data.marksheet.markSheetId != 0) {
      this.markSheet = this.data.marksheet;
      this.isReadonly = this.data.view;
      console.log(this.markSheet);
    }
    this.markSheetForm = this.fb.group({
      semester: [this.markSheet.semester || '', Validators.required],
      status: [this.markSheet.status || '', Validators.required],
      result: [this.markSheet.result || 0, Validators.required],
      sgpa: [this.markSheet.sgpa || 0, Validators.required],
      cgpa: [this.markSheet.cgpa || 0, Validators.required],
      examinationDate: [this.markSheet.examinationDate || "", [dateRangeValidator, Validators.required]],
      issueDate: [this.markSheet.issueDate || "", [dateRangeValidator, Validators.required]]
    })
  }
  onSubmit() {
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    this.markSheet = this.markSheetForm.value;
    this, this.markSheet.StudentId = this.data.studentId;
    console.log(this.markSheet);
    if (this.data.marksheet.markSheetId == 0) {
      this.MSService.AddMarkSheet(this.markSheet).subscribe({
        next: res => {
          this._snackBar.open("MarkSheet  Added Successfully ", 'Action', {
            duration: 3000
          });
          overlay.detach();
          this._dialogRef.close();
          this._router.navigate(["/marksheet", res.StudentId]);

        },
        error: er => {
          this._snackBar.open("Something went wrong while adding markSheet, please try again later", 'Action', {
            duration: 3000
          });
          overlay.detach();
        }
      })
    } else {

      this.markSheet.markSheetId = this.data.marksheet.markSheetId;
      console.log(this.markSheet);
      this.MSService.EditMarkSheet(this.markSheet).subscribe({
        next: res => {
          this._snackBar.open("MarkSheet  edit Successfully ", 'Action', {
            duration: 3000
          });
          overlay.detach();
          this._dialogRef.close();
          this._router.navigate(["/marksheet", res.StudentId]);

        },
        error: er => {
          this._snackBar.open("Something went wrong while adding markSheet, please try again later", 'Action', {
            duration: 3000
          });
          overlay.detach();
        }
      })
    }

  }
  close() {
    this._dialogRef.close();
  }
}

function dateRangeValidator(control: FormControl): { [key: string]: any } | null {
  const date = new Date(control.value);
  const year = date.getFullYear();

  if (isNaN(date.getTime()) || year < 2023 || year > 2024) {
    return { 'invalidDate': { value: control.value } };
  }
  return null;
}
