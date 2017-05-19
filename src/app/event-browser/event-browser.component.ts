import { Component, OnInit, ViewChild } from '@angular/core';
import { JsrolService } from '../services/jsrol.service';
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
  tracks$: Observable<TrackModel[]>;
  kml$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.event$ = store.select(fromSelector.getLoadEventSelector);
    this.currentTrack$ = store.select(fromSelector.getTrackSelector);
    this.tracks$ = store.select(fromSelector.getEventLoopsSelector);

    this.kml$ = this.currentTrack$
      .filter(track => !!track)
      .switchMap(track => {
        store.dispatch(new fromAction.LoadKmlAction(track.kml));
        return store.select(fromSelector.getKmlSelector);
      });
  }

  ngOnInit(): void {
    this.store.select(fromSelector.getLoadEventSelector)
      .subscribe((event) => {
        this.store.dispatch(new fromAction.LoadEventLoopsAction(event));
        this.store.dispatch(new fromAction.RemoveKmlAction());
      });
    this.store.select(fromSelector.getLoopsSelector)
      .filter((loops) => !!loops)
      .subscribe((loops) => {
        this.store.dispatch(new fromAction.ChangeTrackAction(loops[0]));
      })
  }

  onEventClick() {
    this.mdlLayout.toggleDrawer();
  }
}
