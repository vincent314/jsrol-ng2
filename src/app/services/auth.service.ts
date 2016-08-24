import {Injectable} from '@angular/core';
import {FirebaseAuth} from 'angularfire2';
@Injectable()
export class AuthService {
    redirectUrl: string;
    user:firebase.User;

    constructor(public firebaseAuth$: FirebaseAuth) {
        // this.user$ = firebaseAuth.map((data) => (data) ? data.auth : null);
        // firebaseAuth.subscribe((value) => {
        //     this.isLoggedIn = !!value;
        // });
    }

    isLoggedIn():FirebaseAuth {
        return this.firebaseAuth$;
    }

    login(email,password) {
        return this.firebaseAuth$.login({
            email:email,
            password:password
        });
    }

    logout() {
        return this.firebaseAuth$.logout();
    }
}