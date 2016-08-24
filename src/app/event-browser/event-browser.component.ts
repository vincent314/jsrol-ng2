import {Component, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {JsrolService} from '../services/jsrol.service';
import {Params, ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {Observable, Subscription} from 'rxjs';
import 'material-design-lite/material.js';
import './event-browser.component.scss';
import EventModel = jsrol.EventModel;
import TrackModel = jsrol.TrackModel;

@Component({
    providers: [JsrolService],
    template: require('./event-browser.component.html')
})
export class EventBrowserComponent implements OnInit, OnDestroy {
    @ViewChild('mdlLayout') mdlLayout: ElementRef;
    currentEvent: EventModel;
    currentTrack: TrackModel;
    loops: TrackModel[];
    trackId$: Observable<string>;
    sub: Subscription;

    constructor(private jsRolService: JsrolService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.loadCurrentEventAndLoop();

        this.trackId$ = this.route.queryParams
            .map((params: Params) => params['trackId']);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private loadCurrentEventAndLoop(): void {
        this.sub = this.route.queryParams
            .flatMap((params: Params): Observable<Object> => {
                const eventId: string = params['eventId'];
                if (!eventId) {
                    return this.jsRolService.getEvents(new Date().getTime(), 1)
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
            .do((event: EventModel) => {
                this.currentEvent = event;
                this.currentTrack = null;
            })
            .flatMap((event: EventModel) => {
                const loopObservables = this.mapLoops(event);
                if (loopObservables.length === 0) {
                    this.loops = [];
                }
                return Observable.zip(...loopObservables);
            })
            .subscribe((loops: TrackModel[]) => {
                this.loops = loops;
            });
    }

    private mapLoops(event: EventModel): Observable<TrackModel>[] {
        const loops: Observable<TrackModel>[] = [];

        if (!event) {
            return loops;
        }

        var push = (loop: string) => loops.push(this.jsRolService.getTrack(loop));

        if (event.loop1) {
            push(event.loop1 as string);
        }
        if (event.loop2) {
            push(event.loop2 as string);
        }
        if (event.loop3) {
            push(event.loop3 as string);
        }
        return loops;
    }

    onEventClick() {
        this.mdlLayout.nativeElement.MaterialLayout.toggleDrawer();
    }

    onTrackLoaded(track: TrackModel) {
        this.currentTrack = track;
    }
}
