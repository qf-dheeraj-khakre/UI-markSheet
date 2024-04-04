import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { StudentCardComponent } from '../../dashboard/student-card/student-card.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { BooleanInput } from '@angular/cdk/coercion';
import { routes } from '../../../app.routes';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    StudentCardComponent,
    DashboardComponent,
    RouterOutlet
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showSidebar: BooleanInput;
  toggleSidebar() {
    this.showSidebar = true;
  }




}
