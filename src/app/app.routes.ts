import {AdminComponent} from './components/admin/admin.component';
import {Route, provideRouter} from '@angular/router';
import {DisplayComponent} from './components/display/display.component';
import {MapComponent} from './components/map/map.component';

export const routes:Route[] = [
    {path:'',redirectTo:'display'},
    {path:'display', component: DisplayComponent},
    {path:'map', component: MapComponent},
    {path: 'admin', component: AdminComponent}
];

export const APP_ROUTER_PROVIDERS = [provideRouter(routes)];
