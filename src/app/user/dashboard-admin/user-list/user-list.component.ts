import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginService} from "../../../login/login.service";
import Swal from "sweetalert2";
import {UserlistService} from "./userlist.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  user: any;
  filteredUser: any;
  value!: any;

  constructor(private userService: UserlistService,
              private http: HttpClient,
              private route: Router
  ) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (data: any) => {
        console.log(data);
        this.user = data;
        this.filteredUser = [...this.user];
      }
    );
  }

  searchUsers() {
    const query = this.value.toLowerCase();

    if (!query) {
      this.filteredUser = [...this.user];
    } else {
      this.filteredUser = this.user.filter(
        (p: any) =>
          p.username.toLowerCase().includes(query) || p.name.toLowerCase().includes(query)
      );
    }
  }


  addUser() {
    Swal.fire({
      title: 'Add Product',
      html:
        '<input id="role" class="swal2-input" placeholder="role">' +
        '<input id="name" class="swal2-input" placeholder="name">' +
        '<input id="username" class="swal2-input" placeholder="username">' +
        '<input id="lastname" class="swal2-input" placeholder="lastname">' +
        '<input id="email"  class="swal2-input" placeholder="email">' +
        '<input id="password"  class="swal2-input" placeholder="password">'
      ,
      focusConfirm: false,
      preConfirm: () => {
        const role = (document.getElementById('role') as HTMLInputElement).value;
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const username = (document.getElementById('username') as HTMLTextAreaElement).value;
        const lastname = (document.getElementById('lastname') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        // Check if any field is left empty
        if (!role || !name || !username || !lastname || !email || !password ) {
          Swal.showValidationMessage('All fields are required and price must be a valid number.');
          return;
        }

        // Create a new product object
        const newUser = {
          role: role,
          name: name,
          username: username,
          lastname: lastname,
          email: email,
          password: password
        };
        this.userService.addUser(newUser).subscribe(
          (data: any) => {
            console.log(data)
          }
        )
        console.log('New Product:', newUser);
        // You should also perform the necessary service call to add the product to your database
      }
    });
  }


  editUser(usertId: string, updatedUser: any) {
    Swal.fire({
      title: 'Edit Product',
      html:
        '<input id="role" class="swal2-input" value="' + updatedUser.role + '">' +
        '<input id="name" class="swal2-input" value="' + updatedUser.name + '">' +
        '<input id="username" class="swal2-input" value="' + updatedUser.username + '">' +
        '<input id="lastname" class="swal2-input" value="' + updatedUser.lastname + '">' +
        '<input id="email" class="swal2-input" value="' + updatedUser.email + '">' +


        '<input id="password" type="password" class="swal2-input" value="' + updatedUser.password + '">'
      ,
      focusConfirm: false,
      preConfirm: () => {
          const role = (document.getElementById('role') as HTMLInputElement).value;
          const name = (document.getElementById('name') as HTMLInputElement).value;
          const username = (document.getElementById('username') as HTMLTextAreaElement).value;
          const lastname = (document.getElementById('lastname') as HTMLInputElement).value;
          const email = (document.getElementById('email') as HTMLInputElement).value;
          const password = (document.getElementById('password') as HTMLInputElement).value;

        if (!role || !name || !username || !lastname || !email || !password) {
          Swal.showValidationMessage('All fields are required and price must be a valid number.');
          return;
        }

        const updatedData = {
          role: role,
          name: name,
          username: username,
          lastname: lastname,
          email: email,
          password:password
        };

        // Send the updated product details to the API endpoint
        this.userService.editUser(usertId, updatedData).subscribe(
          (data: any) => {
            console.log('user Updated:', data);
            // Optionally, update the displayed product list or perform any action needed after editing a product
          },
          (error: any) => {
            console.error('Error updating user:', error);
            // Handle error scenarios here
          }
        );
      }
    });
  }


  deleteUser(userId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Send delete request to Node.js backend
        this.userService.deleteUser(userId).subscribe(
          () => {
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            // Optionally, update the product list after deletion
            this.refreshUserList();
          },
          (error) => {
            console.error('Error deleting user:', error);
            Swal.fire('Error!', 'Failed to delete the user.', 'error');
          }
        );
      }
    });
  }

  refreshUserList() {
    // Fetch the updated product list after deletion
    this.userService.getUser().subscribe(
      (data: any) => {
        console.log(data);
        this.user = data;
      }
    );
  }


}
