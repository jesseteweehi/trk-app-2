import { Component, OnInit, Input } from '@angular/core';
import { RepliesService } from '../shared/replies.service';
import { RepliesModel } from '../shared/replies';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'trk-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css']
})
export class RepliesComponent implements OnInit {
	@Input() public postID : string;
	public repliesForPost: RepliesModel[];
	public form: FormGroup;
	public openstring : string = ''
	

  	constructor(private rs: RepliesService, public fb: FormBuilder) {
  		this.form = this.fb.group({
  	  		comment: ''
  		});

  	}

  	create(form) {
  		this.rs.createRepliesForPosts(this.postID, form.value)
  			.subscribe(
  			  	() => {
  			    	form.reset();
  			  	},
  			  	err => alert(`error creating replies ${err}`)
  			  	);
  	}

  	ngOnInit() {
  		this.rs.findRepliesForPost(this.postID)
  			.subscribe(
  				replies => this.repliesForPost = replies
  				);
  	}

  	deletereplies(replieskey) {
  		this.rs.deleteReply(this.postID, replieskey)
  			.subscribe(
  					() => console.log('replies Deleted'),
  					console.error
  				);
  	}
  	open(){
  	  this.openstring = this.postID;    
  	}

  	close(){
  	  this.openstring = '';     
  	}
}