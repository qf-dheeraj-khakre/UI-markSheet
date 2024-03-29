import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { Student } from '../../../Model/classes/Student';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  ngOnInit(): void {

  }



}
