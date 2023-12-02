import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials ={ email : '',password : ''}
  showSuccess = false;
  showError = false;
  constructor(
    private toaster:ToastrService,
    private route:Router,private http:HttpClient,private service : LoginService) { }

  ngOnInit(): void {
this.service.removeToken()
  }

  authToken! : [{}]
  login() {
    this.service.login(this.credentials).subscribe(
      (response: any) => {
        if (response && response.authTokens) {
          const authToken = response.authTokens[0].authToken;
          const name = response.name;
          const mail = response.email
          const key = response._id
          const img = response.image
          const role = response.role; // Assuming you receive the user's role
          this.service.saveImage(img)
          this.service.saveToken(authToken);
          this.service.saveName(name)
          this.service.savemail(mail)
          this.service.saveId(key)

          if (role === 'ADMIN') {
            this.route.navigateByUrl('/user/dashboardAdmin');
          } else {
            this.route.navigateByUrl('/user/dashboardUser');
          }
          this.toaster.success('Login successful');
console.log(response,"data")
          console.log("image",img)
          this.showSuccess = true;
          this.showError = false;
        } else {
          this.toaster.error('Server response is incorrect. No authToken found.');
          this.showError = true;
          this.showSuccess = false;
        }
      },
      (error: any) => {
        this.toaster.error(error);
        this.showError = true;
        this.showSuccess = false;
      }
    );
  }


}
