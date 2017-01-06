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

    findUrlsForPost(postKey:string): Observable<UrlModel[]> {

    	return this.af.database.list(`urls/${postKey}`)
    		.map(UrlModel.fromJsonList)
    }

    createUrlsForPosts(postKey:string, UrlModel:any): Observable<any> {

    	const urlToSave = Object.assign({}, UrlModel);

    	const newUrlKey = this.sdkDb.child(`url/${postKey}`).push().key;

    	let dataToSave = {};

    	dataToSave[`urls/${postKey}/${newUrlKey}`] = urlToSave

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

    deleteUrl(postID:string, UrlID:string): Observable<any> {

    	const url = firebaseConfig.databaseURL + '/urls/' + postID + '/' + UrlID + '.json';

    	return this.http.delete(url);
    } 

}
