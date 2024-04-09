import { Component, Inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject } from '../../../Model/classes/Subject';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { OverlayService } from '../../../shared/spinner/overlay/overlay.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayRef } from '@angular/cdk/overlay';
import { ProgressSpinnerComponent } from '../../../shared/spinner/progress-spinner/progress-spinner.component';
import { SubjectService } from '../../../Services/subject.service';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [MatInputModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule],
  templateUrl: './subject-form.component.html',
  styleUrl: './subject-form.component.css'
})
export class SubjectFormComponent implements OnInit {

  isReadonly: boolean = false;
  SubjectForm!: FormGroup;
  Subject = new Subject();
  panelOpenState: boolean = false;
  constructor(
    public subjectService: SubjectService,
    public dialogRef: MatDialogRef<SubjectFormComponent>,
    private fb: FormBuilder,
    public _snackBar: MatSnackBar,
    public _router: Router,
    public route: ActivatedRoute,
    public _dialogRef: DialogRef,
    public _previewProgressSpinner: OverlayService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.SubjectForm = this.fb.group({
      subjectCode: [this.Subject.subjectCode, Validators.required],
      subjectName: [this.Subject.subjectName, Validators.required],
      totalmark: [this.Subject.totalmark, Validators.required],
      earnMarks: [this.Subject.earnMarks, Validators.required],
      grade: [this.Subject.grade, Validators.required]
    })
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit() {
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    this.Subject = this.SubjectForm.value
    if (this.data.marksheetid != null) {
      this.Subject.marksheetid = parseInt(this.data.marksheetid);
      this.subjectService.AddSubject(this.Subject).subscribe({
        next: res => {
          this._snackBar.open("Subject  Added Successfully ", 'Action', {
            duration: 3000
          });
          overlay.detach();
          this._dialogRef.close();
          this._router.navigate(['../subject', res.marksheetid], { relativeTo: this.route });

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
}
