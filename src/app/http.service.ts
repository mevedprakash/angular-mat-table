import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IStudent } from './student';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  httpClient=inject(HttpClient);
  constructor() {

   }
   getStudents(){
    return this.httpClient.get<IStudent[]>("http://localhost:3000/students");
   }
}
