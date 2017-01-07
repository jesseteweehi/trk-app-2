import { Component, OnInit, Input } from '@angular/core';
import { UrlService } from '../shared/url.service';
import { UrlModel } from '../shared/url';
import { FormGroup, FormBuilder } from '@angular/forms'; 

@Component({
  selector: 'trk-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {
	@Input() public postID : string;
	public urlsForPost: UrlModel[];
	public form: FormGroup;
  public openstring : string = ''

  	constructor(private us: UrlService, public fb: FormBuilder) {
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


  	ngOnInit() {
  		this.us.findUrlsForPost(this.postID)
  			.subscribe(
  				urls => this.urlsForPost = urls
  			);
    }

    open(){
      this.openstring = this.postID;    
    }

    close(){
      this.openstring = '';     
    }
    
    deleteurl(urlkey){
      this.us.deleteUrl(this.postID, urlkey)
        .subscribe(
                () => console.log('url Deleted'),
                console.error
            );

    }

}
