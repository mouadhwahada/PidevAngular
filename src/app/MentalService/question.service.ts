import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../mentalModels/Question';
import { Answer } from '../mentalModels/AnswerModel';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl :string = 'http://localhost:8070'

  constructor(private http : HttpClient) { }
  findAllQuestions(): Observable<Question[]>{
  return this.http.get<Question[]>(this.baseUrl + '/findAllQuestions');
  }
  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.baseUrl + '/addQuestion',question);
  }
  addQuestionToQuiz(titleQuiz: string, question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.baseUrl}/addQuestiontoQuiz?titleQuiz=${titleQuiz}`, question);
  }
  deleteQuestion(id: number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/deleteQuestion/${id}`);
  }
  findQuestionById(questionId: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/findQuestionById/${questionId}`);
  }
  updateQuestion(questionId: number, updatedQuestion: Question): Observable<Question> {
    return this.http.put<Question>(`${this.baseUrl}/updateQuestion/${questionId}`, updatedQuestion);
  }
  findAnswersForQuestion(questionId: number): Observable<Answer[]> {
    const url = `${this.baseUrl}/getAnswersForQuestion/${questionId}`;
    return this.http.get<Answer[]>(url);
  }
  addAnswerToQuestion(idQuestion: number, idAnswer: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addAnswerToQuestion/${idQuestion}/${idAnswer}`, {});
  }

  removeAnswerFromQuestion(idQuestion: number, idAnswer: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/removeAnswerFromQuestion/${idQuestion}/${idAnswer}`, {});
  }

}