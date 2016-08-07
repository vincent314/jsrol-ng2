import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JsrolService} from '../../services/jsrol.service.ts';
import Track = jsrol.TrackModel;
import {Router} from '@angular/router';

@Component({
    selector: 'track-list',
    template: `
    <div class="track-list-container">
        <ul class="mdl-list">
            <li class="mdl-list__item" *ngFor="let track of tracks | async" (click)="onTrackClick(track)">
                <h3>{{track.name}}</h3>
                <p>{{track.type}}</p>
                <p>{{track.distance | number:'.2'}} km</p>
            </li>
        </ul>
    </div>
`
})
export class TrackListComponent {
    public tracks: Observable<Track[]>;
    jsrolService: JsrolService;
    router: Router;

    constructor(jsrolService: JsrolService, router: Router) {
        this.jsrolService = jsrolService;
        this.router = router;
    }

    ngOnInit() {
        this.tracks = this.jsrolService.getTracks();
    }

    onTrackClick(track: Track) {
        this.router.navigate(['/map', track.kml]);
    }
}
