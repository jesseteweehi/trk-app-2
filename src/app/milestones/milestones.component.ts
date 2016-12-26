import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'


@Component({
  selector: 'trk-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.css']
})
export class MilestonesComponent implements OnInit {
  people:Observable<any[]>;
  titleSubject: Subject<any>;
  
  constructor(public af:AngularFire) {
  this.titleSubject = new Subject();
  this.people = af.database.list('/people', {
          query:{
            orderByChild: 'name',
            equalTo: this.titleSubject,
          }
        })
  	.map((people) => {
  		return people.map((person) => 
  		{
  			person.todos = af.database.list(`/todos/${person.$key}`)
  			person.resources = af.database.list(`/resources/${person.$key}`)
        person.marking = af.database.list(`/marking/${person.$key}`)
        person.stream = af.database.list(`/stream/${person.$key}`)
  			return person

  		})
  	}); 
  }

  ngOnInit() {
  }

  newComment(comment, stream, form) {
    comment.push(form)
    stream.push(form)
  }

  newResource(resource, stream, form) {
    resource.push(form)
    stream.push(form)
    
  }

  newMarking(marking, stream, form) {
    marking.push(form)
    stream.push(form)
    
  }

  filterBy(title: string) {
    this.titleSubject.next(title);
    console.log(title); 
  }
}



