import {Component, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {JsrolService} from '../../services/jsrol.service';
import {MdlSnackbarService} from 'angular2-mdl';
import {TranslateService} from 'ng2-translate';

@Component({
  selector: 'track-list-selector',
  template: require('./track-list-selector.component.html'),
  styles: [require('./track-list-selector.component.scss')],
  outputs: ['trackClick'],
  inputs: ['itemsPerPage', 'actionDelete']
})
export class TrackListSelectComponent {
  tracks$: Observable<TrackModel[]>;
  filter: FilterModel;
  trackClick = new EventEmitter<TrackModel>();
  itemsPerPage: number;
  actionDelete: boolean = true;

  constructor(private jsrolService: JsrolService, private snackbarService: MdlSnackbarService,
              private translate: TranslateService) {

  }

  ngOnInit() {
    this.tracks$ = this.jsrolService.getTracks();
  }

  onTrackClick(track: TrackModel) {
    this.trackClick.emit(track);
  }

  onTrackDelete(track: TrackModel) {
    this.jsrolService.deleteTrack(track);
    this.snackbarService.showToast(this.translate.instant("ADMIN.TRACK.CONFIRM_DELETE"));
  }

  onFilterChanged(filter: FilterModel) {
    this.filter = filter;
  }
}
