import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http : HttpClient) { }
//baseUrl = "http://3.92.31.108:3000/bank"
  baseUrl = "http://localhost:3000/bank"

//  baseUrl = "http://54.174.207.177:3000/bank"

  getBank():Observable<any>
  {
    return this.http.get<any>(this.baseUrl)
  }

}
