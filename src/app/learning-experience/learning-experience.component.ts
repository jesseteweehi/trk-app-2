import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { MdDialog, MdDialogRef } from '@angular/material'


@Component({
  selector: 'trk-learning-experience',
  templateUrl: './learning-experience.component.html',
  styleUrls: ['./learning-experience.component.css']
})
export class LearningExperienceComponent implements OnInit {
  learningExperiences:Observable<any[]>;

  learningExperiencesobject: FirebaseObjectObservable<any>;

  dialogRef: MdDialogRef<PizzaDialog>;

  constructor(public af:AngularFire, public dialog: MdDialog)
   { 
  this.learningExperiencesobject = af.database.object('/learningexperiences')
  this.learningExperiences= af.database.list('/learningexperiences')
  	.map((les) => {
  		return les.map((le) => 
  		{
  			le.milestones = af.database.list(`/milestones/${le.$key}`)
  			return le

  		})
  	});
  }

  ngOnInit() {
  }

  delete(le, data: string) {
    le.remove(data);
  }

  openDialog() {
    this.dialogRef = this.dialog.open(PizzaDialog, {
      disableClose: false
    });
  

  this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
    });

  }

}

@Component({
  selector: 'pizza-dialog',
  styles: [],
  template: `
  <h1 md-dialog-title>Would you like to order pizza?</h1>

    <md-dialog-actions>
      <button (click)="dialogRef.close('yes')">Yes</button>
      <button md-dialog-close>No</button>
    </md-dialog-actions>
  `
})
export class PizzaDialog {
  constructor(public dialogRef: MdDialogRef<PizzaDialog>) { }
}
