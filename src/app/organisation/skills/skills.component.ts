import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { OrganisationService } from '../../shared/organisation.service';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map'
import { SkillModel } from '../../shared/skill'


@Component({
  selector: 'trk-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
	public skillsForOrganisation: SkillModel[];
	public filteredSkillsForOrganisation: SkillModel[];

	private subscription: Subscription;
	private id : string;
	public form: FormGroup;

  	constructor(private ar: ActivatedRoute, public fb: FormBuilder, private os: OrganisationService) {
  		this.subscription = ar.params.subscribe(
  			(param: any) => this.id = param['id']
  			);

  		this.form = this.fb.group({
  			title: '',
  			description: '',
  			infourl: ''
  		});

  	}

  	create(form) {
  		this.os.createSkillForOrganisation(this.id, form.value)
  			.subscribe(
  			  () => {
  			    alert("Skill Created Successfully");
  			    form.reset();
  			  },
  			  err => alert(`error creating Skill ${err}`)
  			  );
  	}

  	delete(skillkey) {
  		this.os.deleteSkillForOrganisation(this.id, skillkey)
  			.subscribe(
  			  () => alert('Approved Skill Deleted'),
  			  console.error  
  			  );
  	}



	ngOnInit() {
		this.os.findAllSkills(this.id)
			.subscribe(
				skills => this.skillsForOrganisation = this.filteredSkillsForOrganisation = skills
				)
	}

	search(search:string) {
		this.filteredSkillsForOrganisation = this.skillsForOrganisation.filter(SkillModel => SkillModel.title.includes(search));
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

}
