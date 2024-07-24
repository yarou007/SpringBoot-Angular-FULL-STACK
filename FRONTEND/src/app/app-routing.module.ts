import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { productGuard } from './product.guard';
import { AuthGuard } from './auth-guard.guard';

const routes: Routes = [
  {path : "products-list",component:ProductsListComponent,canActivate: [AuthGuard]},
  {path : "add-product",component:AddProductComponent,canActivate :  [productGuard]},
  {path : "edit-product/:id",component:EditProductComponent},
  {path : "login",component:LoginComponent},
  {path : "forbidden",component:ForbiddenComponent},

  {path : "",redirectTo:"products-list", pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
