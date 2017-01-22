import { Route } from "@angular/router";
import { LearningExperienceComponent } from "./learning-experience/learning-experience.component";
import { MilestoneComponent } from './milestone/milestone.component';
import { OrganisationComponent } from "./organisation/organisation.component";
import { ApprovedUsersComponent } from "./organisation/approved-users/approved-users.component";


export const routerConfig : Route[] = [
    {
        path: '',
        redirectTo: 'organisations',
        pathMatch: 'full'
    },
    {
        path:'learningexperiences',
        children:[
            {
                path: '',
                component: LearningExperienceComponent,
            },
            {
                path: ':id',
                component: MilestoneComponent,
            }
        ]
    },
    {
        path:'organisations',
        children:[
            {
                path: '',
                component: OrganisationComponent,
            },
            {
                path: 'approvedusers/:id',
                component: ApprovedUsersComponent,
            }
        ]
    }
]