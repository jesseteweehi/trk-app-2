import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'trk-learning-experience-item',
  templateUrl: './learning-experience-item.component.html',
  styleUrls: ['./learning-experience-item.component.css']
})
export class LearningExperienceItemComponent implements OnInit {
  @Input() learningexperience;
  form : FormGroup

  constructor(private fb : FormBuilder) {
  		this.form = this.fb.group({
		title: ['',Validators.required]});
   
   }

  ngOnInit() {
  }

}
