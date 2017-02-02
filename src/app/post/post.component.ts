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
  @Input() public milestoneID : string;
  @Input() public org : string;
  @Input() public authuid: string;
  public postsForMilestone: PostModel[];
  public form: FormGroup;

  constructor(private ps: PostsService, 
              public fb: FormBuilder) {

    this.form = this.fb.group({
  	  title: '',
  	  description: '',
  	  url: '' 
  	});

  }

  ngOnInit() {
   
        this.ps.findPostsForMilestone(this.org, this.authuid, this.milestoneID)
          // .do(console.log)
          .subscribe(
            posts => this.postsForMilestone = posts
          );
     
  }
    

  


  create(form, type) {
  	form.value.posttype = type
  	
  	this.ps.createPostsForMilestone(this.org, this.authuid, this.milestoneID, form.value)
  		.subscribe(
  		  	() => {
  		    	form.reset();
  		  	},
  		  	err => alert(`error creating Post ${err}`)
  		  	);

  }

 

  deletePost(postkey) {
    this.ps.deletePost(this.org, this.authuid, this.milestoneID, postkey)
      .subscribe(
                () => console.log('Url Deleted'),
                console.error
            );

  }


}
