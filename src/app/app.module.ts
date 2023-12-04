import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import { UserComponent } from './user/user.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { GetAllComponent } from './get-all/get-all.component';
import { LoginComponent } from './login/login.component';
import {ToastrModule} from "ngx-toastr";
import { DashboardUserComponent } from './user/dashboard-user/dashboard-user.component';
import { FooterUserComponent } from './user/footer-user/footer-user.component';
import { HeaderUserComponent } from './user/header-user/header-user.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import { HomebaseComponent } from './homebase/homebase.component';
import { DashboardAdminComponent } from './user/dashboard-admin/dashboard-admin.component';
import { UserListComponent } from './user/dashboard-admin/user-list/user-list.component';
import { PanelListComponent } from './user/dashboard-admin/panel-list/panel-list.component';
import { ForTestComponent } from './for-test/for-test.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    UserComponent,
    GetAllComponent,
    LoginComponent,
    DashboardUserComponent,
    FooterUserComponent,
    HeaderUserComponent,
    HomebaseComponent,
    DashboardAdminComponent,
    UserListComponent,
    PanelListComponent,
    ForTestComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // Required for animations
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
