import {Route} from "@angular/router";
import {LearningExperienceComponent} from "./learning-experience/learning-experience.component";
import { MilestoneComponent } from './milestone/milestone.component';


export const routerConfig : Route[] = [
    {
        path: '',
        redirectTo: 'learningexperiences',
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
    }
]