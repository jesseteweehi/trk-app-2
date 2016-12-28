import {Route} from "@angular/router";
import { LearningExperienceComponent } from './learning-experience/learning-experience.component';
import { MilestonesComponent } from './milestones/milestones.component';

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
        		component: MilestonesComponent,
        	}
        ]
    }
]

