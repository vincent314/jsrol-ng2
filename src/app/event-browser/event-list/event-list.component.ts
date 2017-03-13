import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JsrolService} from '../../services/jsrol.service';
import {Router} from '@angular/router';
import * as moment from 'moment';

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

  constructor(private jsrolService: JsrolService, private router: Router) {
  }

  ngOnInit() {
    const currentDate = moment();

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
