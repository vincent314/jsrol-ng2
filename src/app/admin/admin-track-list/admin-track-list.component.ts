import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JsrolService} from '../../services/jsrol.service';
import {Router} from '@angular/router';
import {TrackModel} from '../../model/track.model';

@Component({
    selector: 'admin-track-list',
    styles : [require('./admin-track-list.component.scss')],
    templateUrl: './admin-track-list.component.html'
})
export class AdminTrackListComponent {
    public tracks$: Observable<TrackModel[]>;

    constructor(private jsrolService: JsrolService, private router: Router) {
    }

    ngOnInit() {
        this.tracks$ = this.jsrolService.getTracks();
    }

    onTrackClick(track: TrackModel) {
      this.router.navigate(['admin', 'tracks', 'edit', track.$key]);
    }

    onTrackDelete(track: TrackModel){
      this.jsrolService.deleteTrack(track);
    }
}
