import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FooterComponent } from './navbar-footer/footer/footer.component';
import { HomeComponent } from './home/home.component';
import {MatCardModule} from "@angular/material/card";
import { RegisterComponent } from './form_login/register/register.component';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './form_login/login/login.component';

import {environment} from "../environments/environment.development";
import { UploadAvatarComponent } from './upload/upload-avatar/upload-avatar.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
// import { ChildInputComponent } from './input-output/@Input/child-input/child-input.component';
// import { DadInputComponent } from './input-output/@Input/dad-input/dad-input.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
// import { ChildOutputComponent } from './input-output/@output/child-output/child-output.component';
// import { DadOutputComponent } from './input-output/@output/dad-output/dad-output.component';
import { ChangeAvatarComponent } from './form_login/change-avatar/change-avatar.component';
import {AuthInterceptor} from "./service/auth.interceptor";
import { ListCategoryComponent } from './content/category/list-category/list-category.component';
import { CreateCategoryComponent } from './content/category/create-category/create-category.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { UpdateCategoryComponent } from './content/category/update-category/update-category.component';
import { DeleteCategoryComponent } from './content/category/delete-category/delete-category.component';
import { PageCategoryComponent } from './content/category/page-category/page-category.component';
import { UploadFileComponent } from './upload/upload-file/upload-file.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
// import { PageSongComponent } from './content/song/page-song/page-song.component';
// import { CreateSongComponent } from './content/song/create-song/create-song.component';
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {NavbarComponent} from "./navbar-footer/navbar/navbar.component";
import {MatMenuModule} from "@angular/material/menu";
import { CreateSingerComponent } from './content/singer/create-singer/create-singer.component';
import { PageSingerComponent } from './content/singer/page-singer/page-singer.component';
import { PageSongComponent } from './content/song/page-song/page-song.component';
import { CreateSongComponent } from './content/song/create-song/create-song.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UploadAvatarComponent,
    // ChildInputComponent,
    // DadInputComponent,
    // ChildOutputComponent,
    // DadOutputComponent,
    ChangeAvatarComponent,
    ListCategoryComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
    PageCategoryComponent,
    UploadFileComponent,
    CreateSingerComponent,
    PageSingerComponent,
    PageSongComponent,
    CreateSongComponent,
    // PageSongComponent,
    // CreateSongComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
