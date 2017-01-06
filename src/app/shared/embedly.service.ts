import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import { Observable, Subject} from "rxjs/Rx";
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';



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
					.map((response: Response) => response.json());
	}

	encodeQueryData(data) {
   		let ret = [];
	   		for (let d in data)
	     	ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
	   	return ret.join('&');
	}

}


