import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AngularFire, FirebaseRef, FirebaseListObservable} from "angularfire2";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'trk-learning-experience-item',
  templateUrl: './learning-experience-item.component.html',
  styleUrls: ['./learning-experience-item.component.css']
})
export class LearningExperienceItemComponent implements OnInit {
  
  @Input() learningexperience;
  form : FormGroup;
  sdkDb : any;

  constructor(private fb : FormBuilder, @Inject(FirebaseRef) fbr, af : AngularFire) {
  		this.sdkDb = fbr.database().ref();
  		this.form = this.fb.group({
		title: ['',Validators.required]});
   }



  ngOnInit() {

  }
  

  save(learningExperiencekey:string, form) {
  	const newMilestoneKey = this.sdkDb.child('milestones').push().key;

  	const updates = {}; 

  	updates['/milestones/'+ learningExperiencekey+'/'+ newMilestoneKey] = form;

  	return this.sdkDb.update(updates)
  }

  reset(){
  	this.form.reset()
  }

}

// function writeNewPost(uid, username, picture, title, body) {
//   // A post entry.
//   var postData = {
//     author: username,
//     uid: uid,
//     body: body,
//     title: title,
//     starCount: 0,
//     authorPic: picture
//   };

//   // Get a key for a new Post.
//   var newPostKey = firebase.database().ref().child('posts').push().key;

//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   var updates = {};
//   updates['/posts/' + newPostKey] = postData;
//   updates['/user-posts/' + uid + '/' + newPostKey] = postData;

//   return firebase.database().ref().update(updates);
// }



// createNewLesson(courseId:string, lesson:any): Observable<any> {

//         const lessonToSave = Object.assign({}, lesson, {courseId});

//         const newLessonKey = this.sdkDb.child('lessons').push().key;

//         let dataToSave = {};

//         dataToSave["lessons/" + newLessonKey] = lessonToSave;
//         dataToSave[`lessonsPerCourse/${courseId}/${newLessonKey}`] = true;


//         return this.firebaseUpdate(dataToSave);
//     }