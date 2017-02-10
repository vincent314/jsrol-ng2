import {Component} from '@angular/core';
import {TrackModel} from '../model/track.model';
import {EventModel} from '../model/event.model';
@Component({
  selector: 'loop-link',
  template: require('./loop-link.component.html'),
  styles: [
    require('./loop-link.component.scss')
  ],
  inputs: ['loop', 'index', 'currentTrack', 'event']
})
export class LoopLinkComponent {

  loop: TrackModel;
  index: number;
  currentTrack: TrackModel;
  event: EventModel;
}
