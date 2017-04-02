import { Component, OnInit, ViewChild } from '@angular/core';
import { JsrolService } from '../services/jsrol.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'material-design-lite/material.js';
import { MdlLayoutComponent } from '@angular-mdl/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/index';
import { Observable } from 'rxjs/Observable';
import * as fromSelector from '../store/selectors';
import * as fromAction from '../store/event-browser/event-browser.actions';

@Component({
  providers: [JsrolService],
  styleUrls: [
    './event-browser.component.scss'
  ],
  templateUrl: './event-browser.component.html'
})
export class EventBrowserComponent implements OnInit {
  @ViewChild('mdlLayout') mdlLayout: MdlLayoutComponent;
  event$: Observable<EventModel>;
  currentTrack$: Observable<TrackModel>;
  tracks$: Observable<EventModel>;
  kml$: Observable<EventModel>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.event$ = store.select(fromSelector.getLoadEventSelector);
    this.currentTrack$ = store.select(fromSelector.getTrackSelector);

    this.tracks$ = this.event$.switchMap((event: EventModel) => {
      store.dispatch(new fromAction.LoadEventLoopsAction(event));
      return store.select(fromSelector.getEventLoopsSelector);
    });

    this.kml$ = this.currentTrack$
      .filter(track => !!track)
      .switchMap(track => {
        store.dispatch(new fromAction.LoadKmlAction(track.kml));
        return store.select(fromSelector.getKmlSelector);
      });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(({eventId, trackId}) => {
      this.store.dispatch(new fromAction.LoadEventAction(eventId));
      if (trackId) {
        this.store.dispatch(new fromAction.LoadTrackAction(trackId));
      }
    });
  }

  onEventClick() {
    this.mdlLayout.toggleDrawer();
  }
}
