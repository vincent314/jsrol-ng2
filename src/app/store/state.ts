export interface EventBrowserState {
  events?: EventModel[];
  event?: EventModel;
  track?: TrackModel;
  loops?: TrackModel[];
  kml?: string;
}

export interface AppState {
  eventBrowser: EventBrowserState;
}

export const getEventBrowserState = (state: AppState) => state.eventBrowser;
