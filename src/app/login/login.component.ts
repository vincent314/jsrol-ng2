import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FirebaseAuthState} from 'angularfire2';
import 'material-design-lite/material.js';

@Component({
    selector: 'login',
    styles: [require('./login.scss')],
    template: `
<div mdl id="login-container">
    <div id="login-card" class="mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Connexion</h2>
      </div>
      <div class="mdl-card__supporting-text">
        <form [formGroup]="loginForm" (submit)="doLogin($event)" action="#">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" name="email" formControlName="email">
                <label class="mdl-textfield__label" for="email">Email</label>
              </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="password" name="password" formControlName="password">
                <label class="mdl-textfield__label" for="email">Mot de passe</label>
              </div>
            <button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Connexion
            </button>
        </form>
      </div>
    </div>
</div>
`
})
export class LoginComponent /*implements OnInit*/ {
    loginForm: FormGroup;

    constructor(private authService: AuthService, public router: Router, private fb: FormBuilder) {

    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: '',
            password: ''
        });
    }

    doLogin(event: Event) {
        this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then((authState: FirebaseAuthState)=> {
            console.log(authState);
            const redirect = this.authService.redirectUrl || '/admin/tracks';
            this.router.navigate([redirect]);
        })
            .catch(function (err) {
                console.log(err);
            });
        event.preventDefault();
    }

    doLogout() {
        this.authService.logout();
    }
}
