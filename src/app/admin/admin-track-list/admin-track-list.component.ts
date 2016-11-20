import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JsrolService} from '../../services/jsrol.service.ts';
import {Router} from '@angular/router';
import {TrackModel} from '../../model/track.model';

@Component({
    selector: 'admin-track-list',
    styles : [require('./admin-track-list.component.scss')],
    templateUrl: './admin-track-list.component.html'
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
