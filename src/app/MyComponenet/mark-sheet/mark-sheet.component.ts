import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MarksheetService } from '../../Services/marksheet.service';
import { OverlayService } from '../../shared/spinner/overlay/overlay.service';
import { MarkSheet } from '../../Model/classes/MarkSheet';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ProgressSpinnerComponent } from '../../shared/spinner/progress-spinner/progress-spinner.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MarkSheetFormComponent } from './mark-sheet-form/mark-sheet-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-mark-sheet',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    RouterOutlet
  ],
  templateUrl: './mark-sheet.component.html',
  styleUrl: './mark-sheet.component.css'
})
export class MarkSheetComponent implements OnInit {

  stdentId: number = 0;
  marksheet = new MarkSheet();
  marksheets: MarkSheet[] = []
  displayedColumns: string[] = ['position', 'semester', 'result', 'subject', 'View', 'Edit', 'Delete', 'Download'];
  constructor(
    public overlay: Overlay,
    public dialog: MatDialog,
    public activeRout: ActivatedRoute,
    public marksheetService: MarksheetService,
    public _previewProgressSpinner: OverlayService,
    public _snackBar: MatSnackBar,
    public router: Router,
    public route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    this.activeRout.params.subscribe(id => {
      this.stdentId = id['id'];
      this.marksheetService.GetMarkSheetByStudentId(id['id']).subscribe({
        next: rep => {
          console.log(rep);
          this.marksheets = rep;
          console.log(this.marksheets);
          overlay.detach();
        },
        error: er => {
          console.log(er);
          overlay.detach();
        }
      })

    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(MarkSheetFormComponent,
      {
        width: '90vw',
        maxHeight: '90vh',
        minHeight: '50vh',
        data: { studentId: this.stdentId, marksheet: this.marksheet, view: false },
        scrollStrategy: this.overlay.scrollStrategies.noop()
      }
    );

  }
  AddSubject(id: number) {
    this.router.navigate(['../subject', id], { relativeTo: this.route });
  }
  ViewMarksheet(markSheetId: number) {
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    this.marksheet = (this.marksheets.filter(x => x.markSheetId == markSheetId))[0];
    console.log(this.marksheet);
    overlay.detach();
    this._snackBar.open('View Mode', 'Action', {
      duration: 3000
    });
    const dialogRef = this.dialog.open(MarkSheetFormComponent,
      {
        width: '90vw',
        maxHeight: '90vh',
        minHeight: '50vh',
        data: { studentId: this.stdentId, marksheet: this.marksheet, view: true },
        scrollStrategy: this.overlay.scrollStrategies.noop()
      }

    );
  }
  EditMarksheet(markSheetId: number) {
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    this.marksheet = (this.marksheets.filter(x => x.markSheetId == markSheetId))[0];
    console.log(this.marksheet);
    overlay.detach();
    this._snackBar.open('View Mode', 'Action', {
      duration: 3000
    });
    const dialogRef = this.dialog.open(MarkSheetFormComponent,
      {
        width: '90vw',
        maxHeight: '90vh',
        minHeight: '50vh',
        data: { studentId: this.stdentId, marksheet: this.marksheet, view: false },
        scrollStrategy: this.overlay.scrollStrategies.noop()
      }

    );

  }
  DeleteMarksheet(markSheetId: number) {
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    this.marksheetService.DeleteMarkSheet(markSheetId).subscribe({
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
      }

    })


  }
  DownloadMarksheet(markSheetId: number) {

  }
}
