import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }
  url ="http://localhost:3000/product"
  getProduct():Observable<any>
  {
    return this.http.get(this.url)
  }
  addProduct(user : any):Observable<any>
  {
    return  this.http.post(this.url,user)
  }
  editProduct(productId: string, updatedProduct: any): Observable<any> {
    const editUrl = `${this.url}/${productId}`;
    return this.http.put(editUrl, updatedProduct);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.url}/${productId}`);
  }

}
