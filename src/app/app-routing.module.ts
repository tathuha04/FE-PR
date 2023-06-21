import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./form_login/register/register.component";
import {LoginComponent} from "./form_login/login/login.component";
import {ChangeAvatarComponent} from "./form_login/change-avatar/change-avatar.component";
import {PageCategoryComponent} from "./content/category/page-category/page-category.component";
import {CreateCategoryComponent} from "./content/category/create-category/create-category.component";
import {CreateSingerComponent} from "./content/singer/create-singer/create-singer.component";
import {PageSingerComponent} from "./content/singer/page-singer/page-singer.component";
import {PageSongComponent} from "./content/song/page-song/page-song.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register' ,component: RegisterComponent},
  {path: 'login' ,component:LoginComponent},
  {path:'change-avatar',component:ChangeAvatarComponent},

  {path:'category',component:PageCategoryComponent},
  {path:'create-category',component:CreateCategoryComponent},

  {path:'singer',component:PageSingerComponent},
  {path:'create-singer',component:CreateSingerComponent},

  {path:'song',component:PageSongComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
