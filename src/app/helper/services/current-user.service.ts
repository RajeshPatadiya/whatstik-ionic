import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CurrentUserService {
    isPosShift: boolean = false;
  ApiBaseUrl: string;
  BaseUri: string;
  curuser: Curuser = { DisplayName: '', CompanyId: '', Email: '' };

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.ApiBaseUrl = baseUrl + 'api/currrentuser';
    this.BaseUri = baseUrl;
  }

  get(): Observable<Curuser> {
    return this.http
      .get<Curuser>(this.ApiBaseUrl)
      .pipe(catchError(this.errorHandler));
  }

  getFeature(featureName: string, type: string): Observable<boolean> {
    return this.http
      .get<boolean>(this.ApiBaseUrl + '/' + 'HasFeature' + '/' + featureName + '/' + type)
      .pipe(catchError(this.errorHandler));
  }

  getLocationIds(): Observable<string[]> {
    return this.http
      .get<string[]>(this.ApiBaseUrl + '/GetLocationIds')
      .pipe(catchError(this.errorHandler));
  }

  getAdminAccess(): Observable<boolean> {
    return this.http
      .get<boolean>(this.ApiBaseUrl + '/' + 'getAdminAccess')
      .pipe(catchError(this.errorHandler));

  }

  getContextLocationId(): Observable<string> {
    return this.http
      .get<string>(this.ApiBaseUrl + '/' + 'GetContextLocationId')
      .pipe(catchError(this.errorHandler));

  }

  errorHandler(error: HttpErrorResponse) {
    let message = '';
    if (error.error.errors !== undefined) {
      // tslint:disable-next-line: forin
      for (const er in error.error.errors) {
        message += error.error.errors[er].join('<br/>');
      }
    } else {
      message = error.error;
    }
    return throwError(message || 'Server Error');
  }
}

interface Curuser {
  DisplayName: string;
  Email: string;
  CompanyId: string;
}
