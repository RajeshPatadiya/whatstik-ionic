import { Injectable, Inject } from '@angular/core';
import { ApiService } from '../helper/services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends ApiService {

  allVideos: any;
  constructor(private http: HttpClient, @Inject("API_BASE_URL") base: string) {
    super(base);
    this.ApiEndPoint = base + "/showAllVideos";
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  showAllVideos(data: any): Observable<Array<any>> {
    return this.http.post<Array<any>>(this.ApiEndPoint, data, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

}
