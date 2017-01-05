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

    findMilestoneForLearningExperience(lExperienceKey: string): Observable<MilestoneModel[]> {
	  	
	  	return this.af.database.list(`milestones/${lExperienceKey}`)
	  		.do(console.log)
	  		.map(MilestoneModel.fromJsonList);

  	}

  	createMilestoneForLearningExperience(lExperienceKey: string , MilestoneModel:any): Observable<any> {

  		const milestoneToSave = Object.assign({}, MilestoneModel);

  		const newMilestoneKey = this.sdkDb.child(`milestones/${lExperienceKey}`).push().key;

  		let dataToSave = {};

  		dataToSave[`milestones/${lExperienceKey}/${newMilestoneKey}`] = milestoneToSave

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

    deleteMilestone(learningExperienceID:string, milestoneID:string): Observable<any> {

        const url = firebaseConfig.databaseURL + '/milestones/' + learningExperienceID +'/'+ milestoneID + '.json';

        return this.http.delete(url);
    }



}
