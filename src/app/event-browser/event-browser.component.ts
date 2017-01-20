import {Component, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {JsrolService} from '../services/jsrol.service';
import {Params, ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {Observable, Subscription, BehaviorSubject} from 'rxjs';
import 'material-design-lite/material.js';
import moment = require('moment');

@Component({
  providers: [JsrolService],
  styles: [
    require('./event-browser.component.scss')
  ],
  template: require('./event-browser.component.html')
})
export class EventBrowserComponent implements OnInit, OnDestroy {
  @ViewChild('mdlLayout') mdlLayout: ElementRef;
  event$ = new BehaviorSubject<EventModel>({});
  tracks$ = new BehaviorSubject<TrackModel[]>([]);
  currentTrack$ = new BehaviorSubject<TrackModel>({});

  eventSubscription: Subscription;
  tracksSubscription: Subscription;
  currentTrackSubscription: Subscription;

  constructor(private jsRolService: JsrolService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.eventSubscription = this.loadEvents();
    this.tracksSubscription = this.loadTracks();
    this.currentTrackSubscription = this.loadCurrentTrack();
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
    this.tracksSubscription.unsubscribe();
    this.currentTrackSubscription.unsubscribe();
  }

  private loadEvents(): Subscription {
    const fromDate: number = moment('2016-07-01').valueOf();

    // EVENTS
    return this.route.queryParams
      .flatMap((params: Params): Observable<Object> => {
        const eventId: string = params['eventId'];
        if (!eventId) {
          return this.jsRolService.getEvents(fromDate, 1)
            .map((events: EventModel[]) => {
              if (!_.isEmpty(events)) {
                this.router.navigate([''], {
                  queryParams: {
                    eventId: events[0].$key
                  }
                });
              }
              return null;
            });
        } else {
          return this.jsRolService.getEvent(eventId);
        }
      })
      .subscribe({
        next: (event: EventModel) => {
          if (!event) {
            return;
          }
          this.event$.next(event);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  private loadTracks(): Subscription {
    // TRACKS
    return this.event$
      .flatMap(this.jsRolService.getEventLoops.bind(this.jsRolService))
      .subscribe({
        next: (loops: TrackModel[]) => {
          this.tracks$.next(loops);
          this.currentTrack$.next(loops[0]);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  private loadCurrentTrack(): Subscription {
    return this.route.queryParams
      .flatMap((params: Params) => {
        const trackId: string = params['trackId'];
        if (trackId) {
          return this.jsRolService.getTrack(trackId);
        } else {
          return Observable.empty();
        }
      })
      .subscribe({
        next: (track: TrackModel) => {
          this.currentTrack$.next(track);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  onEventClick() {
    this.mdlLayout.nativeElement.MaterialLayout.toggleDrawer();
  }

  onTrackLoaded(track: TrackModel) {
    this.currentTrack$.next(track);
  }
}
