import { createSelector } from 'reselect';
import { EventBrowserState, getEventBrowserState } from './state';

const getLoadEvent = (state: EventBrowserState) => state.event;
const getEventList = (state: EventBrowserState) => state.events;
const getTrack = (state: EventBrowserState) => state.track;
const getLoops = (state: EventBrowserState) => state.loops;
const getKml = (state:EventBrowserState)=> state.kml;

export const getEventListSelector = createSelector(getEventBrowserState, getEventList);

export const getLoadEventSelector = createSelector(getEventBrowserState, getLoadEvent);

export const getTrackSelector = createSelector(getEventBrowserState, getTrack);

export const getEventLoopsSelector = createSelector(getEventBrowserState, getLoops);

export const getKmlSelector = createSelector(getEventBrowserState, getKml);
