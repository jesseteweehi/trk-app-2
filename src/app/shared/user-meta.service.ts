import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";
import { Observable, Subject } from "rxjs/Rx";
import { firebaseConfig } from '../app.module'
import {Http} from "@angular/http";
import { UserModel } from './user'

@Injectable()
export class UserMetaService {

   	sdkDb:any;

  	constructor(private af:AngularFire, 
  				@Inject(FirebaseRef) fb, 
  				private http:Http) {

  	    this.sdkDb = fb.database().ref();

  	}

  	findMembersForOrganisation(auth:string, organisationKey: string ): Observable<UserModel[]> {

      const user$ = this.af.database.list(`organisations/${organisationKey}/members`);

      return user$
      .map(usersperorg => usersperorg
      .map(userperorg => this.af.database.object(`users/${userperorg.$key}/metadata`)))
      .flatMap(fbojs => Observable.combineLatest(fbojs));
         
    }

}
