import {
	ModuleWithProviders, NgModule, Optional, SkipSelf 
} from '@angular/core' ;

import { CoreRoutingModule } from './core-routing.module';

import { HeaderComponent } from './header/header.component';


@NgModule ({
	imports: [CoreRoutingModule],
	declarations: [HeaderComponent],
	exports: [HeaderComponent],
	providers: []
})

export class CoreModule {

}
