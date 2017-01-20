import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JsrolService} from '../../services/jsrol.service';
import {Router} from '@angular/router';


@Component({
  selector: 'admin-track-list',
  styles: [require('./admin-track-list.component.scss')],
  templateUrl: './admin-track-list.component.html'
})
export class AdminTrackListComponent {
  tracks$: Observable<TrackModel[]>;
  filter: FilterModel;

  constructor(private jsrolService: JsrolService, private router: Router) {
  }

  ngOnInit() {
    this.tracks$ = this.jsrolService.getTracks();
  }

  onTrackClick(track: TrackModel) {
    this.router.navigate(['admin', 'tracks', 'edit', track.$key]);
  }

  onTrackDelete(track: TrackModel) {
    this.jsrolService.deleteTrack(track);
  }

  onFilterChanged(filter:FilterModel){
    this.filter = filter;
  }
}
