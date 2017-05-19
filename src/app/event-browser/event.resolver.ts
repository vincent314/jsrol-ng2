import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JsrolService } from '../services/jsrol.service';
import { AppState } from '../store/state';
import { Store } from '@ngrx/store';
import { LoadEventAction } from '../store/event-browser/event-browser.actions';
import { getLoadEventSelector } from '../store/selectors';

@Injectable()
export class EventResolver implements Resolve<EventModel> {

  constructor(private jsrolService: JsrolService, private store:Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): EventModel | Observable<EventModel> | Promise<EventModel> {
    const {eventId} = <EventBrowserParams>route.queryParams;

    const result = this.store.select(getLoadEventSelector)
      .filter(event => !!event)
      .take(1);

    this.store.dispatch(new LoadEventAction(eventId));
    return result;
  }
}
