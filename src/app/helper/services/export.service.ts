import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class ExportService extends ApiService {

  ApiBaseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(baseUrl);
    this.ApiBaseUrl = baseUrl + "api/Export";
  }

  getExcelInventoryExport(): Observable<Blob> {
    return this.http.get<Blob>(this.ApiBaseUrl + '/GetInventoryExcel', { responseType: 'blob' as 'json' }).pipe(catchError(this.errorHandler));    
  }

  getPdfInventoryExport(columns: string[]): Observable<Blob> {
    return this.http.post<Blob>(this.ApiBaseUrl + '/GetInventoryPdf', columns, { responseType: 'blob' as 'json' }).pipe(catchError(this.errorHandler));
  }

  getPdfDistributorExport(movies:string[]): Observable<Blob> {
    return this.http.post<Blob>(this.ApiBaseUrl + '/GetDistributorPdf', movies, { responseType: 'blob' as 'json' }).pipe(catchError(this.errorHandler));
  }

}
