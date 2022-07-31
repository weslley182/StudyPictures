import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from 'src/app/photos/photo/photo';

@Injectable({providedIn: 'root'})
export class PhotoService{
  API = 'http://localhost:3000/';

  constructor(private http: HttpClient){}

  listFromUser(userName: string) {
    return this.http
      .get<Photo[]>( this.API + userName +'/photos');
  }

  listFromUserPaginated(userName: string, page: number) {
    const parametro = new HttpParams().append('page', page.toString());
    return this.http
      .get<Photo[]>( this.API + userName +'/photos', { params: parametro});
  }
}
