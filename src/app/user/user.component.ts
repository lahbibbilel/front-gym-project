import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConsummerApiService} from "../home/consummer-api.service";
import {User} from "./user";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  showSuccess: boolean = false;
  showError: boolean = false;

  users!:any;
form! : FormGroup
//  newUser: User[] = [];
  constructor(private http: HttpClient,
              private formbuilder : FormBuilder,
              private toaster : ToastrService,
              private service: ConsummerApiService) {
  this.form = this.formbuilder.group(
    {
      name : ['',Validators.required],
      username : ['',Validators.required],
      lastname :['',Validators.required],
      email : ['',Validators.required],
      password : ['',Validators.required]
    }
  )
  }
  save(): void {
    if (this.form.valid) {
      console.log('Creating user:', this.form.value);
      this.service.createUser(this.form.value).subscribe(
        (data: any) => {
          console.log('User created successfully:', data);
          this.showSuccess = true;
          this.showError = false;
          this.toaster.success('Success', 'User created successfully');
        },
        (error) => {
          console.error('Error creating user:', error);
          this.showError = true;
          this.showSuccess = false;
          this.toaster.error('Error', 'Error creating user');
        }
      );
    } else {
      this.showError = true;
      this.showSuccess = false;
      this.toaster.error('Error', 'Form is invalid');
    }
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log('Users fetched successfully:', this.users);
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
