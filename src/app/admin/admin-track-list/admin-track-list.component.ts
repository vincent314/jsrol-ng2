import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {JsrolService} from '../../services/jsrol.service';
import {MdlSnackbarService} from '@angular-mdl/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'admin-track-list',
  styleUrls: ['./admin-track-list.component.scss'],
  templateUrl: './admin-track-list.component.html'
})
export class AdminTrackListComponent {

  constructor(private router: Router, private jsrolService:JsrolService, private snackbarService:MdlSnackbarService,
  private translate:TranslateService) {
  }

  onTrackClick(track: TrackModel) {
    this.router.navigate(['admin', 'tracks', 'edit', track.$key]);
  }

  onDelete(track:TrackModel){
    this.jsrolService.deleteTrack(track);
    this.snackbarService.showSnackbar({
      message: this.translate.instant('ADMIN.TRACK.CONFIRM_DELETE')
    });
  }
}
