import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {MapComponent} from '../map/map.component';
import TrackModel = jsrol.TrackModel;
@Component({
    selector: 'event-map',
    directives: [MapComponent],
    template: `
        <map [trackId]="trackId$ | async"></map>
`
})
export class EventTrackComponent implements OnInit {
    trackId$:Observable<string>;

    constructor(private route:ActivatedRoute) {

    }

    ngOnInit() {
        this.trackId$ = this.route.params
            .map((params:Params) => params['trackId']);
    }
}