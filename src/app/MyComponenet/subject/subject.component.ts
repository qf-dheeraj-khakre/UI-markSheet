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
  openDialog() {
    throw new Error('Method not implemented.');
  }
  deleteSubject() {
    throw new Error('Method not implemented.');
  }
  EditSubject() {
    throw new Error('Method not implemented.');
  }
  ViewSubject() {
    throw new Error('Method not implemented.');
  }
  displayedColumns: string[] = ['position', 'SubjectCode', 'SubjectName', 'TotalMark', 'EarnMarks', 'Grade', 'Operation'];


  subjects: Subject[] = []
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
    const subjectId = this.route.snapshot.paramMap.get('subjectId');
    console.log(subjectId);
    let overlay: OverlayRef;
    overlay = this._previewProgressSpinner.open({ hasBackdrop: true }, ProgressSpinnerComponent);
    if (subjectId !== null) {
      this.subjectService.GetSubjectByMSId(parseInt(subjectId)).subscribe({
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
}
