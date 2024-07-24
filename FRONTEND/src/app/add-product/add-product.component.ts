import { Component } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { CategoryModel } from '../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  newProduct = new ProductModel();
  categories! :  CategoryModel[];
  newCategory! : CategoryModel; 
  newCategoryId! : number;


  constructor(private productService : ProductService, private route : Router){

    this.productService.CategoriesList().subscribe(c => {
      this.categories = c;
    })
   // this.categories = this.productService.CategoriesList();
  }

  addProduct(){
    this.newProduct.category = this.categories.find(c=>  c.idCategory == this.newCategoryId )
      this.productService.addProduct(this.newProduct).subscribe( p => {
               this.route.navigate(['products-list'])
      })

    // this.newCategory =  this.productService.editCategory(this.newCategoryId);
    // this.newProduct.category = this.newCategory;
    // this.productService.addProduct(this.newProduct);
    // this.route.navigate(['/products-list']);
  }

  
}
