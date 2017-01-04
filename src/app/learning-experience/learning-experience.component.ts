import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { LearningExperienceService } from '../shared/learning-experience.service'

@Component({
  selector: 'trk-learning-experience',
  templateUrl: './learning-experience.component.html',
  styleUrls: ['./learning-experience.component.css']
})
export class LearningExperienceComponent implements OnInit {
	form : FormGroup;

	constructor(public fb: FormBuilder, private ls:LearningExperienceService ) { 
	  	this.form = this.fb.group({
	  		title: '',
	  		date: '',
	  		level: '',
	  		learningArea: '',
	  		description: '',
	  		tags: ''

	  	});
	}

	ngOnInit() {
	}

	create(form) {
	  	this.ls.createLearningExperience(form.value)
	  		.subscribe(
	  			() => {
	  				alert("Learning Experience Created Successfully");
	  				form.reset();
	  			},
	  			err => alert(`error creating lessin ${err}`)
	  			);

	}
}

