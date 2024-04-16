import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SubjectService } from '../../Services/subject.service';
import { Subject } from '../../Model/classes/Subject';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { OverlayService } from '../../shared/spinner/overlay/overlay.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProgressSpinnerComponent } from '../../shared/spinner/progress-spinner/progress-spinner.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SubjectFormComponent } from './subject-form/subject-form.component';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [MatTableModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    RouterOutlet],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit {

  displayedColumns: string[] = ['position', 'SubjectCode', 'SubjectName', 'TotalMark', 'EarnMarks', 'Grade', 'Operation'];

  marksheetId: string | null = ''
  subjects: Subject[] = []
  subject = new Subject();
  constructor(
    private route: ActivatedRoute,
    public subjectService: SubjectService,
    public overlay: Overlay,
    public dialog: MatDialog,
    public _previewProgressSpinner: OverlayService,
    public _snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit() {
    this.marksheetId = this.route.snapshot.paramMap.get('subjectId');
    console.log(this.marksheetId);
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    if (this.marksheetId !== null) {
      this.subjectService.GetSubjectByMSId(parseInt(this.marksheetId)).subscribe({
        next: res => {
          console.log(res);
          this.subjects = res;
          console.log(this.subjects);
          overlay.detach();
        },
        error: er => {
          console.log(er);
          overlay.detach();
        }
      })
    }
  }
  openDialog() {
    this.subject = new Subject();
    const dialogRef = this.dialog.open(SubjectFormComponent,
      {
        width: '90vw',
        maxHeight: '90vh',
        minHeight: '50vh',
        data: { marksheetid: this.marksheetId, subject: this.subject, view: false },
        scrollStrategy: this.overlay.scrollStrategies.noop()
      }
    );
    this.afterCloseDialog(dialogRef);
  }
  deleteSubject(id: number) {
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    this.subjectService.DeleteSubject(id).subscribe({
      next: res => {
        overlay.detach();
        this._snackBar.open('MarkSheet deleted', 'Action', {
          duration: 3000
        });
      },
      error: er => {
        overlay.detach();
        this._snackBar.open('Something went wrong while adding markSheet, please try again later', 'Action', {
          duration: 3000
        });
        console.log(er);
      }
    })
  }
  EditSubject(id: number) {
    this.subject = (this.subjects.filter(s => s.id == id))[0];
    const dialogRef = this.dialog.open(SubjectFormComponent,
      {
        width: '90vw',
        maxHeight: '90vh',
        minHeight: '50vh',
        data: { marksheetid: this.marksheetId, subject: this.subject, view: false },
        scrollStrategy: this.overlay.scrollStrategies.noop()
      }
    );
    this._snackBar.open('Edit Mode On', 'Action', {
      duration: 3000
    });
    this.afterCloseDialog(dialogRef);
  }
  ViewSubject(id: number) {
    this.subject = (this.subjects.filter(s => s.id == id))[0];
    const dialogRef = this.dialog.open(SubjectFormComponent,
      {
        width: '90vw',
        maxHeight: '90vh',
        minHeight: '50vh',
        data: { marksheetid: this.marksheetId, subject: this.subject, view: true },
        scrollStrategy: this.overlay.scrollStrategies.noop()
      }
    );
    this._snackBar.open('View Mode On', 'Action', {
      duration: 3000
    });

  }
  afterCloseDialog(dialogRef: any) {
    dialogRef.afterClosed().subscribe(() => {
      let overlay: OverlayRef;
      overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
      if (this.marksheetId !== null) {
        this.subjectService.GetSubjectByMSId(parseInt(this.marksheetId)).subscribe({
          next: res => {
            console.log(res);
            this.subjects = res;
            console.log(this.subjects);
            overlay.detach();
          },
          error: er => {
            console.log(er);
            overlay.detach();
          }
        })
      }
    });
  }
}
