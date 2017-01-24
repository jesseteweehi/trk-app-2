import { Component, Inject } from '@angular/core';
import {FirebaseAuth} from 'angularfire2';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'trk-auth-status',
  template: `
      <span *ngIf="auth | async"> Logged in as {{displayName}} </span>
      <span *ngIf="!(auth | async)">Please log in</span>
    `,
  styles: [`
    .img-circle {
        border-radius: 50%;
    }
  `],
})
export class AuthStatusComponent {
  displayName: string;
  photoURL: string
  private subscription: Subscription;

  constructor (@Inject(FirebaseAuth) public auth: FirebaseAuth) {

  	this.subscription = auth.subscribe(item => this.displayName = item.google.displayName) 

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

}




