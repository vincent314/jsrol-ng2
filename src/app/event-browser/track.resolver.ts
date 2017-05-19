import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../store/state';
import { Store } from '@ngrx/store';
import { LoadTrackAction } from '../store/event-browser/event-browser.actions';
import { getTrackSelector } from '../store/selectors';
@Injectable()
export class TrackResolver implements Resolve<TrackModel> {
  constructor(private store: Store<AppState>) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrackModel>
    | Promise<TrackModel>
    | TrackModel {

    const {trackId} = <EventBrowserParams>route.queryParams;
    this.store.dispatch(new LoadTrackAction(trackId));
    return this.store.select(getTrackSelector)
      .filter(track => !!track)
      .take(1);
  }
}
