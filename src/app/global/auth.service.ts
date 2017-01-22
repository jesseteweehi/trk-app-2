import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthService {
  
  constructor(public af: AngularFire) {}

  login() {
    this.af.auth.login();
  }

  logout() {
     this.af.auth.logout();
  }
}
