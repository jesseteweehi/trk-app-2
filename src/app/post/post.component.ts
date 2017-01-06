import { Component, OnInit, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { PostsService } from '../shared/posts.service';
import { PostModel } from '../shared/posts';
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'trk-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @ViewChild('url') b: ElementRef;

  @Input() public milestoneID : string;
  public postsForMilestone: PostModel[];
  public form: FormGroup;

  constructor(private ps: PostsService, public fb: FormBuilder) {
  	this.form = this.fb.group({
  	  title: '',
  	  description: '',
  	  url: '' 
  	});

  	}

  create(form, type) {
  	form.value.posttype = type
  	// console.log(form.value)
  	this.ps.createPostsForMilestone(this.milestoneID,form.value)
  		.subscribe(
  		  	() => {
  		    	form.reset();
  		  	},
  		  	err => alert(`error creating lessin ${err}`)
  		  	);

  }

  ngOnInit() {
  	this.ps.findPostsForMilestone(this.milestoneID)
  		// .do(console.log)
  		.subscribe(
  			posts => this.postsForMilestone = posts
  		);


  }

  ngAfterViewInit() {
    this.url.nativeElement.focus()
  }

}
