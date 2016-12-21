import { NgModule }            from '@angular/core';
import { RouterModule, Routes }        from '@angular/router';
import { MaterialModule } from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { OrganisationCreateComponent } from './initial-login/organisation-create.component';

export const routes: Routes = [
   { path: 'login', component: InitialLoginComponent },
   { path: 'orgcreate', component: OrganisationCreateComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
