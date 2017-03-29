import {Action} from '@ngrx/store';


export const actionTypes = {
  LIST_EVENTS: '[EVENT BROWSER] list events',
  LIST_EVENTS_SUCCESS: '[EVENT BROWSER] list events success',
  LIST_EVENTS_FAILED: '[EVENT BROWSER] list event failed'
};

export class ListEventsAction implements Action {
  type = actionTypes.LIST_EVENTS;
}

export class ListEventSuccessAction implements Action {
  type = actionTypes.LIST_EVENTS_SUCCESS;
  constructor(public payload: EventModel[]=[]){ }
}


