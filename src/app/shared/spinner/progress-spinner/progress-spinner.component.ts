import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-progress-spinner',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: 'progress-spinner.component.html',
  styleUrls: ['progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
