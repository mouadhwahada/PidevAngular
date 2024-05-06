import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BadwordService {

  private apiUrl = 'http://localhost:8070/badword';

  constructor(private http: HttpClient) { }

  getAllBadWords(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addBadWord(badWord: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, badWord);
  }

  deleteBadWord(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
