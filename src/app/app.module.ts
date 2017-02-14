import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import {RouterModule} from "@angular/router";
import {routerConfig} from "./router.config";

import { LearningExperienceService } from './shared/learning-experience.service';
import { MilestoneService } from './shared/milestone.service';
import { EmbedlyService } from './shared/embedly.service';
import { PostsService } from './shared/posts.service';
import { UrlService } from './shared/url.service';
import { RepliesService } from './shared/replies.service';
import { OrganisationService } from './shared/organisation.service';
import { AuthService } from './global/security/auth.service'
import { UserOrganisationService } from './shared/my-organisation.service';
import { UserMetaService } from './shared/user-meta.service';
import { MySkillsService } from './shared/my-skills.service';

import { AppComponent } from './app.component';
import { LearningExperienceComponent } from './learning-experience/learning-experience.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { PostComponent } from './post/post.component';
import { UrlComponent } from './url/url.component';
import { RepliesComponent } from './replies/replies.component';
import { OrganisationComponent } from './organisation/organisation.component'
import { SkillsComponent } from './organisation/skills/skills.component';
import { AuthStatusComponent } from './global/auth-status/auth-status.component';
import { MySkillsComponent } from './my-skills/my-skills.component';

import { DialogResultExampleDialog } from './my-skills/my-skills.component';


// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyBLF6Pyh4BJPYhQlhO6ZiqBIdQYROec0AI",
    authDomain: "tracking-app-77db8.firebaseapp.com",
    databaseURL: "https://tracking-app-77db8.firebaseio.com",
    storageBucket: "tracking-app-77db8.appspot.com",
    messagingSenderId: "285724076007"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
}

@NgModule({
  declarations: [
    AppComponent,
    LearningExperienceComponent,
    MilestoneComponent,
    PostComponent,
    UrlComponent,
    RepliesComponent,
    OrganisationComponent,
    SkillsComponent,
    AuthStatusComponent,
    MySkillsComponent,
    DialogResultExampleDialog,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routerConfig),
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig) 
  ],
  providers: [
  LearningExperienceService, 
  MilestoneService, 
  EmbedlyService, 
  PostsService,
  UrlService,
  RepliesService,
  OrganisationService,
  AuthService,
  UserOrganisationService,
  UserMetaService
  ],
  entryComponents: [DialogResultExampleDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
