import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JsrolService } from '../services/jsrol.service';

@Injectable()
export class EventResolver implements Resolve<Event> {

  constructor(private jsrolService: JsrolService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Event | Observable<Event> | Promise<Event> {
    const {eventId} = <EventBrowserParams>route.queryParams;

    return this.jsrolService.getEvent(eventId)
      .take(1);
  }
}
