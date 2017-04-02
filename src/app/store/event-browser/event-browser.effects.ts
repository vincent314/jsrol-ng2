import { JsrolService } from '../../services/jsrol.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import {
  actionTypes,
  ListEventSuccessAction,
  LoadEventAction, LoadEventLoopsAction,
  LoadEventLoopsSuccessAction,
  LoadEventSuccessAction, LoadKmlAction, LoadKmlSuccessAction,
  LoadTrackAction,
  LoadTrackSuccessAction
} from './event-browser.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../state';

@Injectable()
export class EventBrowserEffects {

  constructor(private jsrolService: JsrolService, private actions$: Actions, private store: Store<AppState>) {
  }

  @Effect() listEvents$ = this.actions$
    .ofType(actionTypes.LIST_EVENTS)
    .switchMap(() => this.jsrolService
      .getEvents(moment().valueOf())
      .map(events => new ListEventSuccessAction(events))
      .catch(() => Observable.of(new ListEventSuccessAction()))
    );

  @Effect() loadEvent$ = this.actions$
    .ofType(actionTypes.LOAD_EVENT)
    .switchMap((action: LoadEventAction) => this.jsrolService.getEvent(action.payload)
      .do(event => {
        if (event.loop1) {
          this.store.dispatch(new LoadTrackAction(<string>event.loop1));
        }
      })
      .map((event) => new LoadEventSuccessAction(event))
      .catch(() => Observable.of(new LoadEventSuccessAction()))
    );

  @Effect() loadTrack$ = this.actions$
    .ofType(actionTypes.LOAD_TRACK)
    .switchMap((action: LoadTrackAction) => this.jsrolService.getTrack(action.payload)
      .do(track => this.store.dispatch(new LoadKmlAction(track.kml)))
      .map(track => new LoadTrackSuccessAction(track))
      .catch(() => Observable.of(new LoadTrackSuccessAction()))
    );

  @Effect() loadEventLoops$ = this.actions$
    .ofType(actionTypes.LOAD_EVENT_LOOPS)
    .switchMap((action: LoadEventLoopsAction) => this.jsrolService.getEventLoops(action.payload)
      .map(loops => new LoadEventLoopsSuccessAction(loops))
      .catch(() => Observable.of(new LoadEventSuccessAction()))
    );

  @Effect() loadKml$ = this.actions$
    .ofType(actionTypes.LOAD_KML)
    .switchMap((action: LoadKmlAction) => this.jsrolService.getKml(action.payload)
      .map(kml => new LoadKmlSuccessAction(kml.$value))
      .catch(() => Observable.of(new LoadKmlSuccessAction()))
    );
}
