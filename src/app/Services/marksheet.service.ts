import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkSheet } from '../Model/classes/MarkSheet';
import { makeBindingParser } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class MarksheetService {

  constructor(public Http: HttpClient) { }

  GetMarkSheet(): Observable<MarkSheet[]> {
    return this.Http.get<MarkSheet[]>(`http://localhost:5173/api/MarkSheet`);
  }

  GetMarkSheetByStudentId(Studentid: number): Observable<MarkSheet[]> {
    return this.Http.get<MarkSheet[]>(`http://localhost:5173/api/MarkSheet/ByStudentId${Studentid}`);
  }
  AddMarkSheet(marksheet: MarkSheet): Observable<MarkSheet> {
    return this.Http.post<MarkSheet>(`http://localhost:5173/api/MarkSheet`, marksheet);
  }
  EditMarkSheet(marksheet: MarkSheet): Observable<MarkSheet> {
    return this.Http.put<MarkSheet>(`http://localhost:5173/api/MarkSheet`, marksheet);
  }
  DeleteMarkSheet(id: number): Observable<MarkSheet> {
    return this.Http.delete<MarkSheet>(`http://localhost:5173/api/MarkSheet/${id}`);
  }
  GetMarkSheetById(id: number): Observable<MarkSheet[]> {
    return this.Http.get<MarkSheet[]>(`http://localhost:5173/api/MarkSheet/ById${id}`);
  }

}
