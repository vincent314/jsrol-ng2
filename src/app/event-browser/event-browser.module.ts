import {NgModule} from '@angular/core';
import {EventListComponent} from './event-list/event-list.component';
import {MapComponent} from '../map/map.component';
import {TrackDetailsComponent} from './track-details.component';
import {EventDetailsComponent} from './event-details.component';
import {EventBrowserComponent} from './event-browser.component';
import {routing} from './event-browser.routing';
import {BrowserModule} from '@angular/platform-browser';
import {LoopLinkComponent} from './loop-link.component';
@NgModule({
        imports: [BrowserModule, routing],
        declarations: [
            EventListComponent,
            MapComponent,
            TrackDetailsComponent,
            EventDetailsComponent,
            EventBrowserComponent,
            LoopLinkComponent
        ],
        bootstrap: [EventBrowserComponent]
    }
)
export class EventBrowserModule {

}
