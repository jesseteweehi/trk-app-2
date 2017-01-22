import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef } from "angularfire2";
import { Observable, Subject} from "rxjs/Rx";
import { firebaseConfig } from '../app.module'
import {Http} from "@angular/http";
import { OrganisationModel } from './organisation'
import { ApprovedUserModel } from './approveduser'

@Injectable()
export class OrganisationService {

  	sdkDb:any;

    constructor(private af:AngularFire, @Inject(FirebaseRef) fb, private http:Http) {

        this.sdkDb = fb.database().ref();

    }

    findAllApprovedUsers(organisationKey: string): Observable<ApprovedUserModel[]> {

        return this.af.database.list(`organisations/${organisationKey}/approvedusers`)
            .map(ApprovedUserModel.fromJsonList);

    }

    createApprovedUserForOrganisation(organisationKey: string, ApprovedUserModel:any): Observable<any> {

        const approvedUserToSave = Object.assign({}, ApprovedUserModel);

        const newApprovedUserKey = this.sdkDb.child(`organisations/${organisationKey}/approvedusers`).push().key;

        let dataToSave = {};

        dataToSave[`organisations/${organisationKey}/approvedusers/${newApprovedUserKey}`] = approvedUserToSave

        return this.firebaseUpdate(dataToSave)
    }

    deleteApprovedUserFromOrganisation(organisationID:string, approveduserID:string): Observable<any> {

        const url = firebaseConfig.databaseURL + '/organisations/' + organisationID + '/approvedusers/'+ approveduserID + '.json';

        return this.http.delete(url);

    }

    findAllOrganisations(): Observable<OrganisationModel[]> {

    	return this.af.database.list('organisations')
    		.map(OrganisationModel.fromJsonList)
    }

    createOrganisation(OrganisationModel:any): Observable<any> {

    	const organisationToSave = Object.assign({}, OrganisationModel);

    	const newOrganisationKey = this.sdkDb.child('organisations').push().key;

    	let dataToSave = {}

    	dataToSave[`organisations/${newOrganisationKey}`] = organisationToSave;

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

    deleteOrganisation(organisationID:string): Observable<any> {

    	const url = firebaseConfig.databaseURL + '/organisations/' + organisationID + '.json';

    	return this.http.delete(url);
    }


}


//Need to Create
// Create Organisation - Meta Data | Done
// Create Allowed Members List
// Create Students List
// Create Teachers List
// Create Skills List