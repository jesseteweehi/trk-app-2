import { Component, OnInit } from '@angular/core';
import { LearningExperienceService } from '../shared/model/learning-experience.service';
import {Observable} from "rxjs/Rx";
import {LearningExperience} from "../shared/model/learningExperience";
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/filter'; 



@Component({
  selector: 'trk-learning-experience-list',
  templateUrl: './learning-experience-list.component.html',
  styleUrls: ['./learning-experience-list.component.css']
})
export class LearningExperienceListComponent implements OnInit {

   	learningExperiences : Observable<any[]>
   	milestones : Observable <any[]>
   	// filteredLearningExperience : Observable<any>
 
  	constructor(private les : LearningExperienceService ) { }

  	ngOnInit() {
  	this.learningExperiences = this.les.findAllLearningExperiences()
  	}
  	search(search) {
  	}


	// var source = Rx.Observable.from(array)
 //  .find(function (x, i, obs) { return x === 1; });

 

}

// var str = "Hello world, welcome to the universe.";
// var n = str.includes("world");

// var source = seq.filter(function (n) { return n < 5; });

// (x => x.title.includes(search) )
// (function (n) { return n < 5; })

// (lesson => lesson.description.includes(search)

// var seq = Rx.Observable.generate(
//     0,
//     function (i) { return i < 10; },
//     function (i) { return i + 1; },
//     function (i) { return i * i; });

// var source = seq.filter(function (n) { return n < 5; });

// var subscription = source.subscribe(
//     function (x) { console.log('onNext: ' + x); },
//     function (e) { console.log('onError: ' + e.message); },
//     function () { console.log('onCompleted'); });

