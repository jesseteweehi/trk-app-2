import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import { Observable, Subject} from "rxjs/Rx";



@Injectable()
export class EmbedlyService {

	private embedlyUrl = 'https://api.embedly.com/1/oembed?';
    private embedlyKey = 'feaa977bf5f1456a853c617bf66f73b8';

  constructor(private http:Http) { }



	findUrlInfo(url:string ) : Observable<any> {
		let data = {
			'key': this.embedlyKey,
			'url': url,
			'secure': true,
			'format': 'json'}

		return this.http.get(this.embedlyUrl + this.encodeQueryData(data))
	}

	encodeQueryData(data) {
   		let ret = [];
	   		for (let d in data)
	     	ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
	   	return ret.join('&');
	}

}


// var data = { 'first name': 'George', 'last name': 'Jetson', 'age': 110 };
// var querystring = encodeQueryData(data);

// https://api.embedly.com/:version/:endpoint?key=:key&<additional query parameters>

// Choose :version and :endpoint depending on the part of the API that you want to access, 
// e.g. 1/oembed for the /1/oembed or 1/extract for the /1/extract. Replace :key 
// with the unique API key shown in the app dashboard..


// deleteLesson(lessonId:string): Observable<any> {

//         const url = firebaseConfig.databaseURL + '/lessons/' + lessonId + '.json';

//         return this.http.delete(url);
//     }



//   constructor (private http: Http) {}
//   getHeroes (): Observable<Hero[]> {
//     return this.http.get(this.heroesUrl)
//                     .map(this.extractData)
//                     .catch(this.handleError);
//   }
//   private extractData(res: Response) {
//     let body = res.json();
//     return body.data || { };
//   }
//   private handleError (error: Response | any) {
//     // In a real world app, we might use a remote logging infrastructure
//     let errMsg: string;
//     if (error instanceof Response) {
//       const body = error.json() || '';
//       const err = body.error || JSON.stringify(body);
//       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//     } else {
//       errMsg = error.message ? error.message : error.toString();
//     }
//     console.error(errMsg);
//     return Observable.throw(errMsg);
//   }
// }