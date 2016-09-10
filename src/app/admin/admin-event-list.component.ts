import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {EventModel} from '../model/event.model';
import {JsrolService} from '../services/jsrol.service';
@Component({
  selector: 'admin-event-list',
  template: `
    <div class="track-list-container">
        <ul class="mdl-list">
            <li class="mdl-list__item mdl-list__item mdl-list__item--three-line" 
            *ngFor="let event of events$ | async" 
            (click)="onEventClick(event)">
                <span class="mdl-list__item-primary-content">
                    <span>{{event.name}}</span>
                </span>
                <span class="mdl-list__item-secondary-content">
                  <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">mode edit</i></a>
                  <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">delete</i></a>
                </span>
            </li>
        </ul>
    </div>`
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
}
