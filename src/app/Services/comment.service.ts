import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8070/comment';

  constructor(private http: HttpClient) {}

  getCommentsByPost(idPost: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getCommentsByPost/${idPost}`);
  }

  getComment(idComment: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getComment/${idComment}`);
  }

  addComment(idUser: number, idPost: number, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addComment/${idUser}/${idPost}`, comment);
  }

  updateComment(idComment: number, comment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateComment/${idComment}`, comment);
  }

  deleteComment(idComment: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteComment/${idComment}`);
  }
}
