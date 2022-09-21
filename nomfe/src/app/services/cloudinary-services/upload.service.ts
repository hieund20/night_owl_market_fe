import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(protected httpClient: HttpClient) {}

  uploadImage(value: any) {
    let data = value;
    return this.httpClient.post(
      'https://api.cloudinary.com/v1_1/dwgjmgf6o/image/upload',
      data
    );
  }
}
