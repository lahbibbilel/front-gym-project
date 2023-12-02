import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import Swal from 'sweetalert2';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  prod: any;
  filteredProd: any;
  value!: any;
  showProductList: boolean = true; // Variable pour contrôler l'affichage
  showUsersPanel: boolean = false;
  showPanelsPanel: boolean = false;

  test:boolean=true
  constructor(private prodService: ProductService,
              private http: HttpClient,
              private route : Router,
              private authService : LoginService
              ) { }
  showUsers() {
    this.showProductList = false;
    this.showUsersPanel = true;
    this.showPanelsPanel = false;
  }

  showPanels() {
    this.showProductList = false;
    this.showUsersPanel = false;
    this.showPanelsPanel = true;
  }





  ngOnInit(): void {
    this.prodService.getProduct().subscribe(
      (data: any) => {
        console.log(data);
        this.prod = data;
        this.filteredProd = [...this.prod];
      }
    );
  }

  logout()
  {
  this.authService.logout()

  }

  searchProducts() {
    const query = this.value.toLowerCase();

    if (!query) {
      this.filteredProd = [...this.prod];
    } else {
      this.filteredProd = this.prod.filter(
        (p: any) =>
          p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }
  }






  addProduct() {
    Swal.fire({
      title: 'Add Product',
      html:
        '<input id="title" class="swal2-input" placeholder="Title">' +
        '<input id="image" class="swal2-input" placeholder="Image URL">' +
        '<textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>' +
        '<input id="key_feature" class="swal2-input" placeholder="Key Feature">' +
        '<input id="prix" type="number" step="0.01" class="swal2-input" placeholder="Price">'
      ,
      focusConfirm: false,
      preConfirm: () => {
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const image = (document.getElementById('image') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLTextAreaElement).value;
        const key_feature = (document.getElementById('key_feature') as HTMLInputElement).value;
        const prix = parseFloat((document.getElementById('prix') as HTMLInputElement).value);

        // Check if any field is left empty
        if (!title || !image || !description || !key_feature || isNaN(prix)) {
          Swal.showValidationMessage('All fields are required and price must be a valid number.');
          return;
        }

        // Create a new product object
        const newProduct = {
          title: title,
          image: image,
          description: description,
          key_feature: key_feature,
          prix: prix
        };
this.prodService.addProduct(newProduct).subscribe(
  (data:any)=>{
    console.log(data)
  }
)
        console.log('New Product:', newProduct);
        // You should also perform the necessary service call to add the product to your database
      }
    });
  }


  editProduct(productId: string, updatedProduct: any) {
    Swal.fire({
      title: 'Edit Product',
      html:
        '<input id="title" class="swal2-input" value="' + updatedProduct.title + '">' +
        '<input id="image" class="swal2-input" value="' + updatedProduct.image + '">' +
        '<textarea id="description" class="swal2-textarea">' + updatedProduct.description + '</textarea>' +
        '<input id="key_feature" class="swal2-input" value="' + updatedProduct.key_feature + '">' +
        '<input id="prix" type="number" step="0.01" class="swal2-input" value="' + updatedProduct.prix + '">'
      ,
      focusConfirm: false,
      preConfirm: () => {
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const image = (document.getElementById('image') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLTextAreaElement).value;
        const key_feature = (document.getElementById('key_feature') as HTMLInputElement).value;
        const prix = parseFloat((document.getElementById('prix') as HTMLInputElement).value);

        // Check if any field is left empty
        if (!title || !image || !description || !key_feature || isNaN(prix)) {
          Swal.showValidationMessage('All fields are required and price must be a valid number.');
          return;
        }

        const updatedData = {
          title: title,
          image: image,
          description: description,
          key_feature: key_feature,
          prix: prix
        };

        // Send the updated product details to the API endpoint
        this.prodService.editProduct(productId, updatedData).subscribe(
          (data: any) => {
            console.log('Product Updated:', data);
            // Optionally, update the displayed product list or perform any action needed after editing a product
          },
          (error: any) => {
            console.error('Error updating product:', error);
            // Handle error scenarios here
          }
        );
      }
    });
  }


  deleteProduct(productId: string) {
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
        this.prodService.deleteProduct(productId).subscribe(
          () => {
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            // Optionally, update the product list after deletion
            this.refreshProductList();
          },
          (error) => {
            console.error('Error deleting product:', error);
            Swal.fire('Error!', 'Failed to delete the product.', 'error');
          }
        );
      }
    });
  }

  refreshProductList() {
    // Fetch the updated product list after deletion
    this.prodService.getProduct().subscribe(
      (data: any) => {
        console.log(data);
        this.prod = data;
      }
    );
  }



}
