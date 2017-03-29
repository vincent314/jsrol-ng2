import * as fromEventBrowser from './event-browser.reducer';
import * as fromRouterStore from '@ngrx/router-store';
import { createSelector } from 'reselect';

export interface AppState {
  eventBrowser: fromEventBrowser.State;
  router: fromRouterStore.RouterState;
}

export const reducers = {
  eventBrowser: fromEventBrowser.reducer,
  router: fromRouterStore.routerReducer
};

export const getEventBrowserState = (state: AppState) => state.eventBrowser;

export const getEventListSelector = createSelector(getEventBrowserState, fromEventBrowser.getEventListSelector);
