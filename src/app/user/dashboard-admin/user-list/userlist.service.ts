import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserlistService {

  constructor(private http : HttpClient) { }
url = "http://3.92.31.108:3000/user"
  getUser():Observable<any>
  {
    return this.http.get(this.url)
  }

  addUser(user : any):Observable<any>
  {
    return this.http.post(this.url,user)
  }

  editUser(userId: string, updatedUser: any): Observable<any> {
    const editUrl = `${this.url}/${userId}`;
    return this.http.put(editUrl, updatedUser);
  }
  getUserById(userId:any):Observable<any>
  {
    return this.http.get(this.url,userId)
  }



  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.url}/${userId}`);
  }



}


