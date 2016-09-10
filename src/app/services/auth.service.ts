import {Injectable} from '@angular/core';
import {FirebaseAuth, FirebaseAuthState} from 'angularfire2';
@Injectable()
export class AuthService {
  redirectUrl: string;
  user: firebase.User;

  constructor(public firebaseAuth$: FirebaseAuth) {
    // this.user$ = firebaseAuth.map((data) => (data) ? data.auth : null);
    firebaseAuth$.subscribe((state: FirebaseAuthState) => {
      this.user = state.auth;
    });
  }

  isLoggedIn(): FirebaseAuth {
    return this.firebaseAuth$;
  }

  login(email, password) {
    return this.firebaseAuth$.login({
      email: email,
      password: password
    }).then((state: FirebaseAuthState)=> {
      console.log("LOGIN: ",state);
      this.user = state.auth;
    });
  }

  logout() {
    return this.firebaseAuth$.logout();
  }
}
