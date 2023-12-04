import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoginService} from "../../login/login.service";
import {ProductsService} from "../../homebase/products.service";
import Swal from 'sweetalert2';
import {PanelService} from "./panel.service";
import {interval, Observable, Subscription} from "rxjs";
import {BankService} from "./bank.service";
import {Bank} from "./bank";
import {HttpClient} from "@angular/common/http";
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {ProfilService} from "./profil.service";

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  cardNumbersBanque: any[] = [];
  soldesBanque: any[] = [];

  user: any = {};
  name: string | null = null;
  imgSrc: string | null = null;

  product!:any
  panier:any = {};
  _id:any
  email : string |null = null
  public userId!: string | null;
  public filteredPanier: any[] = [];
public p: any
  public a!: string
  public b!: string

  showProduct: boolean = true;
  showPanel: boolean = false;

  constructor(
    public authService: LoginService,
    public prodservice: ProductsService,
    public panel: PanelService,
    public bank : BankService,
    public http : HttpClient,
    public loginServ : LoginService,
    public profil: ProfilService,
    private cdr: ChangeDetectorRef

  ) {}
  private updateSubscription!: Subscription;

  refresh(): void {
    setTimeout(() => {
      window.location.reload();
    }, 3000);  }

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
  //  this.updateSubscription = interval(3000).subscribe(
  //    (val) => { this.panier});
    this.cdr.detectChanges();  // Detect changes to trigger a reload

 //   this.updateUserImage()
   // this.updateUser()
   // this.addToPanel(this.a,this.b)
  //  this.deletePanel(this.p)
    const imageBase64 = this.loginServ.getImage();
    if (imageBase64) {
      this.imgSrc = `data:image;base64,${imageBase64}`; // Set imgSrc directly with the Base64 string
    }
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    this.bank.getBank().subscribe(
      (data: any[]) => {
        console.log('data bank', data);
        if (data && data.length > 0) {
          this.cardNumbersBanque = data.map(item => item.cardNumber);
          this.soldesBanque = data.map(item => item.solde);
          console.log('cardNumbers:', this.cardNumbersBanque);
          console.log('soldes:', this.soldesBanque);
        } else {
          console.error('Bank data is empty or invalid.');
          // Handle the situation where bank data is empty or invalid
        }
      },
      (error: any) => {
        console.error('Error fetching bank data:', error);
        // Handle the error, e.g., show an error message
      }
    );

    this.userId = this.authService.getId();
    if (this.userId) {
      this.panel.getPanier().subscribe(
        (data: any[]) => {
          this.panier = data;
          this.filteredPanier = this.panier.filter((item: any) => item.user === this.userId);
          this.prodservice.getProducts().subscribe(
            (products: any[]) => {
              this.product = products;

              this.filteredPanier.forEach((item: any) => {
                const productInCart = this.product.find((prod: any) => prod._id === item.product);
                if (productInCart) {
                  item.productDetails = productInCart;
                  item.productPrice = productInCart.prix;
                }
              });

              console.log('Filtered Panier with Product Details:', this.filteredPanier);
            },
            (error: any) => {
              console.error('Error fetching Products:', error);
            }
          );
        },
        (error: any) => {
          console.error('Error fetching Filtered Panier:', error);
        }
      );
    } else {
      console.error('User ID not found in local storage.');
    }

    this.prodservice.getProducts().subscribe(
      (data: any[]) => {
        this.product = data;
        console.log('Products fetched successfully:', this.product);
      },
      (error: any) => {
        console.error('Error fetching Products:', error);
      }
    );
  const token = this.authService.getToken();
    this.name = this.authService.getName();
    this.email = this.authService.getmail();
    this._id =this.authService.getId()
    //   if (this.authService.TokenIsExpired(token)) {
    //     this.authService.removeToken();
    // Gérer l'expiration du token
//    } else {
//      this.user = this.authService.getUserName();
//    }

  }

  deletePanel(panelId: string) {
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
        this.panel.deletePanel(panelId).subscribe(
          () => {
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            // Optionally, update the product list after deletion
           this.refreshPanelList();
            this.cdr.detectChanges();  // Detect changes to trigger a reload

          },
          (error) => {
            console.error('Error deleting product:', error);
            Swal.fire('Error!', 'Failed to delete the product.', 'error');
          }
        );
      }
    });
  }
  refreshPanelList() {
    // Fetch the updated product list after deletion
    this.panel.getPanier().subscribe(
      (data: any) => {
        console.log(data);
        this.refresh(); // Refresh the page after updating the panel list

      }
    );
  }

  addToPanel(userId: string, productId: string) {
    // Afficher une alerte avec les ID dans les deux premiers champs d'entrée
    Swal.fire({
      title: 'Add to your panel',
      html:
        `<input id="swal-input1"  class="swal2-input" style="display: none;" value="${userId}">` +
        `<input id="swal-input2" class="swal2-input" style="display: none;" value="${productId}">` +
        `<input id="swal-input3" type="number" aria-placeholder="number months" class="swal2-input" placeholder="Number of months">` +
        `<input id="swal-input4" type="password" class="swal2-input" placeholder="card number Iban">`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value,
          (<HTMLInputElement>document.getElementById('swal-input3')).value,
          (<HTMLInputElement>document.getElementById('swal-input4')).value
        ];
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const [userId, productId, value3, value4] = result.value;
        console.log('ID de l\'utilisateur:', userId);
        console.log('ID du produit:', productId);
        console.log('Nouvel input 1:', value3);
        console.log('Nouvel input 2:', value4);

        // Vérifier si la carte bancaire saisie est valide
        const cardExists = this.cardNumbersBanque.includes(value4);
        this.cdr.detectChanges();  // Detect changes to trigger a reload

        if (!cardExists) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'invalide card.'
          });
          return; // Arrêter l'ajout au panneau si la carte n'est pas valide
        }

        // Appeler la fonction savePanel() avec les données du panneau
        const panelData = {
          user: userId, // Inclure l'ID de l'utilisateur
          product: productId, // Inclure l'ID du produit
          number_months: value3,
          cardNumber: value4
        };
        this.savePanel(panelData);
        this.cdr.detectChanges();  // Detect changes to trigger a reload

