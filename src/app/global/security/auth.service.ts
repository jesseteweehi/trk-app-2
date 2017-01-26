import { Injectable, OnInit} from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { FirebaseAuth, FirebaseAuthState }  from "angularfire2/index"
import { AuthInfoModel } from "./auth-info"

@Injectable()
export class AuthService {

	static UNKNOWN_USER = new AuthInfoModel(null)

	authInfo$: BehaviorSubject<AuthInfoModel> = new BehaviorSubject<AuthInfoModel>(AuthService.UNKNOWN_USER);

  	constructor(private auth: FirebaseAuth) { }

  	ngOnInit() {

  	}

  	login() {
  		this.auth.login();

  		let uid: string = ''
  		this.auth.subscribe(auth => uid = auth.uid);
  		const authInfo = new AuthInfoModel(uid);
	
  		this.authInfo$.next(authInfo)
  	}

  	logout() {
  		this.auth.logout();
  	}

}
