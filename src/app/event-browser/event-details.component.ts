import {Component, Input} from '@angular/core';
import EventModel = jsrol.EventModel;
@Component(
    {
        selector: 'event-details',
        template: `
        <div *ngIf="event">
          <span class="mdl-layout-title">{{event.name}}</span>
          <span><i class="mdi mdi-calendar"></i>{{event.dateTime | date:'dd/MM/yyyy'}}</span>
        </div>
`
    }
)
export class EventDetailsComponent{
    @Input() event:EventModel;
}