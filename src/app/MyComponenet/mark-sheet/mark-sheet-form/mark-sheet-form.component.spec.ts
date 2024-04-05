import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkSheetFormComponent } from './mark-sheet-form.component';

describe('MarkSheetFormComponent', () => {
  let component: MarkSheetFormComponent;
  let fixture: ComponentFixture<MarkSheetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkSheetFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarkSheetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
