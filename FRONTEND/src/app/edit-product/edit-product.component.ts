import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from '../models/category.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  currentProduct = new ProductModel();
  categories! :  CategoryModel[];
  newCategory! : CategoryModel; 
  newCategoryId! : number;
  constructor(private productService : ProductService , private activatedRoute : ActivatedRoute, private route : Router){
   // this.categories = this.productService.CategoriesList();

  }
  ngOnInit(): void {
    //console.log(this.activatedRoute.snapshot.params['id']);
    this.productService.CategoriesList().subscribe(c => {
      this.categories = c;
    })
    this.productService.editProduct(this.activatedRoute.snapshot.params['id']).subscribe(  p => {
           this.currentProduct = p;
           this.newCategoryId = this.currentProduct.category?.idCategory!;
    });
  }

  updateProduct(){
    this.currentProduct.category = this.categories.find(c => c.idCategory==this.newCategoryId);
    this.productService.updateProduct(this.currentProduct).subscribe(p => {
      this.route.navigate(['/products-list']);

    })

  }
}
