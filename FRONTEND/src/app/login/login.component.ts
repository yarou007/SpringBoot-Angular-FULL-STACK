import { Component } from '@angular/core';
import { UserModel } from '../models/user.models';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = new UserModel();
  error : number = 0;

  constructor(private authService : AuthService, private route : Router){

  }



  onLoggedin(){
   // console.log(this.user);
  //  let isValidUser : Boolean = this.authService.SignIn(this.user);
  //  if (isValidUser) {
  //   this.route.navigate(['products-list']);
  //  }
  //  else this.error = 1;
  // }
  this.authService.login(this.user).subscribe({
    next: (data) => {
        let jwtToken = data.headers.get("Authorization");
        if (jwtToken) {
            this.authService.saveToken(jwtToken);
            this.route.navigate(['/']);
        } else {
            this.error = 1;
        }
    },
    error: (err) => {
        console.error(err);
        this.error = 1;
    }
});
  }
}
