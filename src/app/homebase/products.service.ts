import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpclient : HttpClient) { }

 // url = "http://localhost:3000/product";
  url = "http://3.88.251.161:3000/product"
  getProducts() : Observable<any[]>
{
return this.httpclient.get<any[]>(this.url)
}
saveProducts(products : any)
{
this.httpclient.post(this.url,products)
}
  getProductById(productId: string): Observable<any> {
    return this.httpclient.get<any>(`${this.url}/${productId}`);
  }

}

