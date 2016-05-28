import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JsrolService} from '../../services/jsrol.service.ts';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_PROGRESS_CIRCLE_DIRECTIVES} from '@angular2-material/progress-circle';
import Event = jsrol.Event;

@Component({
    selector: 'event-list',
    directives: [MD_LIST_DIRECTIVES, MD_PROGRESS_CIRCLE_DIRECTIVES],
    template: `
    <div [hidden]="events | async">
        <md-spinner></md-spinner>
    </div>
    <md-list>
        <md-list-item *ngFor="let event of events | async ">
            <h3 md-line>{{event.name}}</h3>
            <p md-line>{{event.dateTime}}</p>
        </md-list-item>
    </md-list>
    `
})
export class EventListComponent {
    public events:Observable<Event[]>;
    jsrolService:JsrolService;
    dateTime:Date;

    constructor(jsrolService:JsrolService) {
        this.jsrolService = jsrolService;
        this.dateTime = new Date();
    }

    ngOnInit() {
        this.events = this.jsrolService.getEvents();
    }
}
