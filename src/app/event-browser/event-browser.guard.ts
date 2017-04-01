import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsrolService } from '../services/jsrol.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class EventBrowserGuard implements CanActivate {
  static fromDate: number = moment().valueOf();

  constructor(private jsrolService: JsrolService, private router: Router) {

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    | Promise<boolean>
    | boolean {
    const {eventId, trackId} = <EventBrowserParams>route.queryParams;

    if (!eventId) {
      return this.getNextEvent();
    } else if (eventId && !trackId) {
      return this.getEvent(eventId);
    } else {
      return true;
    }
  }

  getNextEvent(): Observable<EventModel> {
    return this.jsrolService.getEvents(EventBrowserGuard.fromDate, 1)
      .map((events: EventModel[]) => {
        if (!_.isEmpty(events)) {
          const event = events[0];

          this.router.navigate([''], {
            queryParams: {
              eventId: event.$key,
            }
          });
        }
        return false;
      });
  }

  getEvent(eventId: string) {
    return this.jsrolService.getEvent(eventId)
      .map((event) => {
        if (!event.loop1) {
          return true;
        }

        this.router.navigate([''], {
          queryParams: {
            eventId: eventId,
            trackId: event.loop1
          }
        });
        return false;
      });
  }
}
