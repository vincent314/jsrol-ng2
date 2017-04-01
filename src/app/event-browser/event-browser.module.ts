import { NgModule } from '@angular/core';
import { EventListComponent } from './event-list/event-list.component';
import { TrackDetailsComponent } from './track-details/track-details.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventBrowserComponent } from './event-browser.component';
import { routing } from './event-browser.routing';
import { BrowserModule } from '@angular/platform-browser';
import { LoopLinkComponent } from './loop-link/loop-link.component';
import { SharedModule } from '../shared/shared.module';
import { MdlModule } from '@angular-mdl/core';
import { EventResolver } from './event.resolver';
import { TrackResolver } from './track.resolver';
import { EventBrowserGuard } from './event-browser.guard';
@NgModule({
    imports: [BrowserModule, routing, SharedModule, MdlModule],
    declarations: [
      EventListComponent,
      TrackDetailsComponent,
      EventDetailsComponent,
      EventBrowserComponent,
      LoopLinkComponent
    ],
    providers: [EventBrowserGuard, EventResolver, TrackResolver],
    bootstrap: [EventBrowserComponent]
  }
)
export class EventBrowserModule {

}
