import { Injectable, Inject } from '@angular/core';
import { ApiService } from '../helper/services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class GeneralService extends ApiService {

	generalData: any;
	constructor(private http: HttpClient, @Inject("API_BASE_URL") base: string) {
		super(base);
		this.ApiEndPoint = base + "/getGeneralData";
	}

	getGeneralData(): Observable<Array<any>> {
		return this.http.get<Array<any>>(this.ApiEndPoint)
			.pipe(catchError(this.errorHandler));
	}

}
