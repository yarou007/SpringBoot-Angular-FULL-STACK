import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 's09';

  constructor(public authService : AuthService, private router : Router){
    // let loggedUser : string;
    // let isLoggedIn : string ;
    // loggedUser = localStorage.getItem('loggedUser')!;
    // isLoggedIn = localStorage.getItem('isLoggedIn')!;
    // if(!loggedUser || isLoggedIn == "false"){
    //   this.router.navigate(['login']);
    // }
    // else {
    //   authService.setLoggedUserLS(loggedUser);
    // }
  }

  
  // logout(){
  //   console.log("Logout function called");
  //   this.authService.logout();
  // }
  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
  }
}
