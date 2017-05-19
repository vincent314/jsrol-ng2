import { JsrolService } from '../../services/jsrol.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import * as fromAction from './event-browser.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import * as _ from 'lodash';

@Injectable()
export class EventBrowserEffects {

  constructor(private jsrolService: JsrolService, private actions$: Actions, private store: Store<AppState>) {
  }

  @Effect() listEvents$ = this.actions$
    .ofType(fromAction.actionTypes.LIST_EVENTS)
    .switchMap(() => this.jsrolService
      .getEvents(moment().valueOf())
      .map(events => new fromAction.ListEventSuccessAction(events))
      .catch(() => Observable.of(new fromAction.ListEventSuccessAction()))
    );

  @Effect() loadEvent$ = this.actions$
    .ofType(fromAction.actionTypes.LOAD_EVENT)
    .switchMap((action: fromAction.LoadEventAction) => this.jsrolService.getEvent(action.payload)
      .do(event => {
        if (event.loop1) {
          this.store.dispatch(new fromAction.LoadTrackAction(<string>event.loop1));
        }
      })
      .do(event => {
        this.store.dispatch(new fromAction.LoadEventLoopsAction(event))
      })
      .map((event) => new fromAction.LoadEventSuccessAction(event))
      .catch(() => Observable.of(new fromAction.LoadEventSuccessAction()))
    );

  @Effect() loadTrack$ = this.actions$
    .ofType(fromAction.actionTypes.LOAD_TRACK)
    .switchMap((action: fromAction.LoadTrackAction) => this.jsrolService.getTrack(action.payload)
      .do(track => this.store.dispatch(new fromAction.LoadKmlAction(track.kml)))
      .map(track => new fromAction.LoadTrackSuccessAction(track))
      .catch(() => Observable.of(new fromAction.LoadTrackSuccessAction()))
    );

  @Effect() loadEventLoops$ = this.actions$
    .ofType(fromAction.actionTypes.LOAD_EVENT_LOOPS)
    .switchMap((action: fromAction.LoadEventLoopsAction) => this.jsrolService.getEventLoops(action.payload)
      .map(loops => new fromAction.LoadEventLoopsSuccessAction(loops))
      .catch(() => Observable.of(new fromAction.LoadEventSuccessAction()))
    );

  @Effect() loadKml$ = this.actions$
    .ofType(fromAction.actionTypes.LOAD_KML)
    .switchMap((action: fromAction.LoadKmlAction) => this.jsrolService.getKml(action.payload)
      .map(kml => new fromAction.LoadKmlSuccessAction(kml.$value))
      .catch(() => Observable.of(new fromAction.LoadKmlSuccessAction()))
    );

  @Effect() loadDefault$ = this.actions$
    .ofType(fromAction.actionTypes.LOAD_DEFAULT_EVENT)
    .switchMap(() => {
      const fromDate = moment().valueOf();
      return this.jsrolService.getEvents(fromDate, 1)
        .map((events) => _.head(events))
        .map((event) => new fromAction.LoadEventSuccessAction(event));
    });
}
