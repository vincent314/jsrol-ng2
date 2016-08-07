import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JsrolService} from '../services/jsrol.service.ts';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import Event = jsrol.EventModel;

@Component({
    selector: 'event-list',
    pipes: [DatePipe],
    template: `
    <nav class="mdl-navigation">
      <div class="mdl-navigation__link" *ngFor="let event of events | async ">
        <div (click)="onEventClick(event)">
            <div class="mdl-card__title">
                <h6 class="mdl-card__title-text">{{event.name}}</h6>
            </div>
            <div>{{event.dateTime | date:'dd/MM/yyyy'}}</div>
        </div>
      </div>
    </nav>
`
})
export class EventListComponent {
    events: Observable<Event[]>;
    dateTime: Date;

    constructor(private jsrolService: JsrolService, private router: Router) {
    }

    ngOnInit() {
        this.dateTime = new Date();
        this.events = this.jsrolService.getEvents(new Date().getTime());
    }

    onEventClick(event: Event) {
        this.router.navigate([`/display/${event.$key}`]);
    }
}
