import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserOrganisationService } from '../shared/my-organisation.service';
import { OrganisationModel } from '../shared/organisation'
import { AngularFire } from "angularfire2";

@Component({
  selector: 'trk-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {
	allorganisations: OrganisationModel[];
	form: FormGroup
  private authuid: string

  constructor(public fb: FormBuilder, 
              private os:UserOrganisationService,
              private af: AngularFire) { 
	  	
        this.form = this.fb.group({
	  		title: '',
			description: '',
	  	});
	}

    randomString(length, chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }

    ngOnInit() {
        this.af.auth.subscribe(auth => {
            if (auth) {
      	        this.os.findOrganisationsForUser(auth.uid)
                  .subscribe(
                    organisations => this.allorganisations = organisations
                   );
                   this.authuid = auth.uid;
                }
            })
    }

    create(form) {
        form.value.code = this.randomString(8)

      	this.os.createOrganisationForUser(this.authuid, form.value)
      		.subscribe(
      			() => {
      				alert("Organisation Created Successfully");
      				form.reset();
      			},
      			err => alert(`error creating Organisation ${err}`)
      			);
    }

    join(org) {
      console.log('here')
      this.os.joinOrganisationByCode(this.authuid, org)
    }

    // delete(key) {
  	 //    this.os.deleteOrganisation(key)
  		//     .subscribe(
  		//         () => alert('Organisation deleted'),
  		//         console.error
  		//     );
    // }

}


//Need to Create
// - Create Organisation - Meta Data
// - Make Creater the owner of the Organisation
// - Make Creater also a admin of the Organisation

// When someone enters the right code for the organisation
// they get added as a member of the organisation
// This membership allows other admins of this organisation to create and edit their learning experiences within the organisation under their name.
// Once they are a member they must only be able to delete the information they have created.
