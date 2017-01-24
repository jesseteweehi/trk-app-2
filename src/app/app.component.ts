import { Component, Inject, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'trk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  	constructor(public af: AngularFire, @Inject(FirebaseAuth) public auth: FirebaseAuth) {

  	}

  	login() {
    	this.af.auth.login();
  	}

  	logout() {
	    this.af.auth.logout();
	}

}
