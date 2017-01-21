import {Component} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'admin-track-list',
  styles: [require('./admin-track-list.component.scss')],
  templateUrl: './admin-track-list.component.html'
})
export class AdminTrackListComponent {

  constructor(private router: Router) {
  }

  onTrackClick(track: TrackModel) {
    this.router.navigate(['admin', 'tracks', 'edit', track.$key]);
  }

}
