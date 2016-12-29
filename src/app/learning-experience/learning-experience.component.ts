import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { MdDialog, MdDialogRef } from '@angular/material'


@Component({
  selector: 'trk-learning-experience',
  templateUrl: './learning-experience.component.html',
  styleUrls: ['./learning-experience.component.css']
})
export class LearningExperienceComponent implements OnInit {
  edited:string = ''

  learningExperiences:Observable<any[]>;

  constructor(public af:AngularFire)
   { 

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

  delete(le, data: string) {
    le.remove(data);
  }

  edit(key:string) {
    this.edited=key
  }

  editFinished() {
    this.edited=''
  }

}


