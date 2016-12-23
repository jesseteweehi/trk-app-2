import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Component({
  selector: 'trk-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.css']
})
export class MilestonesComponent implements OnInit {
  people:Observable<any[]>
  
  constructor(public af:AngularFire) {
  this.people = af.database.list('/people')
  	.map((people) => {
  		return people.map((person) => 
  		{
  			person.todos = af.database.list(`/todos/${person.$key}`)
  			return person

  		})
  	}); 
  }

  ngOnInit() {
  }

}
