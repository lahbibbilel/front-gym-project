import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient,private router : Router) { }

 // Url = "http://54.174.207.177:3000"
 Url = 'http://34.203.221.205:3000';

  private authTokenKey = 'authToken';
  private name = 'name';
  private mail = 'email'
private idkey = '_id'
private img = 'image'

  saveImage(image: any) {
    localStorage.setItem('image', image); // Save the Base64 string directly
  }

  getImage(): string | null {
    return localStorage.getItem('image');
  }


  saveId(id : any):void
  {
    localStorage.setItem(this.idkey,id)
  }
  getId():string|null
  {
    return localStorage.getItem('_id')
  }



  saveName(name : string) :void
  {         localStorage.setItem(this.name, name);
  }

savemail(email : string):void
{
localStorage.setItem(this.mail,email)
}
getmail():string|null
{
  return localStorage.getItem('email')
}
  getName():string| null
  {
    return localStorage.getItem('name')
  }



  login(credentials : {email :any ,password : any}) :any

  {
return this.http.post(`${this.Url}/user/login`,credentials)
  }
  saveToken(authToken : string) :void
{         localStorage.setItem(this.authTokenKey, authToken);
}



getToken():string| null
{
  return localStorage.getItem('authToken')
}

// Dans LoginService
  getUserName(): { name: string } | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodedToken(token);
      if (decodedToken) {
        return { name: decodedToken.name };
      }
    }
    return null;
  }





  isLoginIn():boolean
{
  return !!this.getToken()
}
logout()
{
  localStorage.removeItem('authToken')
  localStorage.removeItem('image')
  localStorage.removeItem('email')
  localStorage.removeItem('name')
  localStorage.removeItem('_id')
this.router.navigate(['/user/login'])
}


  TokenIsExpired(token: any): boolean {
    const decodedToken = this.decodedToken(token);
    if (!decodedToken) {
      return true;
    }

    const currentTimestamp = Math.floor(new Date().getTime() / 1000 / 3600); // Convert current timestamp to hours
    const expirationTimestamp = decodedToken.exp / 3600; // Convert expiration timestamp to hours

    return expirationTimestamp < currentTimestamp;
  }

  decodedToken(token : string) : any
{
try {
  return jwtDecode(token)
}catch (error){
  return null
}
}
  removeToken() {
    localStorage.removeItem('authToken');
  }
}
