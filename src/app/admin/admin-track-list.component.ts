import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JsrolService} from '../services/jsrol.service.ts';
import {Router} from '@angular/router';
import {TrackModel} from '../model/track.model';

@Component({
    selector: 'admin-track-list',
    styles : [require('./admin-track-list.component.scss')],
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
                  <a class="mdl-list__item-secondary-action" (click)="router.navigate(['admin','editTrack', track.$key])"><i class="material-icons">mode edit</i></a>
                  <a class="mdl-list__item-secondary-action" (click)="onTrackDelete(track)"><i class="material-icons">delete</i></a>
                </span>
            </li>
        </ul>
    </div>
    <button id="add-button" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect"
    (click)="router.navigate(['admin','addTrack'])">
      <i class="material-icons">add</i>
    </button>
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

    onTrackEdit(track: TrackModel){
      this.jsrolService.updateTrack(track);
    }

    onTrackDelete(track: TrackModel){
      this.jsrolService.deleteTrack(track);
    }
}
