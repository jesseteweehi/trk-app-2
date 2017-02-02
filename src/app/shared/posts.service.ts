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
        private http:Http) {

        this.sdkDb = fb.database().ref();

    }

    findPostsForMilestone(org:string, auth: string, milestoneKey:string): Observable<PostModel[]> {

        const path = `users/${auth}/organisations/${org}/posts/${milestoneKey}` 

    	return this.af.database.list(path)
    		// .do(console.log)
    		.map(PostModel.fromJsonList);
    }

    createPostsForMilestone(org:string, auth: string, milestoneKey:string, PostModel:any): Observable<any> {

        const path = `users/${auth}/organisations/${org}/posts/${milestoneKey}`
 
    	const postToSave = Object.assign({}, PostModel);

    	const newPostKey = this.sdkDb.child(path).push().key;

    	let dataToSave = {};

    	dataToSave[path + '/' + newPostKey] = postToSave

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

    deletePost(org:string, auth: string, milestoneID:string, postID:string): Observable<any> {

        const url = firebaseConfig.databaseURL + '/users/' +auth+ '/organisations/' +org+ '/posts/' + milestoneID +'/'+ postID + '.json';

        return this.http.delete(url);
    }     

}
