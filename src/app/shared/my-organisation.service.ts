import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef } from "angularfire2";
import { Observable, Subject} from "rxjs/Rx";
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



    findOrganisationByCode(code:string): Observable<OrganisationModel> {

        const path = `organisations`;

        return this.af.database.list(path, {
            query: {
                orderByChild: 'code',
                equalTo: code
            }
        })
        .filter(results => results && results.length > 0)
        .map(results => OrganisationModel.fromJson(results[0]))        
    }

    // findLessonByUrl(url:string):Observable<Lesson> {
    //     return this.db.list('lessons', {
    //         query: {
    //             orderByChild: 'url',
    //             equalTo: url
    //         }
    //     })
    //     .filter(results => results && results.length > 0)
    //     .map(results => Lesson.fromJson(results[0]))
    //     .do(console.log);
    // }

  	findOrganisationsForUser(auth:string): Observable<OrganisationModel[]> {

  		const path = `users/${auth}/myorganisations`

  		return this.af.database.list(path)
  			.map(OrganisationModel.fromJsonList)
  	
  	}

    joinOrganisationByCode(auth: string, code:string) {
        const path = `users/${auth}/myorganisations`

        const dataToSave = this.af.database.object(path)

        console.log(dataToSave)

        this.findOrganisationByCode(code)
            .subscribe(organisation => {
                if (organisation) {
                    return dataToSave.set(organisation)
                }
            })
    }

  	createOrganisationForUser(auth:string, OrganisationModel: any) : Observable<any> {
  		
  		const path = `users/${auth}/myorganisations`

        const newOrgKey = this.sdkDb.child(path).push().key;		
  	
  		const orgToSave = Object.assign({'orgkey': newOrgKey}, OrganisationModel);

  		let dataToSave = {};

  		dataToSave[path + '/' + newOrgKey] = orgToSave
  		dataToSave[`organisations/` + newOrgKey + '/metadata'] = orgToSave
  		dataToSave[`organisations/` + newOrgKey + `/owner/${auth}`] = true
  		dataToSave[`organisations/` + newOrgKey + `/admin/${auth}`] = true
  		dataToSave[`organisations/` + newOrgKey + `/teacher/${auth}`] = true
  		dataToSave[`organisations/` + newOrgKey + `/members/${auth}`] = true

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
