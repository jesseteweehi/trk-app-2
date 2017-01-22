import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrganisationService } from '../shared/organisation.service';
import { OrganisationModel } from '../shared/organisation'

@Component({
  selector: 'trk-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {
	allorganisations: OrganisationModel[];
	form: FormGroup

  constructor(public fb: FormBuilder, private os:OrganisationService ) { 
	  	this.form = this.fb.group({
	  		title: '',
			website: '',
	  	});
	}

  ngOnInit() {
  	this.os.findAllOrganisations()
  		.subscribe(
  			organisations => this.allorganisations = organisations
  			);

  }

  create(form) {
  	this.os.createOrganisation(form.value)
  		.subscribe(
  			() => {
  				alert("Organisation Created Successfully");
  				form.reset();
  			},
  			err => alert(`error creating Organisation ${err}`)
  			);
  }

  delete(key) {
  	this.os.deleteOrganisation(key)
  		.subscribe(
  		    () => alert('Organisation deleted'),
  		    console.error
  		);
  }

}


//Need to Create
// Create Organisation - Meta Data
// Create Allowed Members List
// Create Students List
// Create Teachers List
// Create Skills List
