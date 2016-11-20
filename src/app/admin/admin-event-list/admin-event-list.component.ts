import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {EventModel} from '../../model/event.model';
import {JsrolService} from '../../services/jsrol.service';
@Component({
  selector: 'admin-event-list',
  templateUrl: './admin-event-list.component.html'
})
export class AdminEventListComponent{
  events$:Observable<EventModel[]>;

  constructor(private jsrolService:JsrolService){}

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
    this.events$ = this.jsrolService.getEvents(new Date().getTime());
  }

  onEventClick(event:EventModel){
    console.log(event);
  }

  deleteEvent(event:EventModel){
    console.log(`DELETE EVENT ${event.$key}`);
  }
}
