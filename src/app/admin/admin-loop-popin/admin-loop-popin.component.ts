import {Component} from '@angular/core';
import {routerTransition} from '../../router.animation';

@Component({
  selector: 'admin-loop-popin',
  template: require('./admin-loop-popin.component.html'),
  styleUrls: ['./admin-loop-popin.component.scss'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class AdminLoopPopinComponent {
  constructor() {

  }

  onTrackClick(track:TrackModel){
    console.log({track});
  }
}
