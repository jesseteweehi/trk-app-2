import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef, FirebaseAuthState } from "angularfire2";
import { Observable, Subject} from "rxjs/Rx";
import { LearningExperienceModel } from './learning-experience'
import { firebaseConfig } from '../app.module'
import {Http} from "@angular/http";

@Injectable()
export class LearningExperienceService {

  	sdkDb:any;

    constructor(private af:AngularFire, 
                @Inject(FirebaseRef) fb, 
                private http:Http) {

        this.sdkDb = fb.database().ref();
    }


	findAllLearningExperiences(org:string, auth:string): Observable<LearningExperienceModel[]> {
      
        return this.af.database.list(`users/${auth}/organisations/${org}/learningexperiences`)
	  		.map(LearningExperienceModel.fromJsonList);
  	}

  	createLearningExperience(org:string, auth:string, LearningExperienceModel:any): Observable<any> {
  		
  		const learningExperienceToSave = Object.assign({}, LearningExperienceModel);

  		const newLearningExperienceKey = this.sdkDb.child(`users/${auth}/organisations/${org}/learningexperiences`).push().key;

  		let dataToSave = {};

  		dataToSave[`users/${auth}/organisations/${org}/learningexperiences/${newLearningExperienceKey}`] = learningExperienceToSave;

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

    deleteLearningExperience(org:string, auth:string, learningExperienceID:string): Observable<any> {

        const url = firebaseConfig.databaseURL + '/users/' + auth + '/organisations/'+ org + '/learningexperiences/' + learningExperienceID + '.json';

        return this.http.delete(url);
    }



}





