import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map'

@Component({
  selector: 'trk-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.css']
})
export class MilestonesComponent implements OnInit {
  private subscription: Subscription;
  id : string;

  milestones:Observable<any[]>;
  // milestonestream:Observable<any[]>
  learningExperience: FirebaseObjectObservable<any>;

  
  
  constructor(public af:AngularFire, ar: ActivatedRoute) {
  this.subscription = ar.params.subscribe(
    (param: any) => this.id = param['id']
    );

  this.learningExperience = af.database.object(`learningexperiences/${this.id}`)

  this.milestones = af.database.list(`milestones/${this.id}`)
  	.map((milestones) => {
  		return milestones.map((milestone) => 
  		{
  			// milestone.todos = af.database.list(`/todos/${milestone.$key}`)
  			// milestone.resources = af.database.list(`/resources/${milestone.$key}`)
     //    milestone.marking = af.database.list(`/marking/${milestone.$key}`)
        milestone.stream = af.database.list(`/stream/${milestone.$key}`)
        .map((comments) => {
          return milestone.stream.map((comment) =>
        {
          milestone.stream.comment = af.database.list(`/nestedcomments/${comment.$key}`)
          return milestone.stream   
        });
      });
        return milestone
    }); 

  });
 
 
}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

  newComment(comment, stream, form) {
    // comment.push(form)
    stream.push(form)
  }

  newResource(resource, stream, form) {
    // resource.push(form)
    stream.push(form)
    
  }

  newMarking(marking, stream, form) {
    // marking.push(form)
    stream.push(form)
    
  }

}
