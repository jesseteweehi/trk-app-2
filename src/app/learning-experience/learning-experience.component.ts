import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Component({
  selector: 'trk-learning-experience',
  templateUrl: './learning-experience.component.html',
  styleUrls: ['./learning-experience.component.css']
})
export class LearningExperienceComponent implements OnInit {
  learningExperiences:Observable<any[]>;

  constructor(public af:AngularFire) { 
  this.learningExperiences= af.database.list('/learningexperiences')
  	.map((les) => {
  		return les.map((le) => 
  		{
  			le.milestones = af.database.list(`/milestones/${le.$key}`)
  			return le

  		})
  	});
  }

  ngOnInit() {
  }

}
