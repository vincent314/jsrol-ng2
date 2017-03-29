import {JsrolService} from '../services/jsrol.service';
import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {actionTypes, ListEventSuccessAction} from '../actions/event-browser.actions';

@Injectable()
export class EventBrowserEffects {

  constructor(private jsrolService: JsrolService, private actions$: Actions) {
  }

  @Effect() listEvents$ = this.actions$
    .ofType(actionTypes.LIST_EVENTS)
    .switchMap(() => this.jsrolService
      .getEvents(moment().valueOf())
      .map(events => new ListEventSuccessAction(events))
      .catch(() => Observable.of(new ListEventSuccessAction()))
    )

}
