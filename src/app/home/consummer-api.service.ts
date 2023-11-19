import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConsummerApiService {
  private baseUrl = 'http://localhost:3000/user';
  constructor(private http : HttpClient) {

  }
  getUsers() :any
  {
    return this.http.get(this.baseUrl);
  }
  createUser(users: any )
  {
    return this.http.post(this.baseUrl,users)
  }
  updateUser(user : any , id : any)
  {
    return this.http.put(`${this.baseUrl}/${id}`,user)
  }
  deleteUser(id : any)
  {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

}
