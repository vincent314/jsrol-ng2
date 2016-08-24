import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'event-browser'}
];

export const routing = RouterModule.forRoot(routes);