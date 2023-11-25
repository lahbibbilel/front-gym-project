import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(private http : HttpClient) { }

url = "http://3.88.251.161:3000/trainer"
//url local
getTrainers(): Observable<any>
{
  return this.http.get(this.url)
}
}
