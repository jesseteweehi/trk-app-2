import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState }  from "angularfire2"


@Injectable()
export class AuthService {

  auth: FirebaseAuthState

	
  constructor(private af: AngularFire) { 
      this.af.auth.subscribe(auth => this.auth = auth  
      )
    }

  	login() {
      this.af.auth.login()
    }

  	logout() {
  		this.af.auth.logout();
  	}

}
