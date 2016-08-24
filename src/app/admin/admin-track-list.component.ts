import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JsrolService} from '../services/jsrol.service.ts';
import {Router} from '@angular/router';
import TrackModel = jsrol.TrackModel;

@Component({
    selector: 'admin-track-list',
    template: `
    <div class="track-list-container">
        <ul class="mdl-list">
            <li class="mdl-list__item mdl-list__item mdl-list__item--three-line" 
            *ngFor="let track of tracks$ | async" 
            (click)="onTrackClick(track)">
                <span class="mdl-list__item-primary-content">
                    <span>{{track.name}}</span>
                    <span class="mdl-list__item-text-body">
                        <span><i class="mdi mdi-math-compass"></i> {{track.distance | number}} km</span>
                        <span>{{track.type}}</span>
                    </span>
                </span>
                <span class="mdl-list__item-secondary-content">
                  <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">mode edit</i></a>
                  <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">delete</i></a>
                </span>
            </li>
        </ul>
    </div>
`
})
export class AdminTrackListComponent {
    public tracks$: Observable<TrackModel[]>;
    jsrolService: JsrolService;
    router: Router;

    constructor(jsrolService: JsrolService, router: Router) {
        this.jsrolService = jsrolService;
        this.router = router;
    }

    ngOnInit() {
        this.tracks$ = this.jsrolService.getTracks();
    }

    onTrackClick(track: TrackModel) {
        this.router.navigate(['/map', track.kml]);
    }
}
