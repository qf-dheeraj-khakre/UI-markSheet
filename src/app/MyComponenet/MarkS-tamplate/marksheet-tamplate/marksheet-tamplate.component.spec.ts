import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksheetTamplateComponent } from './marksheet-tamplate.component';

describe('MarksheetTamplateComponent', () => {
  let component: MarksheetTamplateComponent;
  let fixture: ComponentFixture<MarksheetTamplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarksheetTamplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarksheetTamplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
