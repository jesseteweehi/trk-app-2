import {
	ModuleWithProviders, NgModule, Optional, SkipSelf 
} from '@angular/core' ;

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule }      from '@angular/common';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { CoreRoutingModule } from './core-routing.module';

import { HeaderComponent } from './header/header.component';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { OrganisationCreateComponent } from './initial-login/organisation-create.component';




@NgModule ({
	imports: [
	 CoreRoutingModule,
	 MaterialModule.forRoot(),
	 FormsModule,
	 CommonModule,
	 ReactiveFormsModule
	 ],
	declarations: [HeaderComponent, InitialLoginComponent, OrganisationCreateComponent],
	exports: [HeaderComponent],
	providers: []
})

export class CoreModule {

}
