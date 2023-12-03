import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http : HttpClient) { }
baseUrl = "http://34.203.221.205:3000/bank"
//  baseUrl = "http://54.174.207.177:3000/bank"

  getBank():Observable<any>
  {
    return this.http.get<any>(this.baseUrl)
  }

}
