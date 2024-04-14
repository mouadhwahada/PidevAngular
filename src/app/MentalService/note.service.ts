import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../mentalModels/Note';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl :string = 'http://localhost:8070'

  constructor(private http :HttpClient) { }
  addNoteToQuiz(titleQuiz: string, note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}/addNoteToQuiz?titleQuiz=${titleQuiz}`, note);
  }
  deleteNote(id: number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/deleteNote/${id}`);
  }
  findNoteById(noteId: number): Observable<Note> {
    return this.http.get<Note>(`${this.baseUrl}/findNoteById/${noteId}`);
  }
  findAllNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.baseUrl + '/findAllNotes');
    }
  UpdateNote(noteId: number, updatedNote: Note): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/UpdateNote/${noteId}`, updatedNote);
  }
  getStatisticsOfNotes(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + '/StatisticsOfNotes');
  }

}
