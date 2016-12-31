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
  learningExperience: FirebaseObjectObservable<any>
  
  
  constructor(public af:AngularFire, ar: ActivatedRoute) {
  this.subscription = ar.params.subscribe(
    (param: any) => this.id = param['id']
    );

  this.learningExperience = af.database.object(`learningexperiences/${this.id}`)

  this.milestones = af.database.list(`milestones/${this.id}`)
  	.map((milestones) => {
      // console.log(milestones)
  		return milestones.map((milestone) => 
  		{
        // console.log(milestone)
  			// milestone.todos = af.database.list(`/todos/${milestone.$key}`)
  			// milestone.resources = af.database.list(`/resources/${milestone.$key}`)
     //    milestone.marking = af.database.list(`/marking/${milestone.$key}`)
        milestone.stream = af.database.list(`/stream/${milestone.$key}`)       
  		.map((comments) => {
          console.log(comments)
          return comments.map((comment) =>
          {
            // console.log(comment)
            milestone.stream.comment = af.database.list(`/comments/${comment.$key}`)
            return milestone.stream
          })
        })
        return milestone
  		})
  	});


  // Milestones is a list of milestones of a particular learning key

  // Milestones.stream is a list of (pieces of information) for a particular milestone

  // Milestones.stream.comment is a list of comments for each of these pieces of information

  // Milestones [milestone,milestone,milestone]  

  //this.milestone --------+---+------------
  //                       M   M
  //                         Map  

  //   
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

  newComment(comment, stream, form) {
    comment.push(form)
    stream.push(form)
  }

  newResource(resource, stream, form) {
    form.type = 'resource'
    resource.push(form)
    stream.push(form)
    
  }

  newMarking(marking, stream, form) {
    marking.push(form)
    stream.push(form)
    
  }

}
