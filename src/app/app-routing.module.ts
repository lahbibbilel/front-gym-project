import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {GetAllComponent} from "./get-all/get-all.component";
import {LoginComponent} from "./login/login.component";
import {DashboardUserComponent} from "./user/dashboard-user/dashboard-user.component";
import {GuardGuard} from "./guard.guard";
import {HomebaseComponent} from "./homebase/homebase.component";

const routes: Routes = [
  { path: '', component: HomebaseComponent },
  {path:'user',component:UserComponent},
  {path:'user/getAll',component:GetAllComponent},
  {path:'user/login',component:LoginComponent},
  {path:'user/dashboardUser',component:DashboardUserComponent,canActivate:[GuardGuard]},
  {path:'homebase',component:HomebaseComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
