import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldComponent } from './field/field.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DocumentsPageComponent } from './documents-page/documents-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path: "login", component: LoginPageComponent},
  {path: "documents", component: DocumentsPageComponent},
  {path: "home", component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
