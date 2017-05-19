import { Action } from '@ngrx/store';


export const actionTypes = {
  LIST_EVENTS: '[EVENT BROWSER] list events',
  LIST_EVENTS_SUCCESS: '[EVENT BROWSER] list events success',
  LIST_EVENTS_FAILED: '[EVENT BROWSER] list event failed',
  LOAD_DEFAULT_EVENT: '[EVENT BROWSER] load default event',
  LOAD_EVENT: '[EVENT BROWSER] load event',
  LOAD_EVENT_SUCCESS: '[EVENT BROWSER] load event success',
  LOAD_TRACK: '[EVENT BROWSER] load track',
  LOAD_TRACK_SUCCESS: '[EVENT BROWSER] load track success',
  LOAD_EVENT_LOOPS: '[EVENT BROWSER] load event loops',
  LOAD_EVENT_LOOPS_SUCCESS: '[EVENT BROWSER] load event loops success',
  LOAD_KML: '[EVENT BROWSER] load kml',
  LOAD_KML_SUCCESS: '[EVENT BROWSER] load kml success',
  CHANGE_TRACK: '[EVENT BROWSER] change track',
  REMOVE_KML: '[EVENT BROWSER] remove kml'
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

export class LoadTrackSuccessAction implements Action {
  type = actionTypes.LOAD_TRACK_SUCCESS;

  constructor(public payload?: TrackModel) {

  }
}

export class LoadEventLoopsAction implements Action {
  type = actionTypes.LOAD_EVENT_LOOPS;

  constructor(public payload: EventModel) {
  }
}

export class LoadEventLoopsSuccessAction implements Action {
  type = actionTypes.LOAD_EVENT_LOOPS_SUCCESS;

  constructor(public payload: TrackModel[]) {
  }
}

export class LoadKmlAction implements Action {
  type = actionTypes.LOAD_KML;

  constructor(public payload: string) {

  }
}

export class LoadKmlSuccessAction implements Action {
  type = actionTypes.LOAD_KML_SUCCESS;

  constructor(public payload?: string) {

  }
}

export class ChangeTrackAction implements Action {
  type = actionTypes.CHANGE_TRACK;

  constructor(public payload?: TrackModel){

  }
}

export class RemoveKmlAction implements Action {
  type = actionTypes.REMOVE_KML;
  constructor(){}
}
