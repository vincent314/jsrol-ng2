import {actionTypes, ListEventSuccessAction} from '../actions/event-browser.actions';

export interface State {
  events: EventModel[];
}

export const initialState: State = {events: []};

export const getEventListSelector = (state: State) => state.events;

export function reducer(state: State = initialState, action: ListEventSuccessAction):State{
  console.log('ACTION:', action);
  switch (action.type) {
    case actionTypes.LIST_EVENTS_SUCCESS:
      return Object.assign({}, {
        events: action.payload
      });
    default:
      return state;
  }
}
