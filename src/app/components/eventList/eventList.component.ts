import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JsrolService} from '../../services/jsrol.service.ts';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_PROGRESS_CIRCLE_DIRECTIVES} from '@angular2-material/progress-circle';
import Event = jsrol.Event;
import {Router} from '@angular/router';

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
            <p md-line>
                <button md-mini-fab color="primary" (click)="onLoopClick(event.loop1)">1</button>
                <button md-mini-fab color="primary" (click)="onLoopClick(event.loop2)">2</button>
            </p>
        </md-list-item>
    </md-list>
    `
})
export class EventListComponent {
    public events:Observable<Event[]>;
    jsrolService:JsrolService;
    dateTime:Date;

    constructor(jsrolService:JsrolService, router:Router {
        this.jsrolService = jsrolService;
        this.router = router;
    }

    ngOnInit() {
        this.dateTime = new Date();
        this.events = this.jsrolService.getEvents();
    }

    onLoopClick(loop:string){
        this.router.navigate('/map')
    }
}
