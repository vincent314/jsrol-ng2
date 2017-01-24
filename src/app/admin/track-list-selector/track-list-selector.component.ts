import {Component, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {JsrolService} from '../../services/jsrol.service';

@Component({
  selector: 'track-list-selector',
  template: require('./track-list-selector.component.html'),
  styles: [require('./track-list-selector.component.scss')],
  outputs: ['trackClick'],
  inputs: ['itemsPerPage','actionDelete']
})
export class TrackListSelectComponent {
  tracks$: Observable<TrackModel[]>;
  filter: FilterModel;
  trackClick = new EventEmitter<TrackModel>();
  itemsPerPage:number;
  actionDelete:boolean = true;

  constructor(private jsrolService: JsrolService, ){

  }

  ngOnInit() {
    this.tracks$ = this.jsrolService.getTracks();
  }

  onTrackClick(track: TrackModel) {
    this.trackClick.emit(track);
  }

  onTrackDelete(track: TrackModel) {
    this.jsrolService.deleteTrack(track);
  }

  onFilterChanged(filter:FilterModel){
    this.filter = filter;
  }
}
