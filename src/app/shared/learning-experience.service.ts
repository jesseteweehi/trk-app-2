import { Injectable } from '@angular/core';
import { AngularFire, FirebaseRef } from "angularfire2";
import { Observable, Subject} from "rxjs/Rx";
import { LearningExperienceModel } from './learning-experience'

@Injectable()
export class LearningExperienceService {

  	constructor(private af:AngularFire, @Inject(FirebaseRef) fb) { 

  		this.sdkDb = fb.database().ref();
  	}






	findAllLearningExperience(): Observable<LearningExperienceModel[]> {
	  	
	  	return this.af.database.list('learningexperiences')
	  		.do(console.log)
	  		.map(LearningExperienceModel.fromJsonList);

  	}

  	createLearningExperience(LearningExperienceModel:any): Observable<any> {
  		
  		const learningExperienceToSave = Object.assign({}, LearningExperienceModel);

  		const newLearningExperienceKey = this.sdkDB.child('learningexperiences').push().key;

  		let dataToSave = {};

  		dataToSave[`learningexperiences${newLearningExperienceKey}`] = learningExperienceToSave;

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





