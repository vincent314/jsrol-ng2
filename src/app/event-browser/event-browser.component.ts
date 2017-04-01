import { Component, OnInit, ViewChild } from '@angular/core';
import { JsrolService } from '../services/jsrol.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import 'material-design-lite/material.js';
import { MdlLayoutComponent } from '@angular-mdl/core';
import { Store } from '@ngrx/store';
import { AppState, getLoadEventSelector } from '../reducers/index';
import { EventBrowserGuard } from './event-browser.guard';

@Component({
  providers: [JsrolService],
  styleUrls: [
    './event-browser.component.scss'
  ],
  templateUrl: './event-browser.component.html'
})
export class EventBrowserComponent implements OnInit {
  @ViewChild('mdlLayout') mdlLayout: MdlLayoutComponent;
  event$ = new BehaviorSubject<EventModel>({});
  currentTrack$ = new BehaviorSubject<TrackModel>({});

  tracks$ = new BehaviorSubject<TrackModel[]>([]);

  kml$ = new Subject<string>();

  constructor(private jsRolService: JsrolService, private route: ActivatedRoute, private router: Router, private store: Store<AppState>) {
    // store.select(getLoadEventSelector)
    //   .subscribe(event => this.event$.next(event));
  }

  ngOnInit() {

    this.route.data.subscribe((data: { event: EventModel, track: TrackModel }) => {
      const {event,track} = data;
      this.event$.next(event);
      this.currentTrack$.next(track);
    });
  }

  loadEventAndTrackAndKml(eventId: string, trackId: string) {
    this.jsRolService.getEvent(eventId)
      .do(event => this.event$.next(event))
      .flatMap(event => this.jsRolService.getEventLoops(event))
      .map((loops: TrackModel[]) => {
        this.tracks$.next(loops);
        const loop: TrackModel = _.find(loops, {$key: trackId});
        this.currentTrack$.next(loop);
        return loop.kml;
      })
      .flatMap((kmlId) => this.jsRolService.getKml(kmlId))
      .map((kmlObj) => kmlObj.$value)
      .subscribe((kml) => this.kml$.next(kml));
  }

  onEventClick() {
    this.mdlLayout.toggleDrawer();
  }

  onTrackLoaded(track: TrackModel) {
    this.currentTrack$.next(track);
  }
}
