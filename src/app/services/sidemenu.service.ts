import { Injectable, Inject } from '@angular/core';
import { ApiService } from '../helper/services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SideMenuData } from '../sidemenu/sideMenuData';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SidemenuService extends ApiService {

  sideMenuData: SideMenuData[] = [];
  constructor(private http: HttpClient, @Inject("API_BASE_URL") base: string) {
    super(base);
    this.ApiEndPoint = base + "/getSidemenu";
  }

  getSidemenu(): Observable<Array<SideMenuData>> {
    return this.http.get<Array<SideMenuData>>(this.ApiEndPoint)
      .pipe(catchError(this.errorHandler));
  }

}
