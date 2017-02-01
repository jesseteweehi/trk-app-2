import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef } from "angularfire2";
import { Observable, Subject} from "rxjs/Rx";
import { MilestoneModel } from './milestone'
import { firebaseConfig } from '../app.module'
import {Http} from "@angular/http";

@Injectable()
export class MilestoneService {

  	sdkDb:any;

    constructor(private af:AngularFire, @Inject(FirebaseRef) fb, private http:Http) {

        this.sdkDb = fb.database().ref();

    }

    findMilestoneForLearningExperience(org:string, auth: string, lExperienceKey: string): Observable<MilestoneModel[]> {
	  	
   
	  	return this.af.database.list(`users/${auth}/organisations/${org}/${lExperienceKey}`)
	  		.map(MilestoneModel.fromJsonList);

  	}

  	createMilestoneForLearningExperience(org: string, auth:string, lExperienceKey: string , MilestoneModel:any): Observable<any> {

  		const milestoneToSave = Object.assign({}, MilestoneModel);

  		const newMilestoneKey = this.sdkDb.child(`users/${auth}/organisations/${org}/${lExperienceKey}`).push().key;

  		let dataToSave = {};

  		dataToSave[`users/${auth}/organisations/${org}/milestones/${lExperienceKey}/${newMilestoneKey}`] = milestoneToSave

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

    deleteMilestone(org:string, auth:string, learningExperienceID:string, milestoneID:string): Observable<any> {

        const url = firebaseConfig.databaseURL + '/users/' + auth + '/organisations/' + org + '/milestones/' + learningExperienceID +'/'+ milestoneID + '.json';

        return this.http.delete(url);
    }



}
