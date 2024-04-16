import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-marksheet-tamplate',
  standalone: true,
  imports: [MatTableModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterOutlet
  ],
  templateUrl: './marksheet-tamplate.component.html',
  styleUrl: './marksheet-tamplate.component.css'
})
export class MarksheetTamplateComponent {
  constructor(private router: Router) { }



  ckeditor() {
    this.router.navigate(["/marksheetTamplate/editor"]);
  }

}
