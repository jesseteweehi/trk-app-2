import { Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2';
import { LearningExperienceService } from '../shared/model/learning-experience.service';
import {LearningExperience} from "../shared/model/learningExperience";


@Component({
  selector: 'trk-new-learning-experience',
  templateUrl: './new-learning-experience.component.html',
  styleUrls: ['./new-learning-experience.component.css']
})
export class NewLearningExperienceComponent {

 	form : FormGroup;

	constructor(private fb:FormBuilder, private les: LearningExperienceService) {

	  this.form = this.fb.group({
	      title: ['',Validators.required],
	      description: ['',Validators.required],
	      learningArea: ['',Validators.required],
	      learningIntention: ['',Validators.required],
	      status: ['',Validators.required],
	      completed: ['',Validators.required]
	  });
	}

	save(form) {
		this.les.createLearningExperience(form);

	}
	reset(){
		this.form.reset()
	}

}

