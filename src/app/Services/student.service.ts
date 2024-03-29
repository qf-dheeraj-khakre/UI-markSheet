import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Model/classes/Student';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(public _httpClient: HttpClient) { }

  GetAllStudent(): Observable<Student[]> {
    return this._httpClient.get<Student[]>("http://localhost:5173/api/Student");
  }

  GetStudetnBtId(studentID: number): Observable<Student> {
    return this._httpClient.get<Student>(`http://localhost:5173/api/Student/getByRoolNo/ ${studentID}`)
  }
  DeleteStudent(studentID: number): Observable<Student> {
    return this._httpClient.delete<Student>(`http://localhost:5173/api/Student/${studentID}`)
  }
  EditStudent(Student: Student): Observable<any> {
    return this._httpClient.put("http://localhost:5173/api/Student/EditStudent", Student);
  }
  addStudent(Student: Student): Observable<any> {
    return this._httpClient.post("http://localhost:5173/api/Student/addStudent", Student);
  }

  LoginCredential(username: string, password: string): Observable<any> {
    const header = new HttpHeaders({ username: username, password: password });
    return this._httpClient.get("http://localhost:5173/api/Student/Credential", { headers: header });
  }
}
