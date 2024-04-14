import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../mentalModels/QuizModel';
import { Observable } from 'rxjs';
import { Question } from '../mentalModels/Question';

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
  getQuestionsWithAnswersForQuiz(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/getQuestionsWithAnswersForQuiz/${quizId}`);
  }
  calculateQuizScore(selectedAnswerIds: number[]): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/calculateQuizScore`, selectedAnswerIds);
  }
  evaluateQuizScore(quizScore: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/evaluateQuizScore/${quizScore}`, null, { responseType: 'text' });
}
addQuestionToQuiz(idQuiz: number, idQuestion: number): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/addQuestionToQuiz/${idQuiz}/${idQuestion}`, {});
}

removeQuestionFromQuiz(idQuiz: number, idQuestion: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/removeQuestionFromQuiz/${idQuiz}/${idQuestion}`);
}

}
