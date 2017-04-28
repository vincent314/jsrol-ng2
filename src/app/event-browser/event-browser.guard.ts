import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../store/state';
import { Store } from '@ngrx/store';
import { LoadDefaultAction } from '../store/event-browser/event-browser.actions';
import { getLoadEventSelector } from '../store/selectors';

@Injectable()
export class EventBrowserGuard implements CanActivate {
  eventLoaded$:Observable<boolean>;


  constructor(private store: Store<AppState>) {
    this.eventLoaded$ = this.store.select(getLoadEventSelector)
      .filter((event) => !!event)
      .map((event) => true);
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    | Promise<boolean>
    | boolean {
    this.store.dispatch(new LoadDefaultAction());
    return this.eventLoaded$;
  }
}
