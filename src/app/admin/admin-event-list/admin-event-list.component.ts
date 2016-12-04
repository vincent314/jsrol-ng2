import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {EventModel} from '../../model/event.model';
import {JsrolService} from '../../services/jsrol.service';
import {Router} from '@angular/router';
import moment = require('moment');
@Component({
  selector: 'admin-event-list',
  styleUrls: ['admin-event-list.component.scss'],
  templateUrl: './admin-event-list.component.html'
})
export class AdminEventListComponent{
  events$:Observable<EventModel[]>;

  constructor(private jsrolService:JsrolService, private router:Router){}

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
    const fromDate: number = moment('2016-07-01').valueOf();

    this.events$ = this.jsrolService.getEvents(fromDate);
  }

  onEventClick(event:EventModel){
    console.log(event);
  }

  deleteEvent(event:EventModel){
    console.log(`DELETE EVENT ${event.$key}`);
  }
}
