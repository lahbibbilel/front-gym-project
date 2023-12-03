import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import Swal from 'sweetalert2';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";
import {ProfilService} from "../dashboard-user/profil.service";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  prod: any;
  filteredProd: any;
  value!: any;
  showProductList: boolean = true;
  showUsersPanel: boolean = false;
  showPanelsPanel: boolean = false;
  imgSrc: string | null = null;
  user: any = {};
  name: string | null = null;
  email : string |null = null
  test:boolean=true
  constructor(private prodService: ProductService,
              private http: HttpClient,
              private route : Router,
              private authService : LoginService,
              public loginServ : LoginService,
              public profil: ProfilService,

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

  updateUser() {
    const userId = this.loginServ.getId();

    if (userId) {
      Swal.fire({
        title: 'Edit Profile',
        html:
          `<input id="name" class="swal2-input" placeholder="Name" required>` +
          `<input id="username" class="swal2-input" placeholder="Username" required>` +
          `<input id="lastname" class="swal2-input" placeholder="Lastname" required>` +
          `<input id="email" class="swal2-input" placeholder="Email" required>` +
          `<input id="password" type="password" class="swal2-input" placeholder="Password" required>`,
        focusConfirm: false,
        preConfirm: () => {
          return {
            name: (<HTMLInputElement>document.getElementById('name')).value,
            username: (<HTMLInputElement>document.getElementById('username')).value,
            lastname: (<HTMLInputElement>document.getElementById('lastname')).value,
            email: (<HTMLInputElement>document.getElementById('email')).value,
            password: (<HTMLInputElement>document.getElementById('password')).value,
          };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedUser = result.value;

          // Check if any field is left empty
          const anyFieldEmpty = Object.values(updatedUser).some(val => val === '');
          if (anyFieldEmpty) {
            Swal.fire({
              icon: 'error',
              title: 'All fields are required!',
              text: 'Please fill in all the fields.',
            });
          } else {
            this.profil.editUser(userId, updatedUser).subscribe(
              (data: any) => {
                console.log('User updated with success');
                localStorage.setItem('name', updatedUser.name);
                localStorage.setItem('email', updatedUser.email);
                Swal.fire({
                  title: 'Success!',
                  text: 'User updated successfully.',
                  icon: 'success',
                });
                this.refresh();

              },
              (error: any) => {
                console.error('Error updating user:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                  footer: '<a href="#">Why do I have this issue?</a>',
                });
              }
            );
          }
        }
      });
    }
  }
  updateUserImage() {
    const userId = this.loginServ.getId();
    if (userId) {
      Swal.fire({
        title: 'Update Image',
        html: '<input type="file" id="img" class="swal2-file" accept="image/*">',
        focusConfirm: false,
        preConfirm: () => {
          const input = <HTMLInputElement>document.getElementById('img');
          const file = input.files ? input.files[0] : null;

          if (file) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('contentType', file.type);

            this.profil.editImageUser(userId, formData).subscribe(
              (data: any) => {
                console.log('User image updated with success');

                // Convert the file to Base64 without the header
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  // Extract only the Base64 data without the header
                  const imageBase64 = (reader.result as string).split(',')[1];

                  // Save the Base64 string to localStorage
                  localStorage.setItem('image', imageBase64);

                  Swal.fire({
                    title: 'Success!',
                    text: 'User image updated successfully.',
                    icon: 'success',
                  });
                };
                setTimeout(() => {
                  window.location.reload();
                }, 3000); // Reload after a delay of 1 second (1000 milliseconds)

              },
              (error: any) => {
                console.error('Error updating user image:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong while updating the image!',
                  footer: '<a href="#">Why do I have this issue?</a>',
                });
              }
            );
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Image file is required!',
              text: 'Please provide an image file.',
            });
          }
        },
      });
    }
  }
  showProfileImage() {
    const imageBase64 = this.loginServ.getImage();

    if (imageBase64) {
      Swal.fire({
        imageUrl: `data:image;base64,${imageBase64}`,
        imageAlt: 'User Profile Image',
        width: 600, // Réglez la largeur selon vos besoins
        showCloseButton: true,
        showConfirmButton: false,
      });
    }
  }


  ngOnInit(): void {
    this.name = this.authService.getName();
    this.email = this.authService.getmail();
    //this._id =this.authService.getId()
    const imageBase64 = this.loginServ.getImage();
    if (imageBase64) {
      this.imgSrc = `data:image;base64,${imageBase64}`; // Set imgSrc directly with the Base64 string
    }
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

  refresh(): void {
    setTimeout(() => {
      window.location.reload();
    }, 3000);  }





  addProduct() {
    const defaultImage = 'assets/price-1.png'; // Définir votre image par défaut ici

    Swal.fire({
      title: 'Add Product',
      html:
        '<input id="title" class="swal2-input" placeholder="Title">' +
        '<textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>' +
        '<input id="key_feature" class="swal2-input" placeholder="Key Feature">' +
        '<input id="prix" type="number" step="0.01" class="swal2-input" placeholder="Price">' +
        '<img src="' + defaultImage + '" alt="Default Image" style="max-width: 20%; margin-top: 10px;">'
      ,
      focusConfirm: false,
      preConfirm: () => {
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLTextAreaElement).value;
        const key_feature = (document.getElementById('key_feature') as HTMLInputElement).value;
        const prix = parseFloat((document.getElementById('prix') as HTMLInputElement).value);

        // Create a new product object
        const newProduct = {
          title: title,
          image: defaultImage, // Utilisation de l'image par défaut
          description: description,
          key_feature: key_feature,
          prix: prix
        };

        // Votre appel de service pour ajouter le produit à la base de données
        this.prodService.addProduct(newProduct).subscribe(
          (data:any) => {
            console.log(data);

            }
        );
        Swal.fire({
          title: 'Success!',
          text: 'Product add successfully.',
          icon: 'success',
        });
        this.refresh();

        console.log('New Product:', newProduct);
      }
    });
  }


  editProduct(productId: string, updatedProduct: any) {
    Swal.fire({
      title: 'Edit Product',
      html:
        '<input id="title" class="swal2-input" value="' + updatedProduct.title + '">' +
//        '<input id="image" class="swal2-input" placeholder="Image URL" value="default_image.jpg">' + // Image par défaut
        '<textarea id="description" class="swal2-textarea">' + updatedProduct.description + '</textarea>' +
        '<input id="key_feature" class="swal2-input" value="' + updatedProduct.key_feature + '">' +
        '<input id="prix" type="number" step="0.01" class="swal2-input" value="' + updatedProduct.prix + '">'
      ,
      focusConfirm: false,
      preConfirm: () => {
        const title = (document.getElementById('title') as HTMLInputElement).value;
       // const image = (document.getElementById('image') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLTextAreaElement).value;
        const key_feature = (document.getElementById('key_feature') as HTMLInputElement).value;
        const prix = parseFloat((document.getElementById('prix') as HTMLInputElement).value);

        // Check if any field is left empty
        if (!title || !description || !key_feature || isNaN(prix)) {
          Swal.showValidationMessage('All fields are required and price must be a valid number.');
          return;
        }

        const updatedData = {
          title: title,
         // image: image,
          description: description,
          key_feature: key_feature,
          prix: prix
        };

        // Send the updated product details to the API endpoint
        this.prodService.editProduct(productId, updatedData).subscribe(
          (data: any) => {
            console.log('Product Updated:', data);
            Swal.fire({
              title: 'Success!',
              text: 'Product updated successfully.',
              icon: 'success',
            });
            this.refresh();

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
           // this.refreshProductList();
          this.refresh()
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
