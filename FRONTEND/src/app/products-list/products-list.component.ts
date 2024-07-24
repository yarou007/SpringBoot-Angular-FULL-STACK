import { Component } from '@angular/core';
import { ProductModel } from '../models/product.model';
import {ProductService } from '../services/product.service';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

 products! : ProductModel[];

 constructor(private productService : ProductService, private route : Router, public authService : AuthService){
      this.productService.productList().subscribe( p => {
             console.log(p);
          this.products = p ;
          });
 // this.products = productService.productList();
 }

 deleteProduct(product : ProductModel){
    let message = confirm("Are you sure to delete the product?");
    if (message) this.productService.deleteProduct(product.idProduct!).subscribe( () => {
      this.loadProduct();
    });
 }

 loadProduct(){
   this.productService.productList().subscribe( p => {
    this.products = p;
   })
 }
}
