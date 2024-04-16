import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './MyComponenet/Layout/footer/footer.component';
import { HeaderComponent } from './MyComponenet/Layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatListModule,
    MatSidenavModule,
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    HttpClientModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public router: Router) { }

  IdCardTamplete() {
    throw new Error('Method not implemented.');
  }
  GotoTamplete() {
    this.router.navigate(['/marksheetTamplate'])
  }

  title = 'UI-markSheet';



}