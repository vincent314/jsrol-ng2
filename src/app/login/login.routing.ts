import {RouterModule, Route} from '@angular/router';
import {LoginComponent} from './login.component';
import {LogoutComponent} from './logout.component';
const routes: Route[] = [
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent}
];

export const routing = RouterModule.forChild(routes);