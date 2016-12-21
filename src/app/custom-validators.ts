import { Injectable } from '@angular/core'
import { FormControl, AbstractControl } from '@angular/forms';
import { AngularFire, FirebaseAuth, FirebaseAuthState, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';


const list: Array<string> = ['9','10','11','12','13'];

function inArray(n,a) {
  	return a.includes(n);
  }

export class CustomValidators {

	static levelNumber(control: FormControl) {

	if (!control.value) {
		return null;
	}

	return inArray(control.value,list) ? null : {levelNumber : {valid: true}};
	}
	
	static minValueValidator = (min:number) => {
  		return (control:FormControl) => {
    		var num = +control.value;
    		if(isNaN(num) || num < min){
      		return {
         		minValue: {valid: false}
      		};
    	}
    	return null;
  		};
	};
	
}

@Injectable()
export class FirebaseValidators {
	constructor(public af: AngularFire) {		
	}

	objectInFirebase = (url:string) => {
		return (control:FormControl) => {
			const toSend = this.af.database.object(`${url}/${control.value}`);
			toSend.subscribe(data => {
				if (data.$value === control.value) {
					return {
						objectInFirebase: {valid: false}}
				} else {
					return {
						objectInFirebase: {valid: true}}
				}
			}); 
		}
	}

}


// checkOrganisation (orgName) {
//   const organisation = this.af.database.object(`organisation/${orgName}`);
//   organisation.subscribe(data => {
//     if(data.$value === null) {
//       this.addOrganisation(orgName);
//     } else {
//       console.log("This org already exists");     
//     }
//   })
// }

// addOrganisation (orgName) {
//   console.log(orgName);
//   const value = {title : this.orgcreateform.value.title, admin: this.auth.uid}
//   const url = this.af.database.object(`/organisation/${orgName}`);
//   url.set(value);
// }