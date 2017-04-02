import {actionTypes, ListEventSuccessAction} from './event-browser.actions';
import { EventBrowserState } from '../state';

export const initialState: EventBrowserState = {
  events: []
};

export function reducer(state: EventBrowserState = initialState, action: ListEventSuccessAction):EventBrowserState{
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
    case actionTypes.LOAD_TRACK_SUCCESS:
      return Object.assign({}, state, {
        track: action.payload
      });
    case actionTypes.LOAD_EVENT_LOOPS_SUCCESS:
      return Object.assign({}, state, {
        loops: action.payload
      });
    case actionTypes.LOAD_KML_SUCCESS:
      return Object.assign({}, state, {
        kml: action.payload
      });
    default:
      return state;
  }
}
