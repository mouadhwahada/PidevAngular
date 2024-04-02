import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcommentService {
  private apiUrl = 'http://localhost:8070/subcomment';

  constructor(private http: HttpClient) {}

  getSubCommentsByComment(idComment: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getSubCommentsByComment/${idComment}`);
  }

  getSubComment(idSubComment: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getSubComment/${idSubComment}`);
  }

  addSubComment(idUser: number, idComment: number, subComment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addSubComment/${idComment}`, { idUser, subComment });
  }

  updateSubComment(idSubComment: number, subComment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateSubComment/${idSubComment}`, subComment);
  }

  deleteSubComment(idSubComment: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteSubComment/${idSubComment}`);
  }
}
