import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'trk-learning-experience',
  templateUrl: './learning-experience.component.html',
  styleUrls: ['./learning-experience.component.css']
})
export class LearningExperienceComponent implements OnInit {

  learningexperiences : FirebaseListObservable<any>;

  constructor(af:AngularFire) {
  this.learningexperiences = af.database.list('/learningexperiences'); 
  }

  ngOnInit() {
  }

}
