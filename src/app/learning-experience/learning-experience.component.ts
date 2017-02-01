import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LearningExperienceService } from '../shared/learning-experience.service';
import { LearningExperienceModel } from '../shared/learning-experience';
import { AngularFire, FirebaseRef, FirebaseAuthState } from "angularfire2";
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'trk-learning-experience',
  templateUrl: './learning-experience.component.html',
  styleUrls: ['./learning-experience.component.css']
})

export class LearningExperienceComponent implements OnInit {
	allLearningExperiences: LearningExperienceModel[];
	form : FormGroup;
	private subscription: Subscription;
	private org : string;
	private authuid: string

	constructor(public fb: FormBuilder, 
				private ls:LearningExperienceService,
				private af:AngularFire,
				private ar:ActivatedRoute ) { 
	  	this.form = this.fb.group({
	  		title: '',
			date: '',
	 		level: '',
	  		learningArea: '',
	  		description: '',
	  		tags: ''

	  	});

	  	this.subscription = ar.params.subscribe((param: any) => this.org = param['org']
        );
	}

	ngOnInit() {
		this.af.auth.subscribe(auth => {
		    if (auth) {
		   		this.ls.findAllLearningExperiences(this.org, auth.uid)
		   		.subscribe(
		   			lexperiences => this.allLearningExperiences = lexperiences
		   		);
		   		this.authuid = auth.uid;
		   	// Need to navigate to home page once setup

			}
		})	
	}

	ngOnDestroy() {
        this.subscription.unsubscribe();
    }



	create(form) {
		if (this.authuid){
			this.ls.createLearningExperience(this.org, this.authuid, form.value)
	  		  	.subscribe(
  		  			() => {
  		  				alert("Learning Experience Created Successfully");
  		  				form.reset();
  		  			},
  		  			err => alert(`error creating lessin ${err}`)
  		  			);
	  			}
	  	// Re Navigate
	}

	delete(key) {
		// Need to implement owner check.
		if (this.authuid) {
			this.ls.deleteLearningExperience(this.org, this.authuid, key)
            	.subscribe(
                	() => alert('Lesson deleted'),
                	console.error
            	);
            }
    }
}
