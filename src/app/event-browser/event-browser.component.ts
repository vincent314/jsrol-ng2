import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {TrackListComponent} from '../components/trackList/trackList.component';
import {EventListComponent} from './event-list.component';
import {JsrolService} from '../services/jsrol.service';
import {MapComponent} from '../map/map.component';
import {MDL} from '../directives/MdlUpgrade.directive';
import {Params, ROUTER_DIRECTIVES, Router} from '@angular/router';
import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {TrackDetailsComponent} from './track-details.component';
import {EventDetailsComponent} from './event-details.component';
require('material-design-lite/material.js');
import EventModel = jsrol.EventModel;
import TrackModel = jsrol.TrackModel;

@Component({
    directives: [TrackListComponent, EventListComponent, MapComponent, MDL, ROUTER_DIRECTIVES, TrackDetailsComponent, EventDetailsComponent],
    providers: [JsrolService],
    template: `<!-- Always shows a header, even in smaller screens. -->
    <div mdl #mdlLayout class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <!-- spinner -->
      <div class="mdl-progress mdl-js-progress mdl-progress__indeterminate" [hidden]="currentEvent"></div>
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <event-details [event]="currentEvent"></event-details>          
        </div>
        <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
            <a *ngFor="let loop of loops; let i = index" class="mdl-layout__tab"
                 [class.is-active]="loop.$key == currentTrack?.$key"
                [routerLink]="['']" [queryParams]="{eventId:currentEvent.$key,trackId:loop.$key}">
                Boucle {{i + 1}} (<i class="mdi mdi-math-compass"></i> {{loop.distance | number}} km)
            </a>
        </div>
      </header>
      <div class="mdl-layout__drawer" #drawer>
        <event-list (click)="onEventClick()"></event-list>
      </div>
      <main class="mdl-layout__content">
        <map [trackId]="trackId$ | async" (trackLoaded)="onTrackLoaded($event)"></map>
      </main>
    </div>`
})
export class EventBrowserComponent implements OnInit {
    @ViewChild('mdlLayout') mdlLayout: ElementRef;
    currentEvent: EventModel;
    currentTrack: TrackModel;
    loops: TrackModel[];
    trackId$: Observable<string>;

    constructor(private jsRolService: JsrolService, private router: Router) {

    }

    ngOnInit() {
        console.log('EVENT BROWSER ON INIT');
        this.loadCurrentEventAndLoop();

        this.trackId$ = this.router.routerState.queryParams
            .map((params: Params) => params['trackId']);
    }

    private loadCurrentEventAndLoop(): void {
        this.router.routerState.queryParams
            .flatMap((params: Params): Observable<EventModel> => {
                const eventId: string = params['eventId'];

                if (!eventId) {
                    return this.jsRolService.getEvents(new Date().getTime(), 1)
                        .map((events: EventModel[]) => {
                            if (!_.isEmpty(events)) {
                                this.router.navigate(['event-browser'], {
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
                if (loopObservables.length == 0) {
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
