import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LearningExperienceService } from '../shared/learning-experience.service';
import { EmbedlyService } from '../shared/embedly.service';
import { LearningExperienceModel } from '../shared/learning-experience';
import { Response } from '@angular/http';


@Component({
  selector: 'trk-learning-experience',
  templateUrl: './learning-experience.component.html',
  styleUrls: ['./learning-experience.component.css']
})

export class LearningExperienceComponent implements OnInit {
	allLearningExperiences: LearningExperienceModel[];
	form : FormGroup;

	constructor(public fb: FormBuilder, private ls:LearningExperienceService, private es:EmbedlyService ) { 
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
		this.ls.findAllLearningExperiences()
			// .do(console.log)
			.subscribe(
				lexperiences => this.allLearningExperiences = lexperiences
			);

		// this.es.findUrlInfo('http://www.google.com')
		// 	.subscribe(
		// 		(data:Response) => console.log(data)
		// 		);
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

	delete(key) {
        this.ls.deleteLearningExperience(key)
            .subscribe(
                () => alert('Lesson deleted'),
                console.error
            );
    }
}