//        this.refreshPanelList();

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Add with success!'
        });

      }
    });
  }

  savePanel(panel: any) {
    this.panel.savePanel(panel).subscribe(
      (data: any) => {
        // Gérer la réussite de l'enregistrement
        console.log('Panel saved successfully:', data);
        this.refreshPanelList();
        this.cdr.detectChanges();  // Detect changes to trigger a reload

        // Vous pouvez effectuer d'autres actions ici si nécessaire
      },
      (error: any) => {
        // Gérer les erreurs lors de l'enregistrement
        console.error('Error saving panel:', error);
        // Vous pouvez effectuer d'autres actions ici si nécessaire
      }
    );
  }
  logout() {
    this.authService.logout();
  }

  private prix : any
  getPrix(productId: string) {
    // Utilisez votre service pour récupérer les détails du produit
    this.prodservice.getProductById(productId).subscribe(
      (data: any) => {
        // Manipulez les détails du produit ici
        console.log('Product details:', data);
        // Vous pouvez attribuer la description à une propriété pour l'afficher dans votre HTML
        // Par exemple, si vous avez une propriété 'productDescription' dans votre composant
        this.prix = data.prix;
      },
      (error: any) => {
        console.error('Error fetching product details:', error);
      }
    );

  }
  paymentSuccess: boolean = false;

    payedBank(cardNumber: string) {
    // Vérifier si la carte bancaire saisie est valide
    const cardExists = this.cardNumbersBanque.includes(cardNumber);
    if (!cardExists) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'La carte bancaire saisie n\'est pas valide.'
      });
      return; // Arrêter le processus si la carte n'est pas valide
    }

    // Obtenir l'indice de la carte dans le tableau des cartes
    const cardIndex = this.cardNumbersBanque.findIndex((card) => card === cardNumber);
    const solde = this.soldesBanque[cardIndex];

    // Récupérer le produit sélectionné pour l'achat
    const selectedProduct = this.filteredPanier.find((item: any) => item.cardNumber === cardNumber);

    // Vérifier si le solde est suffisant
    if (selectedProduct && selectedProduct.productPrice && solde >= selectedProduct.productPrice) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'payment with success!'
      });
      // Trouver l'index de l'élément réussi dans filteredPanier
      const index = this.filteredPanier.findIndex((item: any) => item.cardNumber === cardNumber);
      if (index !== -1) {
        // Mettre à jour la propriété paymentSuccess pour cet élément
        this.filteredPanier[index].paymentSuccess = true;
      }
      // Mettre à jour le solde dans la banque
      const newSolde = solde - selectedProduct.productPrice;
      //http://54.174.207.177:3000/bank/
      // Effectuer une requête HTTP PUT pour mettre à jour le solde dans la banque
      this.http.put(`http://3.92.31.108:3000/bank/${cardNumber}`, { solde: newSolde })
        .subscribe(
          (response) => {
            console.log('Solde updated with bank:', response);
            // Ajouter d'autres actions si nécessaire après la mise à jour du solde
          },
          (error) => {
            console.error('Erreur updated solde with bank:', error);
            // Gérer les erreurs ici, comme afficher une alerte à l'utilisateur
          }
        );
    } else {
      // Afficher une alerte que le solde n'est pas suffisant
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'the solde card \' has error .'
      });
    }
  }
  printSelectedSubscription(item: any) {
    const currentDate = new Date();
    const subscriptionEndDate = new Date(currentDate);
    subscriptionEndDate.setDate(subscriptionEndDate.getDate() + (item.number_months * 30));

    const documentDefinition = {
      content: [
        { text: 'Your Gym Subscription', style: 'header' },
        ' ',
        {
          columns: [
            {
              width: '*',
              stack: [
                { text: 'Subscription (in days):', bold: true, margin: [0, 20, 0, 0] },
                `${item.number_months * 30} days`,
                { text: 'Card Number:', bold: true, margin: [0, 10, 0, 0] },
                item.cardNumber,
                { text: 'User ID:', bold: true, margin: [0, 10, 0, 0] },
                item.user,
                { text: 'Product Price:', bold: true, margin: [0, 10, 0, 0] },
                item.productPrice || '',
                { text: 'Total:', bold: true, margin: [0, 10, 0, 0] },
                item.productPrice ? `${item.productPrice * item.number_months} $` : '',
                { text: 'Start Date:', bold: true, margin: [0, 10, 0, 0] },
                currentDate.toLocaleString(),
                { text: 'End Date:', bold: true, margin: [0, 10, 0, 0] },
                subscriptionEndDate.toLocaleString(),
              ],
            },
            {
              width: 'auto',
              stack: [
                { image: this.imgSrc as string, width: 100, height: 100, alignment: 'right' },
              ],
            },
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
      },
    };

    // Generate PDF for the selected item
    const pdfDoc = (pdfMake as any).createPdf(documentDefinition);
    pdfDoc.download('selected_subscription.pdf');
  }

  showCart: boolean = false; // Définir la variable pour contrôler l'affichage du panier
  toggleProductVisibility() {
    this.showProduct = true;
    this.showPanel = false;
  }

  togglePanelVisibility() {
    this.showProduct = false;
    this.showPanel = true;
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
                this.refreshPanelList();

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

}


