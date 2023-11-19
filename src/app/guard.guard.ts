import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "./login/login.service";

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {


  constructor(private authservice : LoginService,private router : Router) {

  }

  canActivate(): boolean {
if (this.authservice.isLoginIn())
{
return true
}
else {
  this.router.navigate(['user/login'])
return false
}
  }

}
