import { Component, OnInit } from '@angular/core';
import {User} from "../user/user";
import {HttpClient} from "@angular/common/http";
import {ConsummerApiService} from "../home/consummer-api.service";

@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.css']
})
export class GetAllComponent implements OnInit {
  users: User[] = [];
  userIdToEncrypt: any;
  constructor(private http : HttpClient,private service : ConsummerApiService) { }

  ngOnInit(): void {
  this.service.getUsers().subscribe(
    (data :User[])=>{
      this.users = data
      console.log(data)
    }
  )
  }

  encryptUserPassword() {

  }
}
