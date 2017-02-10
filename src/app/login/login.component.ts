import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {FirebaseAuthState} from 'angularfire2';
import 'material-design-lite/material.js';

@Component({
  selector: 'login',
  styles: [require('./login.scss')],
  template: require('./login.component.html')
})
export class LoginComponent /*implements OnInit*/ {
  email:string;
  password:string;

  constructor(private authService: AuthService, public router: Router, private fb: FormBuilder) {

  }

  doLogin() {
    this.authService.login(this.email, this.password).then((authState: FirebaseAuthState) => {
      const redirect = this.authService.redirectUrl || '/admin/tracks';
      this.router.navigate([redirect]);
    })
      .catch(function (err) {
        console.log(err);
      });
  }

  doLogout() {
    this.authService.logout();
  }
}
