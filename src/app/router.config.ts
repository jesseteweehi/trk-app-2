import {Route} from "@angular/router";
import {LearningExperienceComponent} from "./learning-experience/learning-experience.component";


export const routerConfig : Route[] = [
    {
        path:'learning-experiences',
        component: LearningExperienceComponent,
        children: [
            {
                path: ':id',
                component: MileStoneComponent,
            }
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];