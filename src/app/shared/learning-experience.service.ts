import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef } from "angularfire2";
import { Observable, Subject} from "rxjs/Rx";
import { LearningExperienceModel } from './learning-experience'
import { firebaseConfig } from '../app.module'
import {Http} from "@angular/http";

@Injectable()
export class LearningExperienceService {

  	sdkDb:any;

    constructor(private af:AngularFire, @Inject(FirebaseRef) fb, private http:Http) {

        this.sdkDb = fb.database().ref();

    }


	findAllLearningExperiences(): Observable<LearningExperienceModel[]> {
	  	
	  	return this.af.database.list('learningexperiences')
	  		// .do(console.log)
	  		.map(LearningExperienceModel.fromJsonList);

  	}

  	createLearningExperience(LearningExperienceModel:any): Observable<any> {
  		
  		const learningExperienceToSave = Object.assign({}, LearningExperienceModel);

  		const newLearningExperienceKey = this.sdkDb.child('learningexperiences').push().key;

  		let dataToSave = {};

  		dataToSave[`learningexperiences/${newLearningExperienceKey}`] = learningExperienceToSave;

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

        const url = firebaseConfig.databaseURL + '/learningexperiences/' + learningExperienceID + '.json';

        return this.http.delete(url);
    }



}





