import { Injectable, Inject } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ImageType } from '../models/AddHelperModal';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService extends ApiService {
  ApiBaseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    super(url);
    this.ApiBaseUrl = this.ApiEndPoint + "Upload";
  }

  async uploadImage(image: ImageType, old_filename: string, errObj: Object) {
    if (image.file === null) {
      return;
    }
    const formData = new FormData();
    let filename = new Date().getTime().toString() + "." + image.file.name.split(".")[1];
    formData.append("Image", image.file, filename);
    formData.append("Old_Filename", old_filename);

    await this.uploadFile(formData, image).catch(
      error => {
        errObj['error'] = error;
      }
    );
  }


  async uploadFile(formData: FormData, image: ImageType) {
    return this.http.post(this.ApiBaseUrl, formData, {
      reportProgress: true,
      observe: "events"
    })
      .pipe(map(events => {
        if (events.type === HttpEventType.UploadProgress) {
          image.progress = Math.round((events.loaded / events.total) * 100);
        } else if (events.type === HttpEventType.Response) {
          image.url = "https://cinema360blob.blob.core.windows.net/cinema360/" + events.body["name"];
          image.file = null;
        }
      })).toPromise().catch(this.errorHandler);
  }

  async DeleteFile(filename: string) {
    return this.http.delete(this.ApiBaseUrl, { params:{FileName: filename }}).toPromise().catch(this.errorHandler);
  }
  static getImageUrl(filename){
    if(filename)
        return filename;
    else
    return '';
  }
}

