import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:8070/files';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
  }

  getImage(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/get-image/${filename}`, { responseType: 'blob' });
  }
}
