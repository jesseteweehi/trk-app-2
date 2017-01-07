import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef } from "angularfire2";
import {Http, Response} from "@angular/http";

import { Observable, Subject} from "rxjs/Rx";
import { RepliesModel } from './replies'
import { firebaseConfig } from '../app.module'

@Injectable()
export class RepliesService {

  	sdkDb:any;

  	constructor(private af:AngularFire, 
      	@Inject(FirebaseRef) fb, 
      	private http:Http) {

      	this.sdkDb = fb.database().ref();

  	}

  	findRepliesForPost(postKey:string): Observable<RepliesModel[]> {

  		return this.af.database.list(`replies/${postKey}`)
  			.map(RepliesModel.fromJsonList)
  	}

  	createRepliesForPosts(postKey:string, RepliesModel:any): Observable<any> {

  		const replyToSave = Object.assign({}, RepliesModel);

  		const newReplyKey = this.sdkDb.child(`replies/${postKey}`).push().key;

  		let dataToSave = {};

  		dataToSave[`replies/${postKey}/${newReplyKey}`] = replyToSave

  		return this.firebaseUpdate(dataToSave)
  	}

  	firebaseUpdate(dataToSave) {
  	      
  	    const subject = new Subject();

  	    this.sdkDb.update(dataToSave)
  	        .then(
  	            val => {
  	                subject.next(val);
  	                subject.complete();

  	            },
  	            err => {
  	                subject.error(err);
  	                subject.complete();
  	              }
  	        );

  	    return subject.asObservable();
  	}

  	deleteReply (postID:string, ReplyID:string): Observable<any> {

    	const url = firebaseConfig.databaseURL + '/urls/' + postID + '/' + ReplyID + '.json';

    	return this.http.delete(url);
    } 

}
