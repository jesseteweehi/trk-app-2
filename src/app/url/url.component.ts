import { Component, OnInit, Input } from '@angular/core';
import { UrlService } from '../shared/url.service';
import { UrlModel } from '../shared/url';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material'; 

@Component({
  selector: 'trk-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {
	@Input() public postID : string;
	public urlsForPost: UrlModel[];
	public form: FormGroup;

	dialogRef: MdDialogRef<UrlDialog>;

  	constructor(private us: UrlService, public fb: FormBuilder, public dialog: MdDialog) {
  		this.form = this.fb.group({
  	  		title: '',
  	  		url: '' 
  		});

  	}

  	create(form) {
  		this.us.createUrlsForPosts(this.postID, form.value)
  			.subscribe(
  			  	() => {
  			    	form.reset();
  			  	},
  			  	err => alert(`error creating Url ${err}`)
  			  	);
  	}

  	

  	openDialog() {
  	    this.dialogRef = this.dialog.open(UrlDialog, {
  	      disableClose: false
  	    });

  	    this.dialogRef.afterClosed().subscribe(result => {
  	      this.create(result);
  	      this.dialogRef = null;
  	    });
  	  }


  	ngOnInit() {
  		this.us.findUrlsForPost(this.postID)
  			.subscribe(
  				urls => this.urlsForPost = urls
  			);

  }

}

@Component({
  selector: 'url-dialog',
  template: `
  	
  	<h5 md-dialog-title>Add Url</h5>

  	<form novalidate [formGroup]="form">

    	    	
    	<md-input-container style="width: 100%">
    	     <input formControlName="description" md-input placeholder="Add Url">
    	</md-input-container>
        

    	<button (click)="dialogRef.close(form)" md-raised-button color="primary">Post</button>
    	<button md-raised-button md-dialog-close >Cancel</button>
  	</form>
  `
})
export class UrlDialog {
  constructor(public dialogRef: MdDialogRef<UrlDialog>) { }

  
}
