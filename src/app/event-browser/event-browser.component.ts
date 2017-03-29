import { Component, ViewChild, OnInit } from '@angular/core';
import { JsrolService } from '../services/jsrol.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import 'material-design-lite/material.js';
import { MdlLayoutComponent } from '@angular-mdl/core';
import * as moment from 'moment';

interface EventBrowserParams {
  eventId: string;
  trackId: string;
}

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
  tracks$ = new BehaviorSubject<TrackModel[]>([]);
  currentTrack$ = new BehaviorSubject<TrackModel>({});
  kml$ = new Subject<string>();

  static fromDate: number = moment().valueOf();

  constructor(private jsRolService: JsrolService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params: EventBrowserParams) => {
        if (!params.eventId) {
          this.loadEventAndRedirect();
        } else if (params.eventId && !params.trackId) {
          this.loadTracksAndRedirect(params.eventId);
        } else {
          this.loadEventAndTrackAndKml(params.eventId, params.trackId);
        }
      });
  }

  loadEventAndRedirect() {
    this.jsRolService.getEvents(EventBrowserComponent.fromDate, 1)
      .subscribe((events: EventModel[]) => {
        if (!_.isEmpty(events)) {
          const event = events[0];
          this.router.navigate([''], {
            queryParams: {
              eventId: event.$key,
            }
          });
        }
      });
  }

  loadTracksAndRedirect(eventId: string) {
    this.jsRolService.getEvent(eventId)
      .subscribe((event) => {
        if (!event.loop1) {
          this.event$.next(event);
          this.tracks$.next([]);
          this.currentTrack$.next(null);
          this.kml$.next(null);
          return;
        }

        this.router.navigate([''], {
          queryParams: {
            eventId: eventId,
            trackId: event.loop1
          }
        })
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
