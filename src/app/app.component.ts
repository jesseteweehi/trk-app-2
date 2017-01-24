import { Component, Inject, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'trk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	displayName: string;
  	private subscription: Subscription;

  	constructor(public af: AngularFire, @Inject(FirebaseAuth) public auth: FirebaseAuth) {

  		this.subscription = auth.subscribe(item => this.displayName = item.google.displayName) 

  	}

  	login() {
    	this.af.auth.login();
  	}

  	logout() {
	    this.af.auth.logout();
	}

	ngOnDestroy() {
	    this.subscription.unsubscribe();

	}
}
