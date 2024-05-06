import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {filter, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8070/post';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`,this.httpOptions);
  }

  getPost(idPost: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/getPost/${idPost}`,this.httpOptions);
  }

  addPost(idUser: number, post: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addPost/${idUser}`, post ,this.httpOptions);
  }

  updatePost(idPost: number, post: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updatePost/${idPost}`, post,this.httpOptions);
  }

  deletePost(idPost: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletePost/${idPost}`,this.httpOptions);
  }

  getPostsByUser(idUser: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getPostByUser/${idUser}`,this.httpOptions);
  }

  getReactByPost(idPost: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getReactByPost/${idPost}`,this.httpOptions);
  }

  getReact(idReact: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getReact/${idReact}`,this.httpOptions);
  }

  getTypeReact(idUser: number, idPost: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getTypeReact/${idUser}/${idPost}`,this.httpOptions);
  }

  addReact(idUser: number, idPost: number, react: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addReact/${idUser}/${idPost}`, react);
  }

  deleteReact(idUser: number, idPost: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteReact/${idUser}/${idPost}`);
  }

  saveImage(file: File, idPost: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${this.apiUrl}/saveImage/${idPost}`;
    return this.http.post<any>(url, formData);
  }


  loadImage(fileName: string): Observable<any> {
    const url = `${this.apiUrl}/loadImage/${fileName}`;
    const req = new HttpRequest('GET', url, {
      responseType: 'blob',
    });
    return this.http.request(req);
  }

}
