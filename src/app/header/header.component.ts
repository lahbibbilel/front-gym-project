import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private toastr: ToastrService,public service : LoginService) {}

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  ngOnInit(): void {
  }




}
