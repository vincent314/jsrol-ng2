import {Injectable} from '@angular/core';
import {FirebaseAuth, FirebaseAuthState} from 'angularfire2';
@Injectable()
export class AuthService {
  redirectUrl: string;

  constructor(public firebaseAuth$: FirebaseAuth) {
    firebaseAuth$.subscribe((state: FirebaseAuthState) => {
      this.storeUser(state);
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  login(email, password) {
    return this.firebaseAuth$.login({
      email: email,
      password: password
    }).then((state: FirebaseAuthState)=> {
      console.log("LOGIN: ",state.auth);
      this.storeUser(state);
    });
  }

  logout() {
    return this.firebaseAuth$.logout();
  }

  private storeUser(state:FirebaseAuthState):void{
    if(state) {
      localStorage.setItem('user', JSON.stringify(state.auth));
    } else {
      localStorage.clear();
    }
  }
}