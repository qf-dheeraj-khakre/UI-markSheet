import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ],
  templateUrl: './mark-sheet.component.html',
  styleUrl: './mark-sheet.component.css'
})
export class MarkSheetComponent implements OnInit {
  stdentId: number = 0;

  openDialog() {
    const dialogRef = this.dialog.open(MarkSheetFormComponent,
      {
        width: '90vw',
        maxHeight: '90vh',
        minHeight: '50vh',
        data: { studentId: this.stdentId },
        scrollStrategy: this.overlay.scrollStrategies.noop()
      }
    );

  }
  marksheets: MarkSheet[] = []
  displayedColumns: string[] = ['position', 'semester', 'result', 'View', 'Edit', 'Delete', 'Download'];
  constructor(
    public overlay: Overlay,
    public dialog: MatDialog,
    public activeRout: ActivatedRoute,
    public marksheetService: MarksheetService,
    public _previewProgressSpinner: OverlayService
  ) { }
  ngOnInit(): void {
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    this.activeRout.params.subscribe(id => {
      this.stdentId = id['id'];
      this.marksheetService.GetMarkSheetByStudentId(id['id']).subscribe({
        next: rep => {

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
  ViewMarksheet(markSheetId: number) {

  }
  EditMarksheet(markSheetId: number) {

  }
  DeleteMarksheet(markSheetId: number) {

  }
  DownloadMarksheet(markSheetId: number) {

  }
}
