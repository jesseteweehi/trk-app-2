import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
