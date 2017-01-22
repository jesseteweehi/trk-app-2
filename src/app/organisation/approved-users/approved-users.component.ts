import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { OrganisationService } from '../../shared/organisation.service';
import { ApprovedUserModel } from '../../shared/approveduser'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map'

@Component({
  selector: 'trk-approvedusers',
  templateUrl: './approved-users.component.html',
  styleUrls: ['./approved-users.component.css']
})
export class ApprovedUsersComponent implements OnInit {
	public approvedUsersForOrganisation: ApprovedUserModel[];
	public form: FormGroup;
	private subscription: Subscription;
	private id : string;

  	constructor(private ar: ActivatedRoute, public fb: FormBuilder, private os: OrganisationService) {
  		this.subscription = ar.params.subscribe(
  			(param: any) => this.id = param['id']
  			);

  		this.form = this.fb.group({
  			email: '',
  			type: ''
  		});

  	}

  	create(form) {
  		this.os.createApprovedUserForOrganisation(this.id, form.value)
  			.subscribe(
  			  () => {
  			    alert("Approved User Created Successfully");
  			    form.reset();
  			  },
  			  err => alert(`error creating Approved User ${err}`)
  			  );
  	}

  	delete(approvedUserKey) {
  		this.os.deleteApprovedUserFromOrganisation(this.id, approvedUserKey)
  			.subscribe(
  			  () => alert('Approved User Deleted'),
  			  console.error  
  			  );
  	}

  	ngOnInit() {
  		this.os.findAllApprovedUsers(this.id)
  			.subscribe(
  				approvedUsers => this.approvedUsersForOrganisation = approvedUsers
  				)
  	}

  	ngOnDestroy() {
  	  this.subscription.unsubscribe();

  	}
}
