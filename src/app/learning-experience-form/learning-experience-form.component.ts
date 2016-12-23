import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'trk-learning-experience-form',
  templateUrl: './learning-experience-form.component.html',
  styleUrls: ['./learning-experience-form.component.css']
})
export class LearningExperienceFormComponent implements OnInit {
  
  form: FormGroup;
  learningexperiences : FirebaseListObservable<any>;

  constructor(private af: AngularFire, private fb: FormBuilder) {
  	this.learningexperiences = af.database.list('/learningexperiences');

	this.form = this.fb.group({
		title: ['',Validators.required],
		description: ['',Validators.required],
		learningArea: ['',Validators.required],
		learningIntention: ['',Validators.required],
		status: ['',Validators.required],
		completed: ['',Validators.required]
		});

  }

  ngOnInit() {
  }


  save(form) {
	return this.learningexperiences.push(form);
  }

  reset() {
  	return this.form.reset()
  }
}


