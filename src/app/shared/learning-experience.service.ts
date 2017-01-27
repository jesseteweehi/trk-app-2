import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef, FirebaseAuthState } from "angularfire2";
import { Observable, Subject} from "rxjs/Rx";
import { LearningExperienceModel } from './learning-experience'
import { firebaseConfig } from '../app.module'
import {Http} from "@angular/http";

@Injectable()
export class LearningExperienceService {

  	sdkDb:any;
    authentication: FirebaseAuthState;


    constructor(private af:AngularFire, 
                @Inject(FirebaseRef) fb, 
                private http:Http) {

        this.sdkDb = fb.database().ref();
        this.af.auth.subscribe(auth => this.authentication = auth);

    }


	findAllLearningExperiences(auth): Observable<LearningExperienceModel[]> {
      
        return this.af.database.list(`users/${auth}/learningexperiences`)
	  		.map(LearningExperienceModel.fromJsonList);
  	}

  	createLearningExperience(LearningExperienceModel:any): Observable<any> {
  		
  		const learningExperienceToSave = Object.assign({}, LearningExperienceModel);

  		const newLearningExperienceKey = this.sdkDb.child(`users/${this.authentication.uid}/learningexperiences`).push().key;

  		let dataToSave = {};

  		dataToSave[`users/${this.authentication.uid}/learningexperiences/${newLearningExperienceKey}`] = learningExperienceToSave;

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

    deleteLearningExperience(learningExperienceID:string): Observable<any> {

        const url = firebaseConfig.databaseURL + '/users/' + this.authentication.uid + '/learningexperiences/' + learningExperienceID + '.json';

        return this.http.delete(url);
    }



}





