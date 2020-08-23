import { Injectable } from "@angular/core";

@Injectable()
export class CommonSettings {

  public static deleteSwal: Object = {
    title: 'Are you sure?',
    type: 'warning',
    showConfirmButton: true,
    showCancelButton: true,
    showLoaderOnConfirm: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }

  public static errorSwal: Object = {
    title: 'Oops..! Something went wrong',
    text: "",
    type: 'error',
    showConfirmButton: true,
    showCancelButton: false,
    showLoaderOnConfirm: true,
    confirmButtonText: 'Ok',
    cancelButtonText: 'No'
  }

  public static warningSwal: Object = {
    title: 'Are you sure?',
    type: 'warning',
    showConfirmButton: true,
    showCancelButton: true,
    showLoaderOnConfirm: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }
}
