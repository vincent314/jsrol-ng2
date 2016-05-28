import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {JsrolService} from '../../services/jsrol.service.ts';
import {MD_PROGRESS_CIRCLE_DIRECTIVES} from '@angular2-material/progress-circle';
import Track = jsrol.Track;
import {Router} from "@angular/router";

@Component({
    selector: 'track-list',
    directives: [MD_LIST_DIRECTIVES, MD_PROGRESS_CIRCLE_DIRECTIVES],
    template: `
    <div class="track-list-container">
        <div [hidden]="tracks | async">
            <md-spinner></md-spinner>
        </div>
        <md-list>
            <md-list-item *ngFor="let track of tracks | async" (click)="onTrackClick(track)">
                <h3 md-line>{{track.name}}</h3>
                <p md-line>{{track.type}}</p>
                <p md-line>{{track.distance | number:'.2'}} km</p>
            </md-list-item>
        </md-list>
    </div>
`
})
export class TrackListComponent {
    public tracks:Observable<Track[]>;
    jsrolService:JsrolService;
    router:Router;

    constructor(jsrolService:JsrolService, router:Router) {
        this.jsrolService = jsrolService;
        this.router = router;
    }

    ngOnInit() {
        this.tracks = this.jsrolService.getTracks();
    }

    onTrackClick(track:Track) {
        this.router.navigate(['/map']);
    }
}
