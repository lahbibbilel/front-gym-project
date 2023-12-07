import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {GetAllComponent} from "./get-all/get-all.component";
import {LoginComponent} from "./login/login.component";
import {DashboardUserComponent} from "./user/dashboard-user/dashboard-user.component";
import {GuardGuard} from "./guard.guard";
import {HomebaseComponent} from "./homebase/homebase.component";
import {DashboardAdminComponent} from "./user/dashboard-admin/dashboard-admin.component";
import {UserListComponent} from "./user/dashboard-admin/user-list/user-list.component";
import {PanelListComponent} from "./user/dashboard-admin/panel-list/panel-list.component";
import {ForTestComponent} from "./for-test/for-test.component";

const routes: Routes = [
  { path: '', component: HomebaseComponent },
  {path:'user',component:UserComponent},
  {path:'user/login',component:LoginComponent},
  {path:'user/dashboardUser',component:DashboardUserComponent,canActivate:[GuardGuard]},
  {path:'homebase',component:HomebaseComponent},
  {path:'user/dashboardAdmin',component:DashboardAdminComponent,canActivate:[GuardGuard]},
  {path:'user/dashboardAdmin/userList',component:UserListComponent,canActivate:[GuardGuard]},
  {path:'user/dashboardAdmin/panel',component:PanelListComponent,canActivate:[GuardGuard]},
{path:'testing',component:ForTestComponent},
  {path:'user/getAll',component:GetAllComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
