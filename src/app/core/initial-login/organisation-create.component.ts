import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFire, FirebaseAuth, FirebaseAuthState, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';
import { CustomValidators, FirebaseValidators } from '../../custom-validators';

@Component({
  selector: 'trk-organisation-create',
  templateUrl: './organisation-create.component.html',
  styleUrls: ['./organisation-create.component.css']
})
export class OrganisationCreateComponent implements OnInit{
  organisation: FirebaseObjectObservable<any>
  organisationlist: FirebaseListObservable<any>
  orgcreateform : FormGroup;  
  auth: any;

  constructor(public fb: FormBuilder, public af: AngularFire, private val: FirebaseValidators) { 
      this.orgcreateform = this.fb.group({
  		title: ['', Validators.required]
  		});
      this.organisation = af.database.object('/organisation', {preserveSnapshot: true});
      this.organisationlist = af.database.list('/organisation');
  }

  ngOnInit() {this.af.auth.subscribe(auth => this.auth = auth);}

  onSubmit(){this.addOrganisation(this.orgcreateform.value,this.auth.uid)} 

  // addOrganisation (orgName, uid) {
  //   const organisation = this.af.database.object('/organisation');
  //   const data = {};
  //   data[`/${orgName}`] = {title : this.orgcreateform.value.title};
  //   data[`/${orgName}/${uid}`] = true;
  //   organisation.update(data).then(_ => console.log("updated"));
  //   }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
  }

// - push organisation at (/organisation)
// - using the organisations key create object at (/org_users) of 
// {`${org.key}/${uid}`:true }

  

  addOrganisation(orgData,uid) {  
    this.organisationlist.push(orgData).then(function(item) {
      const data = {};
      data['title'] = {title : orgData.title};
      // data[`/$item.key/${uid}`] = true;
      this.organisation.update(data);

    });
    // console.log(orgkey);


    // items.push(yourobject).then((item) => { console.log(item.key); });

  }

}


export class People {
  People:observable<any[]>
  constructor(af: AngularFire) {
    this.people = af.database.list('people')
      .map((people) => {
        people.map((person) => {
          person.todos = af.database.list(`/todos/${person.$key}`)
          return person;
        }
      })
  }
}


// function writeNewPost(uid, username, picture, title, body) {
//   // A post entry.
//   var postData = {
//     author: username,
//     uid: uid,
//     body: body,
//     title: title,
//     starCount: 0,
//     authorPic: picture
//   };

//   // Get a key for a new Post.
//   var newPostKey = firebase.database().ref().child('posts').push().key;

//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   var updates = {};
//   updates['/posts/' + newPostKey] = postData;
//   updates['/user-posts/' + uid + '/' + newPostKey] = postData;

//   return firebase.database().ref().update(updates);
// }




