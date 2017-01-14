import {Component} from '@angular/core';
import {TrackModel} from '../model/track.model';
import {EventModel} from '../model/event.model';
@Component({
  selector: 'loop-link',
  template: `<a class="mdl-layout__tab"
         [class.is-active]="loop.$key === currentTrack?.$key"
         [routerLink]="['']" [queryParams]="{eventId:event?.$key,trackId:loop.$key}">
        Boucle {{index + 1}} (<i class="mdi mdi-math-compass"></i> {{loop.distance | number}} km)
      </a>`,
  inputs: ['loop', 'index', 'currentTrack', 'event']
})
export class LoopLinkComponent{

  loop:TrackModel;
  index:number;
  currentTrack: TrackModel;
  event:EventModel;
}
