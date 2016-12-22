import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import {ReactiveFormsModule} from "@angular/forms";

import {LearningExperienceService} from "./shared/model/learning-experience.service";

import { AppComponent } from './app.component';
import { LearningExperienceListComponent } from './learning-experience-list/learning-experience-list.component';
import { NewLearningExperienceComponent } from './new-learning-experience/new-learning-experience.component';

export const FirebaseConfig = {
    apiKey: "AIzaSyBLF6Pyh4BJPYhQlhO6ZiqBIdQYROec0AI",
    authDomain: "tracking-app-77db8.firebaseapp.com",
    databaseURL: "https://tracking-app-77db8.firebaseio.com",
    storageBucket: "tracking-app-77db8.appspot.com",
    messagingSenderId: "285724076007"
};

export const AuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
}


@NgModule({
  declarations: [
    AppComponent,
    LearningExperienceListComponent,
    NewLearningExperienceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(FirebaseConfig, AuthConfig) 
  ],
  providers: [LearningExperienceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
