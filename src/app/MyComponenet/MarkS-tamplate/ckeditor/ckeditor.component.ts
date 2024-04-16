import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CKEditorModule, ChangeEvent } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Template } from '../../../Model/tamplate';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayService } from '../../../shared/spinner/overlay/overlay.service';


@Component({
  selector: 'app-ckeditor',
  standalone: true,
  imports: [CKEditorModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './ckeditor.component.html',
  styleUrl: './ckeditor.component.css'
})
export class CKEditorComponent implements OnInit {
  PreViewTamplate() {
    throw new Error('Method not implemented.');
  }
  tamplateForm!: FormGroup;
  tamplate = new Template();
  public Editor = ClassicEditor;
  editorData: string = "";

  constructor(private fb: FormBuilder,
    public _snackBar: MatSnackBar,
    public _router: Router,
    public route: ActivatedRoute,
    public _previewProgressSpinner: OverlayService,

  ) { }

  ngOnInit(): void {

    this.tamplateForm = this.fb.group({
      TemplateName: [this.tamplate.TemplateName, Validators.required],
      TemplateString: [this.tamplate.TemplateString, Validators.required],
      CkEditorString: [this.tamplate.CkEditorString, Validators.required],

    })
  }
  onSubmit() {
    console.log(this.tamplateForm.value);
  }
  ngOnChanges({ editor }: any) {
    const data = editor.getData();
    console.log(data);
  }
}
