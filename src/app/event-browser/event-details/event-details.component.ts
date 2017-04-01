import {Component, Input} from '@angular/core';
@Component(
    {
        selector: 'event-details',
        template: `
        <div *ngIf="event">
          <span class="mdl-layout-title">{{event.dateTime | date:'EEEE d MMMM y'}}</span>
          <span>{{event.name}}</span>
        </div>
`
    }
)
export class EventDetailsComponent {
    @Input() event: EventModel;
}
