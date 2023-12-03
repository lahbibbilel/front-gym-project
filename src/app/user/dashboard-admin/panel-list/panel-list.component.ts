import { Component, OnInit } from '@angular/core';
import {UserlistService} from "../user-list/userlist.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {PanelService} from "../../dashboard-user/panel.service";
import {ProductService} from "../product.service";
import {ProductsService} from "../../../homebase/products.service";
interface User{
  _id: string,
  name: string,
  username: string,
  lastname: string,
  email: string,
  password: string,
}

interface Product{
_id: string,
  title: string,
  image: string,
  description: string,
  key_feature: string,
  prix: number,
}

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.css']
})
export class PanelListComponent implements OnInit {
  panel: any;
  filteredPanel: any;
  value!: any;
  user!: any[];
  product!: any[];
  userSearch!: User[];
  productSearch!: Product[];

  constructor(
    private panelService: PanelService,
    private prodService: ProductsService,
    private userService: UserlistService,
    private http: HttpClient,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.panelService.getPanier().subscribe(
      (data: any) => {
        console.log("panier", data);
        this.panel = data;
        this.user = [data._id]; // Convert to array
        this.product = [data.product]; // Convert to array
        this.filteredPanel = [...this.panel];

        this.userService.getUserById(this.user).subscribe(
          (userData: User[]) => {
            console.log("user in panier", userData);
            this.userSearch = userData;

            // Perform filtering or other actions after getting user data
            this.filterPanel();
          }
        );

        this.prodService.getProductById(this.product).subscribe(
          (productData: Product[]) => {
            console.log("product in panel", productData);
            this.productSearch = productData;

            // Perform filtering or other actions after getting product data
            this.filterPanel();
          }
        );
      }
    );
  }

  filterPanel() {
    // Ensure both user and product data are available
    if (this.userSearch && this.productSearch) {
      // Implement your filtering logic here or any other actions involving both userSearch and productSearch
      // For example:
      this.filteredPanel.forEach((p: any) => {
        p.userEmail = this.getUserEmail(p.user);
        p.productKeyFeature = this.getProductKeyFeature(p.product);
      });
    }
  }

  getUserEmail(userId: string) {
    const user = this.userSearch.find((u: any) => u._id === userId);
    return user ? user.email : '';
  }


  getProductKeyFeature(productId: string) {
    const product = this.productSearch.find((p: any) => p._id === productId);
    return product ? product.prix : '';
  }
  searchPanels() {
    const query = this.value.toLowerCase();

    if (!query) {
      this.filteredPanel = [...this.panel];
    } else {
      this.filteredPanel = this.panel.filter(
        (p: any) =>
          p.username.toLowerCase().includes(query) ||
          p.name.toLowerCase().includes(query)
      );
    }
  }

  deletePanel(panelId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this panel!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.panelService.deletePanel(panelId).subscribe(
          () => {
            Swal.fire('Deleted!', 'Your panel has been deleted.', 'success');
            this.refreshPanelList();
          },
          (error) => {
            console.error('Error deleting panel:', error);
            Swal.fire('Error!', 'Failed to delete the panel.', 'error');
          }
        );
      }
    });
  }

  refresh(): void {
    setTimeout(() => {
      window.location.reload();
    }, 3000);  }


  refreshPanelList() {
    this.panelService.getPanier().subscribe(
      (data: any) => {
        console.log(data);
        this.panel = data;
        this.refresh()
      }
    );
  }
  // Inside your PanelListComponent


}
