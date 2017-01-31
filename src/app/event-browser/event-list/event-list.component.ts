import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JsrolService} from '../../services/jsrol.service';
import {Router} from '@angular/router';
import {EventModel} from '../../model/event.model';
import moment = require('moment');

@Component({
  selector: 'event-list',
  template: `
    <nav class="mdl-navigation">
      <div class="mdl-navigation__link" *ngFor="let event of events$ | async " title="{{types[event.type]?.label}}">
        <div (click)="onEventClick(event)">
            <div class="mdl-card__title">
                {{event.dateTime | date:'EEEE d MMMM y'}}
            </div>
            <div>{{event.name}}</div>
        </div>
      </div>
    </nav>
`
})
export class EventListComponent {
  events$: Observable<EventModel[]>;
  dateTime: Date;

  types: any = {
    LRFN: {label: 'Friday Night', color: '#0000AA'},
    ROL_PARADE: {label: 'ROL parade', color: '#FFFFFF'},
    RANDOXYGENE: {label: 'Randoxygène', color: '#00AA00'},
    ROL_CITY: {label: 'ROL City', color: '#AA0000'}
  };

  constructor(private jsrolService: JsrolService, private router: Router) {
  }

  ngOnInit() {
    const currentDate = moment('2016-07-01');

    this.dateTime = currentDate.toDate();
    this.events$ = this.jsrolService.getEvents(currentDate.valueOf());
  }

  onEventClick(event: EventModel) {
    this.router.navigate([''], {
      queryParams: {
        eventId: event.$key
      }
    });
  }
}
