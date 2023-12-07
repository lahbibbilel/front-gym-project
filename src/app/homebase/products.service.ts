import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpclient : HttpClient) { }

  //url = "http://34.203.221.205:3000/product";
  url = "http://localhost:3000/product"
  getProducts() : Observable<any[]>
{
return this.httpclient.get<any[]>(this.url)
}
saveProducts(products : any)
{
this.httpclient.post(this.url,products)
}
  getProductById(productId: any): Observable<any> {
    return this.httpclient.get(this.url,productId)
  }

}

