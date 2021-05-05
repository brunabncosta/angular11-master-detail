import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiPath: string = 'api/entries';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Entry[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToCategories));
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;

    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToCategory));
  }

  create(Entry: Entry): Observable<Entry> {
    return this.http
      .post(this.apiPath, Entry)
      .pipe(catchError(this.handleError), map(this.jsonDataToCategory));
  }

  update(Entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${Entry.id}`;

    return this.http.put(url, Entry).pipe(
      catchError(this.handleError),
      map(() => Entry)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // PRIVATE METHODS

  private jsonDataToCategories(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach((element) => entries.push(element as Entry));
    return entries;
  }

  private jsonDataToCategory(jsonData: any): Entry {
    return jsonData as Entry;
  }

  private handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }
}
