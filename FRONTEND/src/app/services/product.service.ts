import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { AuthService } from './auth.service';


const httpOptions = {
  headers : new HttpHeaders({
    'content-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  jwt: string = "Bearer "+this.authService.getToken();
  httHeaders = new HttpHeaders({"Authorization":this.jwt}); 

  products : ProductModel[];
  product! : ProductModel;
  categories : CategoryModel[];
  category! : CategoryModel;

  constructor(private http : HttpClient,private authService: AuthService){
  this.categories =  []
    this.products= [ ];
  }

  productList(){
    return this.http.get<ProductModel[]>(apiURL+"/products",{headers:this.httHeaders});
  }
  addProduct(newProduct : ProductModel){
     return this.http.post<ProductModel[]>(apiURL+"/products/save",newProduct,{headers:this.httHeaders});
    //this.products.push(newProduct);
  }
  deleteProduct(idProduct : number){

     return this.http.delete(apiURL+"/products/"+idProduct,{headers:this.httHeaders});
  }
  editProduct(id : number){   ///products/update
    return this.http.get<ProductModel>(`${apiURL+"/products"}/${id}`,{headers:this.httHeaders});

  }
  updateProduct(product : ProductModel){
   // this.deleteProduct(product);
   // this.addProduct(product);
    return this.http.put<ProductModel>(apiURL+"/products/update",product,{headers:this.httHeaders});
     // this.sortProduct();
  }

  
  CategoriesList(){
    return this.http.get<CategoryModel[]>(apiURL+"/categories",{headers:this.httHeaders});
  }
  editCategory(id : number){
    this.category =  this.categories.find( c => c.idCategory == id,{headers:this.httHeaders})!;
    return this.category;
  }

}
