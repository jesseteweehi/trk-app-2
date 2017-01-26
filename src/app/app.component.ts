import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs/Rx'
// import { AuthService}  from  './global/security/auth.service'
// import { AuthInfoModel } from './global/security/auth-info'


@Component({
  selector: 'trk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    authentication: FirebaseAuthState;

  	constructor(private af: AngularFire) {
  	}

    ngOnInit(){

        this.af.auth.subscribe(auth => this.authentication = auth)
    }

  	login() {
        this.af.auth.login();
  	}

  	logout() {
	    this.af.auth.logout();
	}

}
