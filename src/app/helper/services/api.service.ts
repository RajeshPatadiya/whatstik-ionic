import { Injectable, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ApiService {

  ApiEndPoint: string;
  constructor(baseUrl: string) {
    this.ApiEndPoint = baseUrl + 'api/';
  }

  errorHandler(error: HttpErrorResponse) {
    let message = "";
    if (error.error.errors !== undefined) {
      console.log(error.error.errors);
      for (let er in error.error.errors) {
        message += er + ": " + error.error.errors[er].join("<br/>") + "</br>";
      }
    } else {
      message = error.error;
    }
    return throwError(message || "Server Error");
  }
}
