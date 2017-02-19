import {Component} from '@angular/core';
@Component({
  selector: 'loop-link',
  templateUrl: './loop-link.component.html',
  styleUrls: [
    './loop-link.component.scss'
  ],
  inputs: ['loop', 'index', 'currentTrack', 'event']
})
export class LoopLinkComponent {

  loop: TrackModel;
  index: number;
  currentTrack: TrackModel;
  event: EventModel;
}
