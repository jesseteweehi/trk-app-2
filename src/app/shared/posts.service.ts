import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef } from "angularfire2";
import {Http, Response} from "@angular/http";


import { Observable, Subject} from "rxjs/Rx";
import { PostModel } from './posts'
import { firebaseConfig } from '../app.module'
import { EmbedlyService } from './embedly.service'

@Injectable()
export class PostsService {

    sdkDb:any;

    constructor(private af:AngularFire, 
        @Inject(FirebaseRef) fb, 
        private http:Http, 
        private es:EmbedlyService) {

        this.sdkDb = fb.database().ref();

    }

    findPostsForMilestone(milestoneKey:string): Observable<PostModel[]> {

    	return this.af.database.list(`posts/${milestoneKey}`)
    		// .do(console.log)
    		.map(PostModel.fromJsonList);
    }

    createPostsForMilestone(milestoneKey:string, PostModel:any): Observable<any> {
 
    	const postToSave = Object.assign({}, PostModel);

    	const newPostKey = this.sdkDb.child(`posts/${milestoneKey}`).push().key;

    	let dataToSave = {};

    	dataToSave[`posts/${milestoneKey}/${newPostKey}`] = postToSave

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

    deletePost(milestoneID:string, postID:string): Observable<any> {

        const url = firebaseConfig.databaseURL + '/posts/' + milestoneID +'/'+ postID + '.json';

        return this.http.delete(url);
    }     

}
