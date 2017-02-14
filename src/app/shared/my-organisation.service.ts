import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";
import { Observable, Subject } from "rxjs/Rx";
import { firebaseConfig } from '../app.module'
import {Http} from "@angular/http";
import { OrganisationModel } from './organisation'

@Injectable()
export class UserOrganisationService {
 
   	sdkDb:any;

  	constructor(private af:AngularFire, 
  				@Inject(FirebaseRef) fb, 
  				private http:Http) {

  	    this.sdkDb = fb.database().ref();

  	}
  
    findOrganisationByCode(code:string): FirebaseListObservable<any> {

        const path = `organisationlist`;

        return this.af.database.list(path, {
            query: {
                orderByChild: 'code',
                equalTo: code,
                limitToFirst: 1,
            }
        })
    }

  	findOrganisationsForUser(auth:string): Observable<OrganisationModel[]> {

  		const userorganisations$ = this.af.database.list(`users/${auth}/myorganisations`);

      return userorganisations$
      .map(orgsperuser => orgsperuser
      .map(orgperuser => this.af.database.object(`organisations/${orgperuser.$key}/metadata`)))
      .flatMap(fbojs => Observable.combineLatest(fbojs));
 		  	
  	}
  

    joinOrganisationByCode(auth: string, code:string) {

      const path = `users/${auth}/myorganisations`

      const orgbycode$ = 
      this.findOrganisationByCode(code)
      .do(console.log)
      .subscribe(
        org => {
          let dataToSave = {};
          dataToSave[path + '/' + org[0].$key] = true
          dataToSave[`organisations/` + org[0].$key + `/members/${auth}`] = true

          return this.firebaseUpdate(dataToSave)
        }
        )
    
    }

    findUsersForOrganisation(auth:string): Observable<OrganisationModel[]> {

      const userorganisations$ = this.af.database.list(`users/${auth}/myorganisations`);

      return userorganisations$
      .map(orgsperuser => orgsperuser
      .map(orgperuser => this.af.database.object(`organisations/${orgperuser.$key}/metadata`)))
      .flatMap(fbojs => Observable.combineLatest(fbojs));
         
    }


  

  	createOrganisationForUser(auth:string, code, OrganisationModel: any) : Observable<any> {
  		
  		const path = `users/${auth}/myorganisations`

      const newOrgKey = this.sdkDb.child(path).push().key;		
  	
  		const orgToSave = Object.assign({'orgkey': newOrgKey}, OrganisationModel);

  		let dataToSave = {};

  		dataToSave[path + '/' + newOrgKey] = true
      dataToSave[`organisations/` + newOrgKey + `/metadata`] = orgToSave
  		dataToSave[`organisations/` + newOrgKey + `/owner/${auth}`] = true
  		dataToSave[`organisations/` + newOrgKey + `/admin/${auth}`] = true
  		dataToSave[`organisations/` + newOrgKey + `/teacher/${auth}`] = true
  		dataToSave[`organisations/` + newOrgKey + `/members/${auth}`] = true
      dataToSave[`organisationlist/` + newOrgKey +'/code'] = code
    
  		return this.firebaseUpdate(dataToSave)

  	}


  	firebaseUpdate(dataToSave) {
  		      
  		const subject = new Subject();

        this.sdkDb.update(dataToSave)
          	.then(
              	val => {
                	subject.next(val);
                  	subject.complete();

              	},
              	err => {
                  	subject.error(err);
                  	subject.complete();
              	}
          	);

      	return subject.asObservable();
  	}

}
