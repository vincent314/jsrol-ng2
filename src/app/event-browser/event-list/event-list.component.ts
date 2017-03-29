import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { ListEventsAction } from '../../actions/event-browser.actions';
import { AppState, getEventListSelector } from '../../reducers/index';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html'
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

  constructor(private router: Router, private store:Store<AppState>) {
    this.events$ = this.store.select(getEventListSelector)
      .do((events)=> console.log('Events:', events));
  }

  ngOnInit() {
    const currentDate = moment();

    this.dateTime = currentDate.toDate();

    this.store.dispatch(new ListEventsAction());
  }

  onEventClick(event: EventModel) {
    this.router.navigate([''], {
      queryParams: {
        eventId: event.$key
      }
    });
  }
}
