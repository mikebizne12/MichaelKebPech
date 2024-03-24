import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = '';

  constructor(public http: HttpClient) {
    this.url = `${environment.url_base}`;
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.url + endpoint);
  }

  post<T>(endpoint: string, body: T): Observable<T> {
    return this.http.post<T>(this.url + endpoint, body);
  }

  put<T>(
    endpoint: string,
    body: T,
    reqOpts?: { [key: string]: unknown },
  ): Observable<T> {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
      };
    }
    return this.http.put<T>(this.url + endpoint, body, reqOpts);
  }

  delete<T>(endpoint: string, reqOpts?: { [key: string]: T }): Observable<T> {
    const options = { ...reqOpts, responseType: 'text' as 'json' };
    return this.http.delete<T>(this.url + endpoint, options);
  }
}
