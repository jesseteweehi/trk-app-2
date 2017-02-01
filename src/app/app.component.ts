import { Component, OnInit } from '@angular/core';
import { AuthService}  from  './global/security/auth.service'
// import { AuthInfoModel } from './global/security/auth-info'


@Component({
  selector: 'trk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  	constructor(private as: AuthService) {
  	}

    ngOnInit(){
    }

  	login() {
        this.as.login();
  	}

  	logout() {
	    this.as.logout();
	  }

}
