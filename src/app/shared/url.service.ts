import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseRef } from "angularfire2";
import {Http, Response} from "@angular/http";

import { Observable, Subject} from "rxjs/Rx";
import { UrlModel } from './url'
import { firebaseConfig } from '../app.module'

@Injectable()
export class UrlService {

    sdkDb:any;

    constructor(private af:AngularFire, 
        @Inject(FirebaseRef) fb, 
        private http:Http) {

        this.sdkDb = fb.database().ref();

    }

    findUrlsForPost(org:string, auth: string, postKey:string): Observable<UrlModel[]> {

        const path = `users/${auth}/organisations/${org}/`

    	return this.af.database.list(path + `urls/${postKey}`)
    		.map(UrlModel.fromJsonList)
    }

    createUrlsForPosts(org:string, auth: string, postKey:string, UrlModel:any): Observable<any> {

        console.log(org,auth,postKey)

        const path = `users/${auth}/organisations/${org}/`

    	const urlToSave = Object.assign({}, UrlModel);

    	const newUrlKey = this.sdkDb.child(path + `urls/${postKey}`).push().key;

    	let dataToSave = {};

    	dataToSave[path + `urls/${postKey}/${newUrlKey}`] = urlToSave

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

    deleteUrl(org:string, auth: string, postID:string, UrlID:string): Observable<any> {

        const path = `/users/${auth}/organisations/${org}/`

    	const url = firebaseConfig.databaseURL + path + 'urls/' + postID + '/' + UrlID + '.json';

    	return this.http.delete(url);
    } 

}
