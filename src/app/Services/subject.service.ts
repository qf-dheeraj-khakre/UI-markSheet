import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, SubjectLike } from 'rxjs';
import { Subject } from '../Model/classes/Subject';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(public Http: HttpClient) { }

  GetSubjectByMSId(id: number): Observable<Subject[]> {
    return this.Http.get<Subject[]>(`https://localhost:7252/api/Subject/ByMSId/${id}`);
  }

  GetAllSubject(): Observable<Subject[]> {
    return this.Http.get<Subject[]>("https://localhost:7252/api/Subject");
  }
  DeleteSubject(): Observable<Subject> {
    return this.Http.delete<Subject>("https://localhost:7252/api/Subject");
  }

  AddSubject(subject: Subject): Observable<Subject> {
    return this.Http.post<Subject>("https://localhost:7252/api/Subject", subject);
  }

  EditSubject(subject: Subject): Observable<Subject> {
    return this.Http.put<Subject>("https://localhost:7252/api/Subject", subject);
  }
  GetSubjectById(id: number): Observable<Subject> {
    return this.Http.get<Subject>(`https://localhost:7252/api/Subject/ById${id}`);
  }
}
