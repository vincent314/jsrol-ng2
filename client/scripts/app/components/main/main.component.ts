import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet, RouterLink} from 'angular2/router';
import {CalendarComponent} from '../calendar/calendar.component';
import {TracksComponent} from '../tracks/tracks.component';

@Component({
    selector: 'main',
    styles: [require('./main.component.scss').toString()],
    template: require('./main.component.html'),
    directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
    {path: '/calendar', name: 'Calendar', component: CalendarComponent},
    {path: '/tracks', name: 'Tracks', component: TracksComponent}
])
export class MainComponent {
}