import {Component, ViewChild, Renderer, ElementRef} from '@angular/core';
import {TrackListComponent} from '../components/trackList/trackList.component';
import {EventListComponent} from './event-list.component';
import {JsrolService} from '../services/jsrol.service';
import {MapComponent} from '../components/map/map.component';
import {MDL} from '../directives/MdlUpgrade.directive';
import {ActivatedRoute, Params} from '@angular/router';
import * as _ from 'lodash';
require('material-design-lite/material.js');
import Event = jsrol.EventModel;
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
    directives: [TrackListComponent, EventListComponent, MapComponent, MDL],
    providers: [JsrolService],
    pipes: [AsyncPipe],
    template: `<!-- Always shows a header, even in smaller screens. -->
    <div mdl #mdlLayout class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <span class="mdl-layout-title">{{(currentEvent$ | async)?.name}}</span>
          <span>{{(currentEvent$ | async)?.dateTime | date:'dd/MM/yyyy'}}</span>
            <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <a class="mdl-navigation__link" [hidden]="!(loop1 | async)" >Boucle 1</a>
            <a class="mdl-navigation__link" [hidden]="!(loop2 | async)" >Boucle 2</a>
            <a class="mdl-navigation__link" [hidden]="!(loop3 | async)" >Boucle 3</a>
          </nav>
        </div>
      </header>
      <div class="mdl-layout__drawer" #drawer>
        <event-list (click)="onEventClick()"></event-list>
      </div>
      <main class="mdl-layout__content">
        <!--<div [hidden]="currentEvent$ | async" class="page-content">-->
            <!--<p>Pas de carte à afficher</p>-->
        <!--</div>-->
        <!--<div [hidden]="!currentEvent$ | async" class="page-content">-->
            <!--<map [event]="currentEvent$"></map>-->
        <!--</div>-->
      </main>
    </div>`
})
export class EventBrowserComponent {
    @ViewChild('mdlLayout') mdlLayout: ElementRef;
    currentEvent$: Observable<Event>;
    loop1$: Observable<string>;
    loop2$: Observable<string>;
    loop3$: Observable<string>;

    constructor(private route: ActivatedRoute, private jsRolService: JsrolService, private renderer: Renderer) {

    }

    ngOnInit() {
        this.loadCurrentEvent();
    }

    private loadCurrentEvent() {
        this.currentEvent$ = this.route.params
            .flatMap((params: Params): Observable<Event> => {
                const eventId: string = params['eventId'];

                if (!eventId) {
                    return this.jsRolService.getEvents(new Date().getTime(), 1)
                        .map((events: Event[]) => {
                            if (!_.isEmpty(events)) {
                                return events[0];
                            } else {
                                return null;
                            }
                        });
                } else {
                    return this.jsRolService.getEvent(eventId);
                }
            });

        this.loop1$ = this.currentEvent$.map((event: Event) => event.loop1 as string);
        this.loop2$ = this.currentEvent$.map((event: Event) => event.loop2 as string);
        this.loop3$ = this.currentEvent$.map((event: Event) => event.loop3 as string);
        this.currentEvent$.subscribe((event: Event) => {
            console.log(event);
        });
    }

    onEventClick() {
        this.mdlLayout.nativeElement.MaterialLayout.toggleDrawer();
    }
}
