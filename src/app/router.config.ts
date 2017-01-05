import {Route} from "@angular/router";
import {LearningExperienceComponent} from "./learning-experience/learning-experience.component";
import { MilestoneComponent } from './milestone/milestone.component';


export const routerConfig : Route[] = [
    {
        path:'learning-experiences',
        component: LearningExperienceComponent,
        children: [
            {
                path: ':id',
                component: MilestoneComponent,
            }]
    },
    {
        path: '',
        redirectTo: 'learning-experiences',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'learning-experiences'
    }
];