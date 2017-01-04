import {Route} from "@angular/router";
import {LearningExperienceComponent} from "./learning-experience/learning-experience.component";


export const routerConfig : Route[] = [
    {
        path:'home',
        component: LearningExperienceComponent,
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