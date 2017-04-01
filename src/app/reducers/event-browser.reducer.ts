import {actionTypes, ListEventSuccessAction} from '../actions/event-browser.actions';

export interface State {
  events: EventModel[];
  event?: EventModel;
}

export const initialState: State = {events: []};

export const getEventListSelector = (state: State) => state.events;

export const getLoadEvent = (state:State) => state.event;

export function reducer(state: State = initialState, action: ListEventSuccessAction):State{
  console.log('ACTION:', action);
  switch (action.type) {
    case actionTypes.LIST_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        events: action.payload
      });
    case actionTypes.LOAD_EVENT_SUCCESS:
      return Object.assign({},state, {
        event: action.payload
      });
    default:
      return state;
  }
}
