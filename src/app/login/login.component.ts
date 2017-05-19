import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {FirebaseAuthState} from 'angularfire2';
import 'material-design-lite/material.js';
import {MdlSnackbarService} from '@angular-mdl/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'login',
  styleUrls: ['./login.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent /*implements OnInit*/ {
  email:string;
  password:string;

  constructor(private authService: AuthService, public router: Router, private fb: FormBuilder,
              private snackbarService: MdlSnackbarService, private translate: TranslateService) {

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

  doReset(){
    if(this.email) {
      this.authService.resetPassword(this.email)
        .then(()=>{
          this.snackbarService.showToast(this.translate.instant("ADMIN.LOGIN.EMAIL_SENT"));
        })
        .catch((e)=>{
          console.error(e.message);
          this.snackbarService.showToast(this.translate.instant("ADMIN.LOGIN.ERROR"));
        });
    } else {
      this.snackbarService.showToast(this.translate.instant("ADMIN.LOGIN.NO_EMAIL"));
    }
  }
}
