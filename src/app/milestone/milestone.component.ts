import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { MilestoneService } from '../shared/milestone.service';
import { MilestoneModel } from '../shared/milestone';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map'

@Component({
  selector: 'trk-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {
  public milestonesForLExperiences: MilestoneModel[];
  public form: FormGroup;
	private subscription: Subscription;
	private id : string;

  constructor(private ar: ActivatedRoute, public fb: FormBuilder, private ms: MilestoneService) {
  
  this.subscription = ar.params.subscribe(
    (param: any) => this.id = param['id']
    );

  this.form = this.fb.group({
    title: '',
    date: '',
    description: '',
    tags: ''
    });

  }

  create(form) {
    this.ms.createMilestoneForLearningExperience(this.id,form.value)
      .subscribe(
        () => {
          alert("Milestone Created Successfully");
          form.reset();
        },
        err => alert(`error creating lessin ${err}`)
        );
  }

  delete(milestonekey) {
      this.ms.deleteMilestone(this.id, milestonekey)
        .subscribe(
          () => alert('Milestone Deleted'),
          console.error  
          );
  }

  ngOnInit() {
    this.ms.findMilestoneForLearningExperience(this.id)
      .do(console.log)
      .subscribe(
        milestones => this.milestonesForLExperiences = milestones
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

}
