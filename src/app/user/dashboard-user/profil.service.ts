import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http : HttpClient) { }

url = "http://localhost:3000/user/"

  editUser(id : any,updatedUser:any) : Observable<any>
  {
    return this.http.put<any>(`${this.url}${id}`,updatedUser)
  }
  editImageUser(id : any , updatedUser : any): Observable<any>
  {
    return this.http.post<any>(`${this.url}${id}/upload`,updatedUser)
  }
}
