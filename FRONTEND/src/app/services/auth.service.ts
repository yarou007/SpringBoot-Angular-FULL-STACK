import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.models';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private helper : JwtHelperService = new JwtHelperService();
   token! : string ;


  // users : UserModel[]= [
  //   {username :  "admin" , password : "123",roles : ['ADMIN', 'CREATE']},
  //   {username :  "cashier" , password : "123",roles : ['CASHIER','CREATE']},
  //   {username :  "accountant" , password : "123",roles : ['USER']},
  // ];
  public loggedUser! :  string ;
  public isLoggedIn : Boolean = false;
  public roles! : string[];

  constructor(private router : Router, private httpClient : HttpClient) { 
 
  }
  
  // SignIn(user : UserModel){
  //       let validUser  = false;
  //       this.users.forEach(u => {
  //             if(user.username==u.username && user.password==u.password)
  //               {
  //                 validUser=true;
  //                 this.loggedUser = u.username!
  //                 this.isLoggedIn= true;
  //                 this.roles = u.roles!;
  //                 localStorage.setItem('loggedUser',this.loggedUser);
  //                 localStorage.setItem('isLoggedIn',String(this.isLoggedIn));
  //               }  
  //       })
  //       return validUser; 
  // }

  login(user : UserModel){
    return this.httpClient.post<UserModel>('http://localhost:8080/login',user,{observe:'response'});
  }
  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isLoggedIn = true;
    this.decodeJWT();
}
getToken() {
  return localStorage.getItem('jwt');
}
  
decodeJWT() {
  if (this.token) {
      const decodedToken = this.helper.decodeToken(this.token);
      this.roles = decodedToken.roles;
      this.loggedUser = decodedToken.sub;
  }
}


  isCreate(){
    if(!this.roles){
      return false;
    }
    return (this.roles.indexOf('CREATE')>-1);
  }
  isAdmin(){
    if(!this.roles){
      return false;
    }
    return (this.roles.indexOf('ADMIN')>-1);
  }

  logout(){
    console.log("AuthService logout function called");
    this.loggedUser = undefined!;
    this.isLoggedIn = false;
    this.roles = [];
    this.token = null!;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  setLoggedUserLS(login : string){
           this.loggedUser = login;
           this.isLoggedIn = true;
     }
     

  // getRoles(username : string ){
  //   this.users.forEach(u => {
  //     if (u.username == username){
  //       this.roles = u.roles!;
  //     }
  //   })
  // }
  loadToken() {
    this.token = this.getToken()!;
    if (this.token) {
      this.decodeJWT();
    }
  }

  isTokenExpired(): boolean {
    return this.token ? this.helper.isTokenExpired(this.token) : true;
  }
}
