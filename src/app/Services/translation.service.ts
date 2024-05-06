import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = 'https://translation.googleapis.com/language/translate/v2';
  private apiKey = 'YOUR_API_KEY';

  constructor(private http: HttpClient) { }

  translateText(text: string, source: string, target: string): Observable<any> {
    const params = new HttpParams()
      .set('q', text)
      .set('source', source)
      .set('target', target)
      .set('key', this.apiKey);

    return this.http.get(this.apiUrl, { params });
  }
}
