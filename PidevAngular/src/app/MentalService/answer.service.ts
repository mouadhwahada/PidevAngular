import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer } from '../mentalModels/AnswerModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private baseUrl: string = 'http://localhost:8070';

  constructor(private http: HttpClient) { }
  findAllAnswers(): Observable<Answer[]>{
    return this.http.get<Answer[]>(this.baseUrl + '/findAllAnswers');
    }

  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(`${this.baseUrl}/addAnswer`, answer);
  }
  addAnswertoQuestion(textQ: string, answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(`${this.baseUrl}/addAnswerToQuestion?textQ=${textQ}`, answer);
  }
  findAnswerById(answerId: number): Observable<Answer> {
    return this.http.get<Answer>(`${this.baseUrl}/findAnswerById/${answerId}`);
  }

  updateAnswer(answerId: number, updatedAnswer: Answer): Observable<Answer> {
    return this.http.put<Answer>(`${this.baseUrl}/updateAnswer/${answerId}`, updatedAnswer);
  }
  deleteAnswer(answerId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteAnswer/${answerId}`);
  }

}
