import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import {RouterModule} from "@angular/router";
import {routerConfig} from "./router.config";

import { AppComponent } from './app.component';
import { LearningExperienceComponent } from './learning-experience/learning-experience.component';
import { MilestoneComponent } from './milestone/milestone.component';


import { LearningExperienceService } from './shared/learning-experience.service';
import { MilestoneService } from './shared/milestone.service';
import { EmbedlyService } from './shared/embedly.service';



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
  method: AuthMethods.Redirect
}

@NgModule({
  declarations: [
    AppComponent,
    LearningExperienceComponent,
    MilestoneComponent
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
  providers: [LearningExperienceService, MilestoneService, EmbedlyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
