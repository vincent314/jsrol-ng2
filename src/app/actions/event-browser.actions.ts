import { Action } from '@ngrx/store';


export const actionTypes = {
  LIST_EVENTS: '[EVENT BROWSER] list events',
  LIST_EVENTS_SUCCESS: '[EVENT BROWSER] list events success',
  LIST_EVENTS_FAILED: '[EVENT BROWSER] list event failed',
  LOAD_DEFAULT_EVENT: '[EVENT BROWSER] load default event',
  LOAD_EVENT: '[EVENT BROWSER] load event',
  LOAD_EVENT_SUCCESS: '[EVENT BROWSER] load event success',
  LOAD_TRACK: '[EVENT BROWSER] load track'
};

export class ListEventsAction implements Action {
  type = actionTypes.LIST_EVENTS;
}

export class ListEventSuccessAction implements Action {
  type = actionTypes.LIST_EVENTS_SUCCESS;

  constructor(public payload: EventModel[] = []) {
  }
}

export class LoadDefaultAction implements Action {
  type = actionTypes.LOAD_DEFAULT_EVENT;
}

export class LoadEventAction implements Action {
  type = actionTypes.LOAD_EVENT;

  constructor(public payload: string) {
  }
}

export class LoadTrackAction implements Action {
  type = actionTypes.LOAD_TRACK;

  constructor(public payload: string) {
  }
}

export class LoadEventSuccessAction implements Action {
  type = actionTypes.LOAD_EVENT_SUCCESS;

  constructor(public payload?: EventModel) {
  }
}
