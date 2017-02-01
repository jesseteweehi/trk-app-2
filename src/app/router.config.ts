import { Route } from "@angular/router";
import { LearningExperienceComponent } from "./learning-experience/learning-experience.component";
import { MilestoneComponent } from './milestone/milestone.component';
import { OrganisationComponent } from "./organisation/organisation.component";
import { ApprovedUsersComponent } from "./organisation/approved-users/approved-users.component";
import { SkillsComponent } from './organisation/skills/skills.component';


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
                path: ':org',
                component: LearningExperienceComponent,
            },
            {
                path: ':org/milestones/:id',
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
            },
            {
                path: 'skills/:id',
                component: SkillsComponent,
            }
        ]
    }
]