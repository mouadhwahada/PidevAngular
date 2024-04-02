import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../mentalModels/QuizModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseUrl = 'http://localhost:8070';

  constructor(private http: HttpClient) { }
  findAllQuizzes(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(this.baseUrl + '/findAllQuizzes');
    }

  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.baseUrl}/addQuiz`, quiz);
  }
  findQuizById(quizId: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.baseUrl}/findQuizById/${quizId}`);
  }

  updateQuiz(quizId: number, updatedQuiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.baseUrl}/updateQuiz/${quizId}`, updatedQuiz);
  }
  deleteQuiz(id: number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/deleteQuiz/${id}`);
  }
}
